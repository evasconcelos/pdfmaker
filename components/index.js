// Component registry - add new components here

const pageHeader = require('./pageHeader');
const propertyHeader = require('./propertyHeader');
const financialCards = require('./financialCards');
const stabilizedMetrics = require('./stabilizedMetrics');
const executiveSummary = require('./executiveSummary');
const capitalTables = require('./capitalTables');
const capitalStructureNotes = require('./capitalStructureNotes');
const marketOverview = require('./marketOverview');
const competitivePositioning = require('./competitivePositioning');

const components = {
  pageHeader,
  propertyHeader,
  financialCards,
  stabilizedMetrics,
  executiveSummary,
  capitalTables,
  capitalStructureNotes,
  marketOverview,
  competitivePositioning,
};

module.exports = components;
