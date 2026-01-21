const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  // Tags
  if (data.tags && data.tags.length > 0) {
    let tagX = cursor.x;
    data.tags.forEach((tag) => {
      const variant = getVariantColors(tag.variant || 'gray');
      const tagWidth = doc.widthOfString(tag.label) + spacing.md * 2;
      const tagHeight = fonts.size.sm + spacing.sm;

      // Tag background
      doc
        .roundedRect(tagX, cursor.y, tagWidth, tagHeight, 3)
        .fill(variant.bg);

      // Tag text
      doc
        .fontSize(fonts.size.sm)
        .fillColor(variant.text)
        .text(tag.label, tagX + spacing.md, cursor.y + spacing.xs / 2);

      tagX += tagWidth + spacing.sm;
    });
    cursor.y += fonts.size.sm + spacing.sm + spacing.md;
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
