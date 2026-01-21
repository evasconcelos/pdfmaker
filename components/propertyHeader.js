const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  // Tags
  if (data.tags && data.tags.length > 0) {
    let tagX = cursor.x;
    data.tags.forEach((tag) => {
      const variant = getVariantColors(tag.variant || 'gray');

      // Set font size BEFORE calculating width for accurate measurement
      doc.fontSize(fonts.size.sm);
      const horizontalPadding = spacing.sm;
      const verticalPadding = spacing.xs;
      const tagWidth = doc.widthOfString(tag.label) + horizontalPadding * 2;
      const tagHeight = fonts.size.sm + verticalPadding * 2;

      // Tag background - pill shape with larger border radius
      doc
        .roundedRect(tagX, cursor.y, tagWidth, tagHeight, tagHeight / 2)
        .fill(variant.bg);

      // Tag text - centered vertically
      doc
        .fontSize(fonts.size.sm)
        .fillColor(variant.text)
        .text(tag.label, tagX + horizontalPadding, cursor.y + verticalPadding, {
          lineBreak: false
        });

      tagX += tagWidth + spacing.sm;
    });
    cursor.y += fonts.size.sm + spacing.xs * 2 + spacing.md;
  }

  // Title
  doc
    .fontSize(fonts.size['xl'])
    .fillColor(colors.primary)
    .text(data.title, cursor.x, cursor.y);
  cursor.y += fonts.size['xl'] + spacing.sm;

  // Location
  if (data.locationLink) {
    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.blue)
      .text(data.locationLink.label, cursor.x, cursor.y);
    cursor.y += fonts.size.base + spacing.xs;
  }

  // Address
  if (data.address) {
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.muted)
      .text(data.address, cursor.x, cursor.y);
    cursor.y += fonts.size.sm + spacing.sm;
  }

  // Description
  if (data.description) {
    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.secondary)
      .text(data.description, cursor.x, cursor.y, { width: page.contentWidth });
    cursor.y += doc.heightOfString(data.description, { width: page.contentWidth }) + spacing.lg;
  }

  cursor.y += spacing.md;

  return cursor;
}

module.exports = { render };
