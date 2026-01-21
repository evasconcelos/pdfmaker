const { colors, fonts, spacing, page } = require('./styles');

function render(doc, data, cursor) {
  const startY = cursor.y;

  // Title
  doc
    .fontSize(fonts.size['2xl'])
    .fillColor(colors.primary)
    .text(data.title, cursor.x, cursor.y);

  cursor.y += fonts.size['2xl'] + spacing.sm;

  // Actions (displayed as text labels)
  if (data.actions && data.actions.length > 0) {
    const actionLabels = data.actions.map(a => a.label).join('  |  ');
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.muted)
      .text(actionLabels, cursor.x, cursor.y);
    cursor.y += fonts.size.sm + spacing.md;
  }

  cursor.y += spacing.md;

  return cursor;
}

module.exports = { render };
