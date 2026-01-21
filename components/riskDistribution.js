const { colors, fonts, spacing, page } = require('./styles');

// Category colors matching the design
const categoryColors = {
  'Brand & Flag': '#0d5de1',      // blue
  'Financial': '#0e2e67',          // dark blue
  'Borrower Profile': '#ca8a04',   // yellow
  'Location & Market': '#00844a',  // green
  'Construction': '#dc2626',       // red
};

function render(doc, data, cursor) {
  const chartWidth = page.contentWidth;
  const chartHeight = 220;

  // Calculate total height needed
  const titleHeight = data.title ? fonts.size.lg + spacing.md : 0;
  const totalHeight = titleHeight + chartHeight + spacing.xl;

  // Check if component fits on current page
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  // Title
  if (data.title) {
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(data.title, cursor.x, cursor.y);
    cursor.y += fonts.size.lg + spacing.md;
  }

  const categories = data.categories || [];
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  // Donut chart dimensions - centered on page
  const centerX = cursor.x + page.contentWidth / 2;
  const centerY = cursor.y + 80;
  const outerRadius = 70;
  const innerRadius = 45;

  // Draw donut segments
  let startAngle = -Math.PI / 2; // Start at top

  categories.forEach((category) => {
    const sliceAngle = (category.value / total) * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;
    const color = categoryColors[category.label] || colors.gray;

    // Draw arc segment using path
    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    // Outer arc start and end points
    const outerStartX = centerX + outerRadius * Math.cos(startAngle);
    const outerStartY = centerY + outerRadius * Math.sin(startAngle);
    const outerEndX = centerX + outerRadius * Math.cos(endAngle);
    const outerEndY = centerY + outerRadius * Math.sin(endAngle);

    // Inner arc start and end points
    const innerStartX = centerX + innerRadius * Math.cos(endAngle);
    const innerStartY = centerY + innerRadius * Math.sin(endAngle);
    const innerEndX = centerX + innerRadius * Math.cos(startAngle);
    const innerEndY = centerY + innerRadius * Math.sin(startAngle);

    // Draw the segment
    doc
      .path(`M ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY} L ${innerStartX} ${innerStartY} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY} Z`)
      .fill(color);

    startAngle = endAngle;
  });

  // Legend below the chart (3 columns)
  let legendY = cursor.y + 170;
  const legendColWidth = chartWidth / 3;
  let legendCol = 0;
  let legendRow = 0;

  categories.forEach((category) => {
    const color = categoryColors[category.label] || colors.gray;
    const legendX = cursor.x + (legendCol * legendColWidth);
    const rowY = legendY + legendRow * (fonts.size.sm + spacing.sm);

    // Color box
    doc
      .rect(legendX, rowY, 10, 10)
      .fill(color);

    // Label
    doc
      .fontSize(fonts.size.xs)
      .fillColor(colors.secondary)
      .text(category.label, legendX + 14, rowY + 1);

    legendCol++;
    if (legendCol >= 3) {
      legendCol = 0;
      legendRow++;
    }
  });

  cursor.y += chartHeight + spacing.xl;

  return cursor;
}

module.exports = { render };
