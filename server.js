const express = require('express');
const { generateSchema, findBestSchema, applyFieldMappings } = require('./lib/schemaGenerator');
const { getSchema, listSchemas } = require('./lib/schemaStore');
const { renderPDF } = require('./lib/pdfRenderer');

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

/**
 * POST /api/schema/generate
 * Generate a new schema from data using LLM
 */
app.post('/api/schema/generate', async (req, res) => {
  try {
    const { query, data } = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Request body must include "data" object' });
    }

    const schema = await generateSchema(query, data);

    res.json({
      schemaId: schema.id,
      schemaName: schema.name,
      componentsMatched: schema.componentMappings?.length || 0
    });
  } catch (err) {
    console.error('Schema generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/schemas
 * List all available schemas
 */
app.get('/api/schemas', (req, res) => {
  try {
    const schemas = listSchemas();
    res.json({ schemas });
  } catch (err) {
    console.error('List schemas error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/schema/:schemaId
 * Get a specific schema by ID
 */
app.get('/api/schema/:schemaId', (req, res) => {
  try {
    const schema = getSchema(req.params.schemaId);
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json(schema);
  } catch (err) {
    console.error('Get schema error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/pdf/generate/:schemaId
 * Generate PDF using a specific schema
 */
app.post('/api/pdf/generate/:schemaId', async (req, res) => {
  try {
    const { schemaId } = req.params;
    const data = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Request body must be a JSON object with data' });
    }

    const schema = getSchema(schemaId);
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }

    // Apply field mappings to transform data
    const componentData = applyFieldMappings(schema, data);

    // Render PDF
    const pdfBuffer = await renderPDF(componentData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${schemaId}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/pdf/generate
 * Generate PDF using auto-detected schema or generate new one
 * If no matching schema found, generates a new schema first
 */
app.post('/api/pdf/generate', async (req, res) => {
  try {
    const { query, data } = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Request body must include "data" object' });
    }

    // Try to find a matching schema
    let schema = await findBestSchema(data);

    // If no match, generate a new schema
    if (!schema) {
      schema = await generateSchema(query, data);
    }

    // Apply field mappings to transform data
    const componentData = applyFieldMappings(schema, data);

    // Render PDF
    const pdfBuffer = await renderPDF(componentData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${schema.id}.pdf"`);
    res.setHeader('X-Schema-Id', schema.id);
    res.setHeader('X-Schema-Name', schema.name);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/pdf/preview
 * Preview the component data that would be generated (without PDF)
 */
app.post('/api/pdf/preview', async (req, res) => {
  try {
    const { schemaId, data } = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Request body must include "data" object' });
    }

    let schema;
    if (schemaId) {
      schema = getSchema(schemaId);
      if (!schema) {
        return res.status(404).json({ error: 'Schema not found' });
      }
    } else {
      // Try to find or generate schema
      schema = await findBestSchema(data);
      if (!schema) {
        schema = await generateSchema(req.body.query, data);
      }
    }

    // Apply field mappings to transform data
    const componentData = applyFieldMappings(schema, data);

    res.json({
      schemaId: schema.id,
      schemaName: schema.name,
      preview: componentData
    });
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`PDF Schema Server running on port ${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/schema/generate - Generate schema from data`);
  console.log(`  GET  /api/schemas - List all schemas`);
  console.log(`  GET  /api/schema/:id - Get specific schema`);
  console.log(`  POST /api/pdf/generate/:schemaId - Generate PDF with schema`);
  console.log(`  POST /api/pdf/generate - Auto-detect schema and generate PDF`);
  console.log(`  POST /api/pdf/preview - Preview component data`);
});
