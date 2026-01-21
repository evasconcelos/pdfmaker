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
    gray: { bg: colors.grayLight, text: colors.gray },
  };
  return variants[variant] || variants.blue;
}

module.exports = {
  colors,
  fonts,
  spacing,
  page,
  getVariantColors,
};
