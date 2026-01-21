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

// Risk assessment components
const riskScoreCard = require('./riskScoreCard');
const scoreCalculation = require('./scoreCalculation');
const scoreAdjustments = require('./scoreAdjustments');
const riskDistribution = require('./riskDistribution');
const categoryScores = require('./categoryScores');

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
  // Risk assessment
  riskScoreCard,
  scoreCalculation,
  scoreAdjustments,
  riskDistribution,
  categoryScores,
};

module.exports = components;
