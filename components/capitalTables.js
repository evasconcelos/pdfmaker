const { colors, fonts, spacing, page } = require('./styles');

function estimateTableHeight(tableData) {
  const titleHeight = fonts.size.lg + spacing.md;
  const rowHeight = fonts.size.base + spacing.md;
  const itemsHeight = tableData.items ? tableData.items.length * rowHeight : 0;
  const dividerHeight = spacing.xs + spacing.sm;
  const totalRowHeight = tableData.total ? fonts.size.base + spacing.md : 0;
  return titleHeight + itemsHeight + dividerHeight + totalRowHeight + spacing.md;
}

function renderTable(doc, tableData, x, y, width) {
  const startY = y;
  const rowHeight = fonts.size.base + spacing.md;

  // Title
  doc
    .fontSize(fonts.size.lg)
    .fillColor(colors.primary)
    .text(tableData.title, x, y);
  y += fonts.size.lg + spacing.md;

  // Items
  if (tableData.items) {
    tableData.items.forEach((item) => {
      // Label
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.secondary)
        .text(item.label, x, y);

      // Percentage (if exists)
      let amountX = x + width - 80;
      if (item.percentage) {
        doc
          .fontSize(fonts.size.sm)
          .fillColor(colors.muted)
          .text(item.percentage, x + width - 140, y, { width: 50, align: 'right' });
      }

      // Amount
      doc
        .fontSize(fonts.size.sm)
        .fillColor(colors.primary)
        .text(item.amount, amountX, y, { width: 80, align: 'right' });

      y += rowHeight;
    });
  }

  // Divider
  y += spacing.xs;
  doc
    .strokeColor(colors.border)
    .lineWidth(1)
    .moveTo(x, y)
    .lineTo(x + width, y)
    .stroke();
  y += spacing.sm;

  // Total
  if (tableData.total) {
    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.primary)
      .text(tableData.total.label, x, y, { continued: false });

    doc
      .fontSize(fonts.size.base)
      .fillColor(colors.primary)
      .text(tableData.total.amount, x + width - 80, y, { width: 80, align: 'right' });

    y += fonts.size.base + spacing.md;
  }

  return y;
}

function render(doc, data, cursor) {
  const tableWidth = (page.contentWidth - spacing.xl) / 2;

  // Calculate the maximum height needed for both tables
  const leftTableHeight = data.sourcesOfCapital ? estimateTableHeight(data.sourcesOfCapital) : 0;
  const rightTableHeight = data.usesOfCapital ? estimateTableHeight(data.usesOfCapital) : 0;
  const maxTableHeight = Math.max(leftTableHeight, rightTableHeight);

  // Check if tables fit on current page, if not add page break
  if (cursor.y + maxTableHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  let maxY = cursor.y;

  // Sources of Capital (left)
  if (data.sourcesOfCapital) {
    const endY = renderTable(doc, data.sourcesOfCapital, cursor.x, cursor.y, tableWidth);
    maxY = Math.max(maxY, endY);
  }

  // Uses of Capital (right)
  if (data.usesOfCapital) {
    const endY = renderTable(doc, data.usesOfCapital, cursor.x + tableWidth + spacing.xl, cursor.y, tableWidth);
    maxY = Math.max(maxY, endY);
  }

  cursor.y = maxY + spacing.xl;

  return cursor;
}

module.exports = { render };
