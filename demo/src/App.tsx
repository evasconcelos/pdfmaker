import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Eye,
  Download,
  Play,
  RotateCcw,
  Zap,
  ChevronDown,
  ChevronUp,
  Send,
  Building2,
  MapPin,
  DollarSign,
  Percent,
  BarChart3,
  TrendingUp,
  Shield,
} from 'lucide-react';

import { GlassCard, GlassCardStrong } from './components/GlassCard';
import { Button } from './components/Button';
import { FlowDiagram } from './components/FlowDiagram';
import { JsonEditor } from './components/JsonEditor';
import { CurlPreview } from './components/CurlPreview';
import { ServerStatus } from './components/ServerStatus';
import { titusvilleDealData, titusvilleComponentData } from './data/titusville';
import { useGenerateSchema, usePreview, useGeneratePdf } from './hooks/usePdfMaker';

const queryClient = new QueryClient();

function DealCard() {
  const data = titusvilleDealData;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}MM`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Property Header */}
      <GlassCardStrong className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-500/20 rounded-xl">
            <Building2 className="w-8 h-8 text-brand-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-brand-500/20 text-brand-300 text-xs font-medium rounded-full">
                {data.propertyInfo.type}
              </span>
              <span className="px-2.5 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full">
                {data.propertyInfo.keys} Keys
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{data.propertyInfo.name}</h2>
            <div className="flex items-center gap-1 mt-1 text-brand-300 text-sm">
              <MapPin className="w-4 h-4" />
              {data.propertyInfo.location}
            </div>
            <p className="text-white/40 text-xs mt-1">{data.propertyInfo.address}</p>
          </div>
        </div>
      </GlassCardStrong>

      {/* Financial Highlights - Two Cards Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Total Uses</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">{formatCurrency(data.financials.totalUses)}</p>
          <p className="text-white/40 text-sm mt-1">{formatCurrency(data.financials.costPerKey)} per key</p>
        </GlassCard>

        <GlassCard className="p-5 border-brand-500/20 bg-brand-500/5">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-brand-400" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Senior Loan</span>
          </div>
          <p className="text-3xl font-bold text-brand-400">{formatCurrency(data.financials.seniorLoan)}</p>
          <p className="text-white/40 text-sm mt-1">{formatCurrency(data.financials.loanPerKey)} per key</p>
        </GlassCard>
      </div>

      {/* Stabilized Metrics */}
      <GlassCard className="p-5">
        <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wide">Stabilized Metrics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/5 rounded-xl flex items-center justify-center">
              <Percent className="w-5 h-5 text-brand-400" />
            </div>
            <p className="text-2xl font-bold text-white">{(data.stabilizedMetrics.capRate * 100).toFixed(1)}%</p>
            <p className="text-xs text-white/50 mt-1">Cap Rate</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/5 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">{data.stabilizedMetrics.dscr.toFixed(2)}x</p>
            <p className="text-xs text-white/50 mt-1">DSCR</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/5 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">{(data.stabilizedMetrics.debtYield * 100).toFixed(1)}%</p>
            <p className="text-xs text-white/50 mt-1">Debt Yield</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/5 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">${data.stabilizedMetrics.revPAR}</p>
            <p className="text-xs text-white/50 mt-1">RevPAR</p>
          </div>
        </div>
      </GlassCard>

      {/* Risk Assessment */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">Risk Assessment</h3>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {data.riskAssessment.riskLevel}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {/* Score Circle */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="42"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 264' }}
                animate={{ strokeDasharray: `${(data.riskAssessment.overallScore / 100) * 264} 264` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{data.riskAssessment.overallScore}</span>
            </div>
          </div>

          {/* Category Scores */}
          <div className="flex-1 space-y-3">
            {data.riskAssessment.categories.slice(0, 3).map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-white/60 text-sm w-32">{cat.name}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score * 10}%` }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full"
                  />
                </div>
                <span className="text-white font-semibold text-sm w-12 text-right">{cat.score}/10</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function DemoApp() {
  const [step, setStep] = useState(0);
  const [userQuery, setUserQuery] = useState('');
  const [jsonInput] = useState(JSON.stringify(titusvilleDealData, null, 2));
  const [schemaResult, setSchemaResult] = useState<{ schemaId: string; schemaName: string; componentsMatched: number } | null>(null);
  const [previewResult, setPreviewResult] = useState<unknown>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPreviewStep, setShowPreviewStep] = useState(false);

  const generateSchema = useGenerateSchema();
  const preview = usePreview();
  const generatePdf = useGeneratePdf();

  const handleGenerate = useCallback(async () => {
    if (!userQuery.trim()) return;

    try {
      const data = titusvilleDealData;
      const fullQuery = `${userQuery}. Use this deal data for a Tru by Hilton hotel construction project in Titusville, FL.`;

      const result = await generateSchema.mutateAsync({
        query: fullQuery,
        data,
      });
      setSchemaResult(result);

      // Skip preview step unless toggle is on
      if (showPreviewStep) {
        setStep(1);
      } else {
        // Go directly to PDF generation
        const pdfResult = await generatePdf.mutateAsync({
          query: fullQuery,
          data,
        });
        const url = URL.createObjectURL(pdfResult.blob);
        setPdfUrl(url);
        setStep(3);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    }
  }, [userQuery, generateSchema, showPreviewStep, generatePdf]);

  const handlePreview = useCallback(async () => {
    try {
      const data = titusvilleDealData;
      const result = await preview.mutateAsync({
        schemaId: schemaResult?.schemaId,
        data,
        query: userQuery,
      });
      setPreviewResult(result.preview);
      setStep(2);
    } catch (error) {
      console.error('Preview failed:', error);
    }
  }, [userQuery, schemaResult, preview]);

  const handleGeneratePdf = useCallback(async () => {
    try {
      const data = titusvilleDealData;
      const result = await generatePdf.mutateAsync({
        query: userQuery,
        data,
      });
      const url = URL.createObjectURL(result.blob);
      setPdfUrl(url);
      setStep(3);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  }, [userQuery, generatePdf]);

  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'titusville-pre-screening-memo.pdf';
      a.click();
    }
  }, [pdfUrl]);

  const handleReset = useCallback(() => {
    setStep(0);
    setUserQuery('');
    setSchemaResult(null);
    setPreviewResult(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  }, [pdfUrl]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-lg shadow-brand-500/25">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">PDFMaker</h1>
          </div>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Generate beautiful PDF documents from deal data using AI
          </p>
          <div className="mt-4 flex justify-center">
            <ServerStatus />
          </div>
        </motion.header>

        {/* Flow Diagram */}
        <FlowDiagram currentStep={step} showPreviewStep={showPreviewStep} />

        {/* Main Content - Single Column */}
        <div className="space-y-6 mt-8">
          {/* Query Input */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="query-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCardStrong className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">What would you like to create?</h2>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                      placeholder="e.g., Create a pre-screening memo for this hotel deal..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                    />
                    <Button
                      onClick={handleGenerate}
                      loading={generateSchema.isPending || generatePdf.isPending}
                      disabled={!userQuery.trim()}
                      icon={<Send className="w-4 h-4" />}
                      size="lg"
                    >
                      Generate
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-white/40 text-sm">
                      Your request will be combined with the Titusville deal data below
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-white/40 text-xs">Show preview step</span>
                      <button
                        type="button"
                        onClick={() => setShowPreviewStep(!showPreviewStep)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${showPreviewStep ? 'bg-brand-500' : 'bg-white/20'}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${showPreviewStep ? 'translate-x-4' : ''}`}
                        />
                      </button>
                    </label>
                  </div>
                </GlassCardStrong>
              </motion.div>
            )}

            {step === 1 && schemaResult && (
              <motion.div
                key="schema-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCardStrong className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Schema Generated</h3>
                      <p className="text-white/50 text-sm">AI analyzed your request and created a document structure</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <span className="text-white/50 text-xs">Schema ID</span>
                      <p className="text-brand-400 font-mono text-sm truncate">{schemaResult.schemaId}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <span className="text-white/50 text-xs">Name</span>
                      <p className="text-white text-sm truncate">{schemaResult.schemaName}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <span className="text-white/50 text-xs">Components</span>
                      <p className="text-emerald-400 text-sm">{schemaResult.componentsMatched} matched</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                    <div className="flex-1" />
                    <Button onClick={handlePreview} loading={preview.isPending} icon={<Eye className="w-4 h-4" />}>
                      Preview Layout
                    </Button>
                  </div>
                </GlassCardStrong>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="preview-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCardStrong className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-500/20 rounded-lg">
                      <Eye className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Component Preview</h3>
                      <p className="text-white/50 text-sm">Your PDF layout is ready for generation</p>
                    </div>
                  </div>
                  <JsonEditor
                    value={JSON.stringify(previewResult || titusvilleComponentData, null, 2)}
                    readOnly
                    maxHeight="300px"
                  />
                  <div className="flex gap-3 mt-4">
                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                    <div className="flex-1" />
                    <Button onClick={handleGeneratePdf} loading={generatePdf.isPending} icon={<Play className="w-4 h-4" />}>
                      Generate PDF
                    </Button>
                  </div>
                </GlassCardStrong>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="pdf-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCardStrong className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg animate-pulse-glow">
                      <Download className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">PDF Ready!</h3>
                      <p className="text-white/50 text-sm">Your document is ready to download</p>
                    </div>
                  </div>
                  {pdfUrl && (
                    <div className="aspect-[8.5/11] bg-white rounded-lg overflow-hidden shadow-2xl mb-4">
                      <iframe src={pdfUrl} className="w-full h-full" title="PDF Preview" />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={handleReset} icon={<RotateCcw className="w-4 h-4" />}>
                      Start Over
                    </Button>
                    <div className="flex-1" />
                    <Button onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
                      Download PDF
                    </Button>
                  </div>
                </GlassCardStrong>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deal Card - Always visible */}
          <DealCard />

          {/* Advanced Section - Collapsed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-center gap-2 py-3 text-white/40 hover:text-white/60 transition-colors"
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span className="text-sm">{showAdvanced ? 'Hide' : 'Show'} Developer Tools</span>
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <GlassCard className="p-4">
                    <h3 className="text-white/70 text-sm font-medium mb-3">Raw Deal Data (JSON)</h3>
                    <JsonEditor value={jsonInput} readOnly maxHeight="250px" />
                  </GlassCard>

                  <CurlPreview
                    endpoint="/api/pdf/generate"
                    data={{
                      query: userQuery || 'Create a pre-screening memo',
                      data: '{ ...titusvilleDealData }',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-white/30 text-sm"
        >
          <p>PDFMaker Demo - AI-powered document generation</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoApp />
    </QueryClientProvider>
  );
}
