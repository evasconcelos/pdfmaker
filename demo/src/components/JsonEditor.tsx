import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  maxHeight?: string;
}

export function JsonEditor({ value, onChange, readOnly = false, maxHeight = '400px' }: JsonEditorProps) {
  if (readOnly) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl overflow-hidden"
        style={{ maxHeight }}
      >
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '0.75rem',
            fontSize: '0.75rem',
            maxHeight,
            overflow: 'auto',
          }}
        >
          {value}
        </SyntaxHighlighter>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl overflow-hidden"
    >
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-black/30 text-white/90 font-mono text-xs p-4 rounded-xl border border-white/10 focus:border-brand-500/50 focus:outline-none resize-none"
        style={{ maxHeight, minHeight: '200px' }}
        spellCheck={false}
      />
    </motion.div>
  );
}
