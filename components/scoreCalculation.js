const { colors, fonts, spacing, page } = require('./styles');

function render(doc, data, cursor) {
  const cards = data.cards || [];
  if (cards.length === 0) return cursor;

  const cardWidth = (page.contentWidth - spacing.md * (cards.length - 1)) / cards.length;
  const cardHeight = 80;

  // Calculate total height needed
  const totalHeight = (data.title ? fonts.size.lg + spacing.md : 0) + cardHeight + spacing.xl;

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

  const startX = cursor.x;

  cards.forEach((card, index) => {
    const cardX = startX + (cardWidth + spacing.md) * index;

    // Card background
    doc
      .roundedRect(cardX, cursor.y, cardWidth, cardHeight, 4)
      .fill(colors.background);

    // Label (top)
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.muted)
      .text(card.label, cardX, cursor.y + spacing.md, { width: cardWidth, align: 'center' });

    // Value (large, center)
    const valueText = card.prefix ? `${card.prefix}${card.value}` : String(card.value);
    doc
      .fontSize(fonts.size['2xl'])
      .fillColor(colors.primary)
      .text(valueText, cardX, cursor.y + spacing.md + fonts.size.sm + spacing.xs, { width: cardWidth, align: 'center' });

    // Sublabel (bottom)
    if (card.sublabel) {
      doc
        .fontSize(fonts.size.xs)
        .fillColor(colors.muted)
        .text(card.sublabel, cardX, cursor.y + cardHeight - spacing.md - fonts.size.xs, { width: cardWidth, align: 'center' });
    }
  });

  cursor.y += cardHeight + spacing.xl;

  return cursor;
}

module.exports = { render };
