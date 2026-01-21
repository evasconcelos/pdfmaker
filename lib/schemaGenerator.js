const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');
const { SYSTEM_PROMPT, buildUserPrompt } = require('../prompts/schemaGeneration');
const { saveSchema, listSchemas, getSchema } = require('./schemaStore');

const VALID_COMPONENTS = [
  'pageHeader',
  'propertyHeader',
  'financialCards',
  'stabilizedMetrics',
  'executiveSummary',
  'capitalTables',
  'capitalStructureNotes',
  'marketOverview',
  'competitivePositioning'
];

/**
 * Generate a schema from user data using LLM
 * @param {string} query - Natural language description of desired report
 * @param {Object} data - The data to map to components
 * @returns {Promise<Object>} Generated schema
 */
async function generateSchema(query, data) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const openai = new OpenAI({ apiKey });

  const userPrompt = buildUserPrompt(query, data);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from LLM');
  }

  let schema;
  try {
    schema = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse LLM response as JSON: ${err.message}`);
  }

  // Validate and enhance schema
  schema = validateAndEnhanceSchema(schema);

  // Save to store
  saveSchema(schema);

  return schema;
}

/**
 * Validate the schema structure and add required fields
 * @param {Object} schema - Raw schema from LLM
 * @returns {Object} Validated and enhanced schema
 */
function validateAndEnhanceSchema(schema) {
  // Ensure required fields
  if (!schema.id) {
    schema.id = `schema-${uuidv4().slice(0, 8)}`;
  }

  if (!schema.name) {
    schema.name = 'Generated Report';
  }

  // Add timestamp
  schema.createdAt = new Date().toISOString();

  // Validate component mappings
  if (!Array.isArray(schema.componentMappings)) {
    schema.componentMappings = [];
  }

  // Filter out invalid components
  schema.componentMappings = schema.componentMappings.filter(mapping => {
    if (!VALID_COMPONENTS.includes(mapping.type)) {
      console.warn(`Removing invalid component: ${mapping.type}`);
      return false;
    }
    return true;
  });

  return schema;
}

/**
 * Check if a value looks like a data path
 * @param {string} value - The value to check
 * @param {Object} data - The data object to check top-level keys against
 * @returns {boolean} True if it looks like a path
 */
function isDataPath(value, data) {
  if (typeof value !== 'string') return false;
  // Treat as path if it contains dots or brackets (nested access)
  if (/\.|(\[\d+\])/.test(value)) return true;
  // Also treat as path if it matches a top-level key in the data
  if (data && value in data) return true;
  return false;
}

/**
 * Apply field mappings to transform user data into component format
 * @param {Object} schema - The schema with field mappings
 * @param {Object} data - The user data to transform
 * @returns {Object} Data formatted for PDF components (array-based)
 */
function applyFieldMappings(schema, data) {
  const components = [];

  for (const mapping of schema.componentMappings) {
    const componentData = { type: mapping.type };

    // Apply field mappings
    if (mapping.fieldMappings) {
      for (const [targetField, sourcePath] of Object.entries(mapping.fieldMappings)) {
        // Check if sourcePath looks like a data path or a literal value
        if (isDataPath(sourcePath, data)) {
          const value = getNestedValue(data, sourcePath);
          if (value !== undefined) {
            setNestedValue(componentData, targetField, value);
          }
        } else {
          // Treat as literal value
          setNestedValue(componentData, targetField, sourcePath);
        }
      }
    }

    // Apply static values
    if (mapping.staticValues) {
      for (const [targetField, value] of Object.entries(mapping.staticValues)) {
        setNestedValue(componentData, targetField, value);
      }
    }

    components.push(componentData);
  }

  return {
    page: schema.page || 'Report',
    tab: schema.tab || 'Overview',
    components
  };
}

/**
 * Get a nested value from an object using dot notation
 * @param {Object} obj - The object to traverse
 * @param {string} path - Dot notation path (e.g., "property.address")
 * @returns {*} The value at the path
 */
function getNestedValue(obj, path) {
  if (!path || typeof path !== 'string') return undefined;

  const parts = path.split(/\.|\[|\]/).filter(Boolean);
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = current[part];
  }

  return current;
}

/**
 * Set a nested value in an object using dot notation
 * @param {Object} obj - The object to modify
 * @param {string} path - Dot notation path
 * @param {*} value - The value to set
 */
function setNestedValue(obj, path, value) {
  if (!path || typeof path !== 'string') return;

  const parts = path.split(/\.|\[|\]/).filter(Boolean);
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const isNextArray = /^\d+$/.test(nextPart);

    if (!(part in current)) {
      current[part] = isNextArray ? [] : {};
    }
    current = current[part];
  }

  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}

/**
 * Find the best matching schema for the given data using LLM
 * @param {Object} data - The user data to match
 * @returns {Promise<Object|null>} Best matching schema or null if none found
 */
async function findBestSchema(data) {
  const schemas = listSchemas();
  if (schemas.length === 0) {
    return null;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const openai = new OpenAI({ apiKey });

  const schemaList = schemas.map(s => ({
    id: s.id,
    name: s.name,
    componentsMatched: s.componentsMatched
  }));

  const prompt = `Given the following data structure and available schemas, determine which schema best matches this data.

## Available Schemas
${JSON.stringify(schemaList, null, 2)}

## User Data
${JSON.stringify(data, null, 2)}

Return a JSON object with the best matching schema ID, or null if none are a good match:
{"schemaId": "schema-id-here"} or {"schemaId": null}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a schema matcher. Analyze data structures and match them to existing schemas.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return null;
  }

  try {
    const result = JSON.parse(content);
    if (result.schemaId) {
      return getSchema(result.schemaId);
    }
  } catch {
    return null;
  }

  return null;
}

module.exports = {
  generateSchema,
  findBestSchema,
  applyFieldMappings,
  getNestedValue,
  setNestedValue,
  VALID_COMPONENTS
};
