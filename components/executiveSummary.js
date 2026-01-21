const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  const startX = cursor.x;

  // Title and badge on same line
  doc
    .fontSize(fonts.size.lg)
    .fillColor(colors.primary)
    .text(data.title, cursor.x, cursor.y, { continued: data.badge ? true : false });

  if (data.badge) {
    const titleWidth = doc.widthOfString(data.title);
    const badgeX = cursor.x + titleWidth + spacing.md;
    const badgeWidth = doc.widthOfString(data.badge) + spacing.md;
    const badgeHeight = fonts.size.xs + spacing.sm;
    const variant = getVariantColors('purple');

    // Badge background
    doc
      .roundedRect(badgeX, cursor.y, badgeWidth, badgeHeight, 3)
      .fill(variant.bg);

    // Badge text
    doc
      .fontSize(fonts.size.xs)
      .fillColor(variant.text)
      .text(data.badge, badgeX + spacing.xs, cursor.y + 2);
  }

  cursor.y += fonts.size.lg + spacing.md;

  // Content
  if (data.content) {
    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.secondary)
      .text(data.content, cursor.x, cursor.y, { width: page.contentWidth });
    cursor.y += doc.heightOfString(data.content, { width: page.contentWidth }) + spacing.lg;
  }

  cursor.y += spacing.md;

  return cursor;
}

module.exports = { render };
