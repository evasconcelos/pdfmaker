const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  // Title and badge
  doc
    .fontSize(fonts.size.lg)
    .fillColor(colors.primary)
    .text(data.title, cursor.x, cursor.y);

  if (data.badge) {
    const titleWidth = doc.widthOfString(data.title);
    const badgeX = cursor.x + titleWidth + spacing.md;
    const badgeWidth = doc.widthOfString(data.badge) + spacing.md;
    const badgeHeight = fonts.size.xs + spacing.sm;
    const variant = getVariantColors('purple');

    doc
      .roundedRect(badgeX, cursor.y, badgeWidth, badgeHeight, 3)
      .fill(variant.bg);

    doc
      .fontSize(fonts.size.xs)
      .fillColor(variant.text)
      .text(data.badge, badgeX + spacing.xs, cursor.y + 2);
  }

  cursor.y += fonts.size.lg + spacing.md;

  // Bullet items
  if (data.items && data.items.length > 0) {
    data.items.forEach((item) => {
      // Bullet
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.muted)
        .text('•', cursor.x, cursor.y);

      // Item text
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.secondary)
        .text(item, cursor.x + spacing.md, cursor.y, { width: page.contentWidth - spacing.md });

      cursor.y += doc.heightOfString(item, { width: page.contentWidth - spacing.md }) + spacing.sm;
    });
  }

  cursor.y += spacing.lg;

  return cursor;
}

module.exports = { render };
