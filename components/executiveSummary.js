const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  const startX = cursor.x;

  // Calculate total height needed for this component
  doc.fontSize(fonts.size.base);
  const contentHeight = data.content ? doc.heightOfString(data.content, { width: page.contentWidth }) : 0;
  const titleHeight = fonts.size.lg + spacing.md;
  const totalHeight = titleHeight + contentHeight + spacing.lg + spacing.md;

  // Check if component fits on current page, if not add page break
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  // Title and badge on same line
  doc
    .fontSize(fonts.size.lg)
    .fillColor(colors.primary)
    .text(data.title, cursor.x, cursor.y, { lineBreak: false });

  if (data.badge) {
    const titleWidth = doc.widthOfString(data.title);
    const badgeX = cursor.x + titleWidth + spacing.md;
    const variant = getVariantColors('blue');

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
