#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const components = require('./components');
const { page, spacing } = require('./components/styles');

function generatePDF(inputPath) {
  // Resolve input path
  const resolvedInput = path.resolve(inputPath);

  // Check if file exists
  if (!fs.existsSync(resolvedInput)) {
    console.error(`Error: File not found: ${resolvedInput}`);
    process.exit(1);
  }

  // Read and parse JSON
  let data;
  try {
    const content = fs.readFileSync(resolvedInput, 'utf-8');
    data = JSON.parse(content);
  } catch (err) {
    console.error(`Error parsing JSON: ${err.message}`);
    process.exit(1);
  }

  // Generate output path (same name, .pdf extension)
  const outputPath = resolvedInput.replace(/\.json$/i, '.pdf');

  // Create PDF document
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: page.margin,
      bottom: page.margin,
      left: page.margin,
      right: page.margin,
    },
  });

  // Pipe to output file
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Initialize cursor position
  let cursor = {
    x: page.margin,
    y: page.margin,
  };

  // Render order - defines the sequence components are rendered
  const renderOrder = [
    'pageHeader',
    'propertyHeader',
    'financialCards',
    'stabilizedMetrics',
    'executiveSummary',
    'capitalTables',
    'capitalStructureNotes',
    'marketOverview',
    'competitivePositioning',
  ];

  // Render each component
  if (data.components) {
    for (const componentName of renderOrder) {
      const componentData = data.components[componentName];
      const component = components[componentName];

      if (componentData && component) {
        // Check if we need a new page
        if (cursor.y > page.height - 150) {
          doc.addPage();
          cursor.y = page.margin;
        }

        cursor = component.render(doc, componentData, cursor);
      }
    }
  }

  // Finalize PDF
  doc.end();

  // Wait for stream to finish
  stream.on('finish', () => {
    console.log(`PDF generated: ${outputPath}`);
  });

  stream.on('error', (err) => {
    console.error(`Error writing PDF: ${err.message}`);
    process.exit(1);
  });
}

// CLI entry point
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node pdfmaker.js <input.json>');
  console.log('');
  console.log('Generates a PDF from a JSON component file.');
  console.log('Output will have the same filename with .pdf extension.');
  process.exit(0);
}

generatePDF(args[0]);
