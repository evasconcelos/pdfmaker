// Shared styles and constants for PDF components

const colors = {
  primary: '#1a1a2e',
  secondary: '#4a4a68',
  muted: '#6b7280',
  border: '#e5e7eb',
  background: '#f9fafb',
  white: '#ffffff',

  // Variant colors
  green: '#10b981',
  greenLight: '#d1fae5',
  blue: '#3b82f6',
  blueLight: '#dbeafe',
  purple: '#8b5cf6',
  purpleLight: '#ede9fe',
  orange: '#f59e0b',
  orangeLight: '#fef3c7',
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
    purple: { bg: colors.purpleLight, text: colors.purple },
    orange: { bg: colors.orangeLight, text: colors.orange },
    gray: { bg: colors.grayLight, text: colors.gray },
  };
  return variants[variant] || variants.gray;
}

module.exports = {
  colors,
  fonts,
  spacing,
  page,
  getVariantColors,
};
