const PDFDocument = require('pdfkit');
const components = require('../components');
const { page } = require('../components/styles');

/**
 * Render a PDF document from component data
 * @param {Object} data - The component data with page, tab, and components array
 * @returns {Promise<Buffer>} PDF buffer
 */
function renderPDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: page.margin,
        bottom: page.margin,
        left: page.margin,
        right: page.margin,
      },
    });

    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Initialize cursor position
    let cursor = {
      x: page.margin,
      y: page.margin,
    };

    // Render each component in array order
    if (data.components && Array.isArray(data.components)) {
      for (const componentData of data.components) {
        const component = components[componentData.type];

        if (component) {
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
  });
}

module.exports = { renderPDF };
