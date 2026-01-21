import { motion } from 'framer-motion';
import { Circle, Server } from 'lucide-react';
import { useHealthCheck } from '../hooks/usePdfMaker';

export function ServerStatus() {
  const { data, isLoading } = useHealthCheck();
  const isOnline = data?.status === 'ok';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <Server className="w-4 h-4 text-white/40" />
      <span className="text-xs text-white/50">API Server</span>
      {isLoading ? (
        <Circle className="w-2 h-2 text-yellow-500 animate-pulse" fill="currentColor" />
      ) : isOnline ? (
        <Circle className="w-2 h-2 text-emerald-500" fill="currentColor" />
      ) : (
        <Circle className="w-2 h-2 text-red-500" fill="currentColor" />
      )}
      <span className="text-xs text-white/40">
        {isLoading ? 'Checking...' : isOnline ? 'Connected' : 'Offline'}
      </span>
    </motion.div>
  );
}
