#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const components = require('./components');
const { page } = require('./components/styles');

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
  // If file exists, append a number to create unique filename
  const basePath = resolvedInput.replace(/\.json$/i, '');
  let outputPath = `${basePath}.pdf`;
  let counter = 1;

  while (fs.existsSync(outputPath)) {
    outputPath = `${basePath}-${counter}.pdf`;
    counter++;
  }

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

  // Render each component in array order
  // Components handle their own page breaks based on their actual content height
  if (data.components && Array.isArray(data.components)) {
    for (const componentData of data.components) {
      const component = components[componentData.type];

      if (component) {
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
