import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, hover = true, glow = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'glass rounded-2xl p-6',
        hover && 'hover:bg-white/[0.06] transition-all duration-300',
        glow && 'animate-pulse-glow',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassCardStrong({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'glass-strong rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
