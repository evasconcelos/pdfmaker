import { motion } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';

interface CurlPreviewProps {
  endpoint: string;
  method?: string;
  data: unknown;
}

export function CurlPreview({ endpoint, method = 'POST', data }: CurlPreviewProps) {
  const [copied, setCopied] = useState(false);

  const curlCommand = `curl -X ${method} http://localhost:3000${endpoint} \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(data, null, 2).split('\n').join('\n  ')}'`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-medium text-white/70">cURL Command</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-white/50" />
              <span className="text-xs text-white/50">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto">
        <code>{curlCommand}</code>
      </pre>
    </motion.div>
  );
}
