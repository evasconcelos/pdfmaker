const { colors, fonts, spacing, page, getVariantColors } = require('./styles');

function getRiskLevel(score) {
  if (score >= 80) return { label: 'Low Risk', variant: 'green' };
  if (score >= 60) return { label: 'Moderate Risk', variant: 'blue' };
  if (score >= 40) return { label: 'High Risk', variant: 'orange' };
  return { label: 'Very High Risk', variant: 'red' };
}

function render(doc, data, cursor) {
  const cardWidth = (page.contentWidth - spacing.xl) / 2;
  const cardHeight = 180;

  // Calculate total height needed
  const totalHeight = cardHeight + spacing.xl;

  // Check if component fits on current page
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  const riskLevel = data.riskLevel || getRiskLevel(data.score);
  const variant = getVariantColors(riskLevel.variant || 'red');

  // Card background
  doc
    .roundedRect(cursor.x, cursor.y, cardWidth, cardHeight, 6)
    .fill(colors.white);

  doc
    .roundedRect(cursor.x, cursor.y, cardWidth, cardHeight, 6)
    .strokeColor(colors.border)
    .stroke();

  let y = cursor.y + spacing.md;

  // Risk level badge
  doc.fontSize(fonts.size.xs);
  const badgeText = riskLevel.label;
  const badgeWidth = doc.widthOfString(badgeText) + spacing.lg;
  const badgeHeight = fonts.size.xs + spacing.sm;
  const badgeX = cursor.x + (cardWidth - badgeWidth) / 2;

  doc
    .roundedRect(badgeX, y, badgeWidth, badgeHeight, 3)
    .fill(variant.bg);

  doc
    .fillColor(variant.text)
    .text(badgeText, badgeX, y + spacing.xs / 2, { width: badgeWidth, align: 'center' });

  y += badgeHeight + spacing.lg;

  // Large score number
  doc
    .fontSize(fonts.size['3xl'])
    .fillColor(variant.text)
    .text(String(data.score), cursor.x, y, { width: cardWidth, align: 'center' });

  y += fonts.size['3xl'] + spacing.xs;

  // "Overall Risk Score" label
  doc
    .fontSize(fonts.size.sm)
    .fillColor(colors.secondary)
    .text('Overall Risk Score', cursor.x, y, { width: cardWidth, align: 'center' });

  y += fonts.size.sm + spacing.md;

  // Progress bar
  const barWidth = cardWidth - spacing.xl * 2;
  const barHeight = 6;
  const barX = cursor.x + spacing.xl;
  const progress = Math.min(data.score / 100, 1);

  // Background bar
  doc
    .roundedRect(barX, y, barWidth, barHeight, 3)
    .fill(colors.grayLight);

  // Progress fill
  doc
    .roundedRect(barX, y, barWidth * progress, barHeight, 3)
    .fill(variant.text);

  y += barHeight + spacing.md;

  // Details: Base Score, Adjustments, Assessment Date
  const detailsX = cursor.x + spacing.lg;
  const valueX = cursor.x + cardWidth - spacing.lg;

  if (data.baseScore !== undefined) {
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.secondary)
      .text('Base Score', detailsX, y);
    doc
      .fillColor(colors.primary)
      .text(String(data.baseScore), detailsX, y, { width: cardWidth - spacing.xl * 2, align: 'right' });
    y += fonts.size.sm + spacing.sm;
  }

  if (data.adjustments !== undefined) {
    const adjText = data.adjustments >= 0 ? `+${data.adjustments}` : String(data.adjustments);
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.secondary)
      .text('Adjustments', detailsX, y);
    doc
      .fillColor(colors.primary)
      .text(adjText, detailsX, y, { width: cardWidth - spacing.xl * 2, align: 'right' });
    y += fonts.size.sm + spacing.sm;
  }

  if (data.assessmentDate) {
    doc
      .fontSize(fonts.size.sm)
      .fillColor(colors.secondary)
      .text('Assessment Date', detailsX, y);
    doc
      .fillColor(colors.primary)
      .text(data.assessmentDate, detailsX, y, { width: cardWidth - spacing.xl * 2, align: 'right' });
  }

  // Advance cursor past the card
  cursor.y += cardHeight + spacing.xl;

  return cursor;
}

module.exports = { render };
