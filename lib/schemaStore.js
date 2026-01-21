const fs = require('fs');
const path = require('path');

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');

// Ensure schemas directory exists
if (!fs.existsSync(SCHEMAS_DIR)) {
  fs.mkdirSync(SCHEMAS_DIR, { recursive: true });
}

/**
 * Save a schema to the file system
 * @param {Object} schema - The schema object with id property
 * @returns {Object} The saved schema
 */
function saveSchema(schema) {
  const filePath = path.join(SCHEMAS_DIR, `${schema.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(schema, null, 2));
  return schema;
}

/**
 * Get a schema by ID
 * @param {string} id - The schema ID
 * @returns {Object|null} The schema or null if not found
 */
function getSchema(id) {
  const filePath = path.join(SCHEMAS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * List all schemas
 * @returns {Array} Array of schema summaries (id, name, createdAt)
 */
function listSchemas() {
  const files = fs.readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(SCHEMAS_DIR, file), 'utf-8');
    const schema = JSON.parse(content);
    return {
      id: schema.id,
      name: schema.name,
      createdAt: schema.createdAt,
      componentsMatched: schema.componentMappings?.length || 0
    };
  });
}

/**
 * Delete a schema by ID
 * @param {string} id - The schema ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteSchema(id) {
  const filePath = path.join(SCHEMAS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return false;
  }
  fs.unlinkSync(filePath);
  return true;
}

module.exports = {
  saveSchema,
  getSchema,
  listSchemas,
  deleteSchema
};
