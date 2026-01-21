// Shared styles and constants for PDF components

const colors = {
  // Based on accent (blue) palette
  primary: '#0e2e67',    // --blue-12: darkest blue for headings
  secondary: '#3c6989',  // --teal-11: secondary text
  muted: '#6b7280',
  border: '#c9e1ff',     // --blue-5
  background: '#fcfdff', // --blue-1
  white: '#ffffff',
  accent: '#005ff1',     // --blue-9: main accent

  // Variant colors
  green: '#00844a',      // --green-11
  greenLight: '#d6fde5', // --green-3
  blue: '#0d5de1',       // --blue-11
  blueLight: '#eaf3ff',  // --blue-3
  teal: '#3c6989',       // --teal-11
  tealLight: '#e4f3fe',  // --teal-3
  orange: '#f59e0b',
  orangeLight: '#fef3c7',
  red: '#dc2626',
  redLight: '#fee2e2',
  yellow: '#ca8a04',
  yellowLight: '#fef9c3',
  gray: '#6b7280',
  grayLight: '#f3f4f6',
};

const fonts = {
  size: {
    xs: 8,
    sm: 10,
    base: 12,
    lg: 14,
    xl: 18,
    '2xl': 24,
    '3xl': 30,
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
};

const page = {
  width: 595.28,  // A4 width in points
  height: 841.89, // A4 height in points
  margin: 40,
  contentWidth: 595.28 - 80, // width - 2*margin
};

function getVariantColors(variant) {
  const variants = {
    green: { bg: colors.greenLight, text: colors.green },
    blue: { bg: colors.blueLight, text: colors.blue },
    teal: { bg: colors.tealLight, text: colors.teal },
    orange: { bg: colors.orangeLight, text: colors.orange },
    red: { bg: colors.redLight, text: colors.red },
    yellow: { bg: colors.yellowLight, text: colors.yellow },
    gray: { bg: colors.grayLight, text: colors.gray },
  };
  return variants[variant] || variants.blue;
}

// Format money values: "$1234567.891" -> "$1,234,567.89"
function formatMoney(value) {
  if (value === null || value === undefined) return '';

  const str = String(value);

  // Check if it's a money value (starts with $ or is a number)
  const moneyMatch = str.match(/^\$?([\d,]+\.?\d*)(.*)$/);
  if (!moneyMatch) return str;

  let [, numPart, suffix] = moneyMatch;

  // Remove existing commas and parse
  numPart = numPart.replace(/,/g, '');
  const num = parseFloat(numPart);

  if (isNaN(num)) return str;

  // Format with commas, max 2 decimal places
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // Add $ prefix if original had it or looks like money
  const hasPrefix = str.startsWith('$');
  return (hasPrefix ? '$' : '') + formatted + (suffix || '');
}

// Format number values: "1234567" -> "1,234,567"
function formatNumber(value) {
  if (value === null || value === undefined) return '';

  const str = String(value);
  const num = parseFloat(str.replace(/,/g, ''));

  if (isNaN(num)) return str;

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Format percentage: "0.75" -> "75%" or pass through "75%"
function formatPercent(value) {
  if (value === null || value === undefined) return '';

  const str = String(value);
  if (str.includes('%')) return str;

  const num = parseFloat(str);
  if (isNaN(num)) return str;

  // If it's a decimal, convert to percentage
  if (num > 0 && num < 1) {
    return (num * 100).toFixed(1).replace(/\.0$/, '') + '%';
  }

  return num.toFixed(1).replace(/\.0$/, '') + '%';
}

module.exports = {
  colors,
  fonts,
  spacing,
  page,
  getVariantColors,
  formatMoney,
  formatNumber,
  formatPercent,
};
