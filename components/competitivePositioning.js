const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function render(doc, data, cursor) {
  // Title
  if (data.title) {
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(data.title, cursor.x, cursor.y);
    cursor.y += fonts.size.lg + spacing.md;
  }

  // Legend
  if (data.legend) {
    const legendStartX = cursor.x;
    let legendX = legendStartX;

    // Comp Set legend
    if (data.legend.compSet) {
      doc
        .rect(legendX, cursor.y + 2, 12, 12)
        .fill(colors.grayLight);
      legendX += 16;
      doc
        .fontSize(fonts.size.xs)
        .fillColor(colors.muted)
        .text(data.legend.compSet, legendX, cursor.y + 3);
      legendX += doc.widthOfString(data.legend.compSet) + spacing.lg;
    }

    // Projected legend
    if (data.legend.projected) {
      doc
        .rect(legendX, cursor.y + 2, 12, 12)
        .fill(colors.blueLight);
      legendX += 16;
      doc
        .fontSize(fonts.size.xs)
        .fillColor(colors.muted)
        .text(data.legend.projected, legendX, cursor.y + 3);
    }

    cursor.y += fonts.size.xs + spacing.lg;
  }

  // Data bars
  if (data.data && data.data.length > 0) {
    const barMaxWidth = page.contentWidth - 100;
    const barHeight = 20;
    const rowHeight = barHeight * 2 + spacing.lg;

    data.data.forEach((item) => {
      // Category label
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.primary)
        .text(item.category, cursor.x, cursor.y);
      cursor.y += fonts.size.sm + spacing.sm;

      // Comp Set bar
      if (item.compSet) {
        const barWidth = (item.compSet.value / 150) * barMaxWidth;
        doc
          .roundedRect(cursor.x, cursor.y, barWidth, barHeight, 3)
          .fill(colors.grayLight);
        doc
          .fontSize(fonts.size.sm)
          .fillColor(colors.secondary)
          .text(item.compSet.label, cursor.x + barWidth + spacing.sm, cursor.y + 4);
        cursor.y += barHeight + spacing.xs;
      }

      // Projected bar
      if (item.projected) {
        const barWidth = (item.projected.value / 150) * barMaxWidth;
        doc
          .roundedRect(cursor.x, cursor.y, barWidth, barHeight, 3)
          .fill(colors.blueLight);
        doc
          .fontSize(fonts.size.sm)
          .fillColor(colors.blue)
          .text(item.projected.label, cursor.x + barWidth + spacing.sm, cursor.y + 4);
        cursor.y += barHeight + spacing.md;
      }
    });
  }

  cursor.y += spacing.lg;

  return cursor;
}

module.exports = { render };
