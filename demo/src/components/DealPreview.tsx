import { motion } from 'framer-motion';
import { Building2, MapPin, DollarSign, TrendingUp, Percent, BarChart3 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MetricCard } from './MetricCard';
import type { titusvilleDealData } from '../data/titusville';

interface DealPreviewProps {
  data: typeof titusvilleDealData;
}

export function DealPreview({ data }: DealPreviewProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}MM`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Property Header */}
      <GlassCard className="p-5" delay={0}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 text-xs font-medium rounded-full">
                {data.propertyInfo.type}
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-white/70 text-xs font-medium rounded-full">
                {data.propertyInfo.keys} Keys
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{data.propertyInfo.name}</h2>
            <div className="flex items-center gap-1 mt-1 text-brand-300 text-sm">
              <MapPin className="w-4 h-4" />
              {data.propertyInfo.location}
            </div>
            <p className="text-white/50 text-xs mt-1">{data.propertyInfo.address}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl">
            <Building2 className="w-8 h-8 text-brand-400" />
          </div>
        </div>
      </GlassCard>

      {/* Financial Highlights */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Total Uses"
          value={formatCurrency(data.financials.totalUses)}
          sublabel={`${formatCurrency(data.financials.costPerKey)} per key`}
          icon={<DollarSign className="w-5 h-5" />}
          variant="green"
          delay={0.1}
        />
        <MetricCard
          label="Senior Loan"
          value={formatCurrency(data.financials.seniorLoan)}
          sublabel={`${formatCurrency(data.financials.loanPerKey)} per key`}
          icon={<DollarSign className="w-5 h-5" />}
          variant="blue"
          delay={0.15}
        />
      </div>

      {/* Stabilized Metrics */}
      <GlassCard className="p-4" delay={0.2}>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Stabilized Metrics</h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-brand-400" />
            </div>
            <p className="text-lg font-bold text-white">{formatPercent(data.stabilizedMetrics.capRate)}</p>
            <p className="text-xs text-white/50">Cap Rate</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-lg font-bold text-white">{data.stabilizedMetrics.dscr.toFixed(2)}x</p>
            <p className="text-xs text-white/50">DSCR</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-lg font-bold text-white">{formatPercent(data.stabilizedMetrics.debtYield)}</p>
            <p className="text-xs text-white/50">Debt Yield</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-lg font-bold text-white">${data.stabilizedMetrics.revPAR}</p>
            <p className="text-xs text-white/50">RevPAR</p>
          </div>
        </div>
      </GlassCard>

      {/* Risk Assessment */}
      <GlassCard className="p-4" delay={0.25}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/70">Risk Assessment</h3>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
            {data.riskAssessment.riskLevel}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                stroke="url(#gradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 220' }}
                animate={{ strokeDasharray: `${(data.riskAssessment.overallScore / 100) * 220} 220` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{data.riskAssessment.overallScore}</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {data.riskAssessment.categories.slice(0, 3).map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{cat.name}</span>
                  <span className="text-white/80">{cat.score}/10</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score * 10}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
