const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  const items = data.items || [];
  if (items.length === 0) return cursor;

  const rowHeight = 36;
  const totalHeight = items.length * (rowHeight + spacing.sm);

  // Check if component fits on current page
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  items.forEach((item) => {
    // Row background
    doc
      .roundedRect(cursor.x, cursor.y, page.contentWidth, rowHeight, 4)
      .fill(colors.background);

    // Label
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.primary)
      .text(item.label, cursor.x + spacing.md, cursor.y + (rowHeight - fonts.size.sm) / 2);

    // Value badge on the right
    const valueText = item.value >= 0 ? `+${item.value}` : String(item.value);
    doc.fontSize(fonts.size.sm);
    const badgeWidth = doc.widthOfString(valueText) + spacing.md;
    const badgeHeight = fonts.size.sm + spacing.sm;
    const badgeX = cursor.x + page.contentWidth - spacing.md - badgeWidth;
    const badgeY = cursor.y + (rowHeight - badgeHeight) / 2;

    const variant = getVariantColors(item.variant || 'blue');

    doc
      .roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3)
      .fill(variant.bg);

    doc
      .fillColor(variant.text)
      .text(valueText, badgeX, badgeY + spacing.xs / 2, { width: badgeWidth, align: 'center' });

    cursor.y += rowHeight + spacing.sm;
  });

  cursor.y += spacing.md;

  return cursor;
}

module.exports = { render };
