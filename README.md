# PDF Maker

Generate print-friendly PDF documents from structured JSON component definitions.

## Page Breaks

**This is the most important feature of PDF Maker.** Components must never be split across page boundaries. Each component is responsible for checking if it fits on the current page before rendering. If it doesn't fit, it adds a page break first.

When creating or modifying components, always:

1. Calculate the total height needed before rendering
2. Check if `cursor.y + totalHeight > page.height - page.margin`
3. If true, call `doc.addPage()` and reset `cursor.y = page.margin`

Example:

```js
function render(doc, data, cursor) {
  // Calculate total height needed
  const totalHeight = /* sum of all content heights */;

  // Check if component fits, if not add page break
  if (cursor.y + totalHeight > page.height - page.margin) {
    doc.addPage();
    cursor.y = page.margin;
  }

  // Now render the component...
}
```

Components with multiple items (lists, tables) should also check page breaks between items if they can be reasonably split.

## Installation

```bash
npm install
```

## Usage

```bash
node pdfmaker.js input.json
```

Outputs a PDF with the same filename (`input.json` → `input.pdf`).

## Input Format

```json
{
  "page": "PageName",
  "tab": "TabName",
  "components": {
    "pageHeader": { ... },
    "propertyHeader": { ... },
    "financialCards": [ ... ]
  }
}
```

See `sample-components.json` for a complete example.

## Components

| Component | Description |
|-----------|-------------|
| `pageHeader` | Page title with action buttons |
| `propertyHeader` | Tags, title, location, address, description |
| `financialCards` | Highlighted financial metric cards |
| `stabilizedMetrics` | Grid of key metrics (Cap Rate, DSCR, etc.) |
| `executiveSummary` | Text summary with optional badge |
| `capitalTables` | Sources and Uses of Capital tables |
| `capitalStructureNotes` | Bulleted list of notes |
| `marketOverview` | Market statistics with colored cards |
| `competitivePositioning` | Comparison bar charts |

## Project Structure

```
pdfmaker/
├── pdfmaker.js           # Entry point
├── components/
│   ├── index.js          # Component registry
│   ├── styles.js         # Colors, fonts, spacing
│   └── *.js              # Individual components
└── sample-components.json
```

## Adding Components

1. Create `components/myComponent.js`:

```js
const { colors, fonts, spacing, page } = require('./styles');

function render(doc, data, cursor) {
  // Render using PDFKit doc
  doc.fontSize(fonts.size.lg).text(data.title, cursor.x, cursor.y);
  cursor.y += 20;
  return cursor;
}

module.exports = { render };
```

2. Register in `components/index.js`
3. Add to `renderOrder` in `pdfmaker.js`

## Variants

Color variants for cards: `green`, `blue`, `purple`, `orange`, `gray`
