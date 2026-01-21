// Titusville Tru by Hilton deal data extracted from PDF
export const titusvilleDealData = {
  propertyInfo: {
    name: "Tru by Hilton, Titusville, FL",
    type: "Construction",
    keys: 106,
    address: "4740 Helen Hauser Boulevard, Titusville, FL, 32780-2594",
    location: "Titusville, FL",
    sponsor: "Wealth Hospitality Group"
  },
  financials: {
    totalUses: 31740000,
    seniorLoan: 23810000,
    equity: 8750000,
    costPerKey: 299460.81,
    loanPerKey: 224595.61,
    ltc: 0.75,
    ltv: 1.1904
  },
  stabilizedMetrics: {
    capRate: 0.10,
    dscr: 1.06,
    debtYield: 0.0441,
    revPAR: 134.98
  },
  usesOfCapital: [
    { label: "Hard Costs", percentage: 63.4, amount: 20110000 },
    { label: "Soft Costs", percentage: 30.3, amount: 9620000 },
    { label: "Senior Interest Expense", percentage: 2.6, amount: 838550 },
    { label: "Senior Closing Expense", percentage: 1.7, amount: 538130 },
    { label: "Closing Expenses", percentage: 2.0, amount: 634610 }
  ],
  sourcesOfCapital: [
    { label: "Senior Loan", percentage: 73.1, amount: 23810000 },
    { label: "Equity", percentage: 26.9, amount: 8750000 }
  ],
  loanTerms: {
    rate: 0.075,
    uwRate: 0.0725,
    stressedRate: 0.0925,
    amortization: 300,
    uwDebtService: 2064955.20,
    stressedDebtService: 2446559.76
  },
  underwritingAssumptions: {
    roomCount: 106,
    otherRevenue: 0.02,
    fixedExpenses: 290000,
    noiMargin: 0.45,
    loanAmount: 23807134.61
  },
  projections: [
    { year: 1, occupancy: 0.76, adr: 156, revPAR: 118.56, roomsRevenue: 4587086.40, totalRevenue: 4690086.40, operatingProfit: 1678581.92, operatingMargin: 0.3579, fixedCosts: 561635, noi: 1116946.92, annualRepayment: 986026.12, dscr: 1.13 },
    { year: 2, occupancy: 0.78, adr: 162.24, revPAR: 126.55, roomsRevenue: 4896111.17, totalRevenue: 5002201.17, operatingProfit: 1787786.70, operatingMargin: 0.3574, fixedCosts: 581688.42, noi: 1206098.28, annualRepayment: 986026.12, dscr: 1.22 },
    { year: 3, occupancy: 0.80, adr: 168.73, revPAR: 134.98, roomsRevenue: 5222530.96, totalRevenue: 5331803.96, operatingProfit: 1853335.06, operatingMargin: 0.3476, fixedCosts: 804533.05, noi: 1048802.01, annualRepayment: 986026.12, dscr: 1.06 }
  ],
  marketOverview: {
    region: "Florida Central North USA",
    population: 3595184,
    unemployment: 0.045,
    medianIncome: 73422
  },
  competitiveSet: [
    { year: 2020, occupancy: 0.6119, adr: 145.71, revPAR: 89.16 },
    { year: 2021, occupancy: 0.7847, adr: 152.00, revPAR: 119.27 },
    { year: 2022, occupancy: 0.7962, adr: 170.45, revPAR: 135.71 },
    { year: 2023, occupancy: 0.8014, adr: 175.60, revPAR: 140.73 }
  ],
  riskAssessment: {
    baseScore: 82,
    adjustments: 5,
    overallScore: 87,
    riskLevel: "Low Risk",
    categories: [
      { name: "Brand & Flag", score: 9.0, weight: 33 },
      { name: "Borrower Profile", score: 10.0, weight: 30 },
      { name: "Location & Market", score: 9.0, weight: 11 },
      { name: "Financial", score: 5.0, weight: 15 },
      { name: "Construction", score: 8.5, weight: 10 }
    ]
  },
  executiveSummary: "This 106-key new construction Tru by Hilton in Titusville, Florida offers a strategic entry into a rapidly developing market. The project features Total Uses of $31.7MM with a Senior Loan of $23.8MM (75.0% LTC), resulting in a Cost per Key of $299,461 and Loan per Key of $224,596, with stabilized metrics projecting a 10.0% Cap Rate, 1.19x DSCR, 10.5% Debt Yield, and $135 RevPAR. The well-regarded sponsor, Wealth Hospitality Group, provides a robust market experience and financial acumen to support the project's successful execution. It's recommended to proceed with customary construction oversight and standard completion guarantor backstops."
};

