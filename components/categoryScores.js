const { colors, fonts, spacing, page } = require('./styles');

// Category colors matching the design
const categoryColors = {
  'Brand & Flag': '#0d5de1',
  'Financial': '#0e2e67',
  'Borrower Profile': '#ca8a04',
  'Location & Market': '#00844a',
  'Construction': '#dc2626',
};

function render(doc, data, cursor) {
  const categories = data.categories || [];
  if (categories.length === 0) return cursor;

  const rowHeight = 50;
  const titleHeight = data.title ? fonts.size.lg + spacing.md : 0;
  const noteHeight = data.note ? fonts.size.xs + spacing.md + spacing.lg : spacing.lg;
  const totalHeight = titleHeight + (categories.length * rowHeight) + noteHeight;

  // Check if component fits on current page
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  // Title
  if (data.title) {
    doc
      .fontSize(fonts.size.lg)
      .fillColor(colors.primary)
      .text(data.title, cursor.x, cursor.y);
    cursor.y += fonts.size.lg + spacing.md;
  }

  categories.forEach((category) => {
    const color = categoryColors[category.label] || colors.blue;

    // Icon placeholder (colored square)
    doc
      .roundedRect(cursor.x, cursor.y, 24, 24, 4)
      .fill(color);

    // Category label
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.primary)
      .text(category.label, cursor.x + 32, cursor.y);

    // Questions count
    doc
      .fontSize(fonts.size.xs)
      .fillColor(colors.muted)
      .text(`${category.questions} questions`, cursor.x + 32, cursor.y + fonts.size.sm + 2);

    // Progress bar
    const barX = cursor.x + 160;
    const barWidth = 100;
    const barHeight = 8;
    const barY = cursor.y + 8;
    const progress = category.score / category.maxScore;

    // Background bar
    doc
      .roundedRect(barX, barY, barWidth, barHeight, 4)
      .fill(colors.grayLight);

    // Progress fill
    doc
      .roundedRect(barX, barY, barWidth * progress, barHeight, 4)
      .fill(color);

    // Score text
    const scoreText = `${category.score}/${category.maxScore}`;
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.secondary)
      .text(scoreText, barX + barWidth + spacing.md, cursor.y + 4);

    cursor.y += rowHeight;
  });

  // Note at the bottom
  if (data.note) {
    doc
      .roundedRect(cursor.x, cursor.y, page.contentWidth, fonts.size.xs + spacing.md * 2, 4)
      .fill(colors.blueLight);

    doc
      .fontSize(fonts.size.xs)
      .fillColor(colors.blue)
      .text(data.note, cursor.x + spacing.md, cursor.y + spacing.sm, { width: page.contentWidth - spacing.md * 2 });

    cursor.y += fonts.size.xs + spacing.md * 2;
  }

  cursor.y += spacing.lg;

  return cursor;
}

module.exports = { render };
