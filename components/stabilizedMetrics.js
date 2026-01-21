const { colors, fonts, spacing, page } = require('./styles');

function render(doc, data, cursor) {
  // Section title
  if (data.title) {
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(data.title, cursor.x, cursor.y);
    cursor.y += fonts.size.lg + spacing.md;
  }

  if (!data.metrics || data.metrics.length === 0) return cursor;

  const metricWidth = (page.contentWidth - spacing.md * (data.metrics.length - 1)) / data.metrics.length;
  const metricHeight = 70;
  const startX = cursor.x;

  data.metrics.forEach((metric, index) => {
    const metricX = startX + (metricWidth + spacing.md) * index;

    // Background
    doc
      .roundedRect(metricX, cursor.y, metricWidth, metricHeight, 4)
      .fill(colors.background);

    // Value
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(metric.value, metricX + spacing.md, cursor.y + spacing.md);

    // Label
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.secondary)
      .text(metric.label, metricX + spacing.md, cursor.y + spacing.md + fonts.size.lg + spacing.xs);

    // Sublabel
    if (metric.sublabel) {
      doc
        .fontSize(fonts.size.xs)
        .fillColor(colors.muted)
        .text(metric.sublabel, metricX + spacing.md, cursor.y + spacing.md + fonts.size.lg + fonts.size.sm + spacing.sm);
    }
  });

  cursor.y += metricHeight + spacing.xl;

  return cursor;
}

module.exports = { render };
