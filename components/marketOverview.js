const { colors, fonts, spacing, page, getVariantColors, formatMoney, formatNumber } = require('./styles');

// Auto-format value based on content
function formatValue(value) {
  const str = String(value);
  if (str.startsWith('$')) return formatMoney(str);
  if (str.includes('%')) return str; // percentages pass through
  // Check if it's a large number that needs formatting
  const num = parseFloat(str.replace(/,/g, ''));
  if (!isNaN(num) && num >= 1000) return formatNumber(str);
  return str;
}

function render(doc, data, cursor) {
  // Title
  if (data.title) {
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(data.title, cursor.x, cursor.y);
    cursor.y += fonts.size.lg + spacing.xs;
  }

  // Subtitle
  if (data.subtitle) {
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.muted)
      .text(data.subtitle, cursor.x, cursor.y);
    cursor.y += fonts.size.sm + spacing.md;
  }

  // Metrics cards
  if (data.metrics && data.metrics.length > 0) {
    const cardWidth = (page.contentWidth - spacing.md * (data.metrics.length - 1)) / data.metrics.length;
    const cardHeight = 60;
    const startX = cursor.x;

    data.metrics.forEach((metric, index) => {
      const cardX = startX + (cardWidth + spacing.md) * index;
      const variant = getVariantColors(metric.variant || 'gray');

      // Card background
      doc
        .roundedRect(cardX, cursor.y, cardWidth, cardHeight, 4)
        .fill(variant.bg);

      // Value
      doc
        .fontSize(fonts.size.lg)
        .fillColor(variant.text)
        .text(formatValue(metric.value), cardX + spacing.md, cursor.y + spacing.md);

      // Label
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.secondary)
        .text(metric.label, cardX + spacing.md, cursor.y + spacing.md + fonts.size.lg + spacing.xs);
    });

    cursor.y += cardHeight + spacing.xl;
  }

  return cursor;
}

module.exports = { render };