// Pre-formatted component data for PDF generation
export const titusvilleComponentData = {
  page: "CreditAnalysis",
  tab: "DealOverview",
  components: [
    {
      type: "pageHeader",
      icon: "RiBarChartBoxLine",
      title: "Pre-Screening Memo",
      actions: [
        { icon: "RiEditLine", label: "Edit Assessment" },
        { icon: "RiEditLine", label: "Edit Memo" },
        { icon: "RiDownloadLine", label: "Download" }
      ]
    },
    {
      type: "propertyHeader",
      tags: [
        { label: "Construction", variant: "blue" },
        { label: "106 Keys", icon: "RiKey2Line", variant: "gray" }
      ],
      title: "Tru by Hilton, Titusville, FL",
      locationLink: { label: "Titusville, FL", href: "/locations/titusville-fl" },
      address: "4740 Helen Hauser Boulevard, Titusville, FL, 32780-2594"
    },
    {
      type: "financialCards",
      cards: [
        { amount: "$31.74MM", label: "Total Uses", sublabel: "$299,460.81 per key", variant: "green" },
        { amount: "$23.81MM", label: "Senior Loan", sublabel: "$224,595.61 per key", variant: "blue" }
      ]
    },
    {
      type: "stabilizedMetrics",
      title: "Stabilized Metrics",
      metrics: [
        { icon: "RiBuilding2Line", value: "10.0%", label: "Cap Rate", sublabel: "Projected" },
        { icon: "RiCalendarLine", value: "1.06x", label: "DSCR", sublabel: "Stabilized" },
        { icon: "RiLineChartLine", value: "4.41%", label: "Debt Yield", sublabel: "Stabilized" },
        { icon: "RiMoneyDollarBoxLine", value: "$134.98", label: "RevPAR", sublabel: "Stabilized" }
      ]
    },
    {
      type: "executiveSummary",
      title: "Executive Summary",
      badge: "AI-Powered",
      content: "This 106-key new construction Tru by Hilton in Titusville, Florida offers a strategic entry into a rapidly developing market. The project features Total Uses of $31.7MM with a Senior Loan of $23.8MM (75.0% LTC), resulting in a Cost per Key of $299,461 and Loan per Key of $224,596, with stabilized metrics projecting a 10.0% Cap Rate, 1.19x DSCR, 10.5% Debt Yield, and $135 RevPAR."
    },
    {
      type: "capitalTables",
      sourcesOfCapital: {
        title: "Sources of Capital",
        items: [
          { label: "Senior Loan", percentage: "73.1%", amount: "$23.81MM" },
          { label: "Equity", percentage: "26.9%", amount: "$8.75MM" }
        ],
        total: { label: "Total Sources", amount: "$32.55MM" }
      },
      usesOfCapital: {
        title: "Uses of Capital",
        items: [
          { label: "Hard Costs", percentage: "63.4%", amount: "$20.11MM" },
          { label: "Soft Costs", percentage: "30.3%", amount: "$9.62MM" },
          { label: "Senior Interest Expense", percentage: "2.6%", amount: "$838.55K" },
          { label: "Senior Closing Expense", percentage: "1.7%", amount: "$538.13K" },
          { label: "Closing Expenses", percentage: "2.0%", amount: "$634.61K" }
        ],
        total: { label: "Total Uses", amount: "$31.74MM" }
      }
    },
    {
      type: "marketOverview",
      title: "Market Overview",
      subtitle: "Florida Central North USA",
      metrics: [
        { value: "N/A", label: "MSA Ranking", variant: "gray" },
        { value: "3,595,184", label: "Population", variant: "blue" },
        { value: "4.5%", label: "Unemployment", variant: "orange" },
        { value: "$73,422", label: "Median Income", variant: "green" }
      ]
    },
    {
      type: "competitivePositioning",
      title: "Competitive Positioning",
      legend: { compSet: "Comp Set", projected: "Projected" },
      data: [
        { category: "Occupancy", projected: { value: 76, label: "76%" }, compSet: { value: 80, label: "80%" } },
        { category: "ADR", projected: { value: 156, label: "$156" }, compSet: { value: 141, label: "$141" } },
        { category: "RevPAR", projected: { value: 119, label: "$119" }, compSet: { value: 141, label: "$141" } }
      ]
    }
  ]
};
