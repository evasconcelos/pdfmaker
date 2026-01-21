import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'green' | 'blue' | 'orange' | 'purple';
  delay?: number;
}

export function MetricCard({ label, value, sublabel, icon, variant = 'default', delay = 0 }: MetricCardProps) {
  const variantStyles = {
    default: 'border-white/10',
    green: 'border-emerald-500/30 bg-emerald-500/5',
    blue: 'border-brand-500/30 bg-brand-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
  };

  const textStyles = {
    default: 'text-white',
    green: 'text-emerald-400',
    blue: 'text-brand-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={clsx(
        'glass rounded-xl p-4 border',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wide">{label}</p>
          <p className={clsx('text-2xl font-bold mt-1', textStyles[variant])}>{value}</p>
          {sublabel && <p className="text-white/40 text-xs mt-1">{sublabel}</p>}
        </div>
        {icon && (
          <div className={clsx('p-2 rounded-lg bg-white/5', textStyles[variant])}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
