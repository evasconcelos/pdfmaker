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
    const variant = getVariantColors('purple');

    // Calculate badge dimensions with correct font size
    doc.fontSize(fonts.size.xs);
    const textWidth = doc.widthOfString(data.badge);
    const badgeWidth = textWidth + spacing.md;
    const badgeHeight = fonts.size.xs + spacing.sm;

    // Badge background
    doc
      .roundedRect(badgeX, cursor.y, badgeWidth, badgeHeight, 3)
      .fill(variant.bg);

    // Badge text (centered)
    const textX = badgeX + (badgeWidth - textWidth) / 2;
    const textY = cursor.y + (badgeHeight - fonts.size.xs) / 2;
    doc
      .fillColor(variant.text)
      .text(data.badge, textX, textY);
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
