const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  if (!Array.isArray(data) || data.length === 0) return cursor;

  const cardWidth = (page.contentWidth - spacing.md * (data.length - 1)) / data.length;
  const cardHeight = 80;
  const startX = cursor.x;

  data.forEach((card, index) => {
    const cardX = startX + (cardWidth + spacing.md) * index;
    const variant = getVariantColors(card.variant || 'gray');

    // Card background
    doc
      .roundedRect(cardX, cursor.y, cardWidth, cardHeight, 6)
      .fill(variant.bg);

    // Amount
    doc
      .fontSize(fonts.size['xl'])
      .fillColor(variant.text)
      .text(card.amount, cardX + spacing.md, cursor.y + spacing.md);

    // Label
    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.primary)
      .text(card.label, cardX + spacing.md, cursor.y + spacing.md + fonts.size['xl'] + spacing.xs);

    // Sublabel
    if (card.sublabel) {
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.muted)
        .text(card.sublabel, cardX + spacing.md, cursor.y + spacing.md + fonts.size['xl'] + fonts.size.base + spacing.sm);
    }
  });

  cursor.y += cardHeight + spacing.xl;

  return cursor;
}

module.exports = { render };
