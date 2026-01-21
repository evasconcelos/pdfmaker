import { motion } from 'framer-motion';
import { ArrowRight, FileJson, Cpu, FileText, Download } from 'lucide-react';
import clsx from 'clsx';

interface FlowDiagramProps {
  currentStep: number;
  showPreviewStep?: boolean;
}

const allSteps = [
  { icon: FileJson, label: 'Input Data', description: 'Deal data', stepIndex: 0 },
  { icon: Cpu, label: 'AI Schema', description: 'Generate mapping', stepIndex: 1 },
  { icon: FileText, label: 'Components', description: 'Preview layout', stepIndex: 2, previewOnly: true },
  { icon: Download, label: 'PDF Output', description: 'Download result', stepIndex: 3 },
];

export function FlowDiagram({ currentStep, showPreviewStep = false }: FlowDiagramProps) {
  // Filter steps based on whether preview is enabled
  const steps = showPreviewStep
    ? allSteps
    : allSteps.filter(s => !s.previewOnly);

  // Map current step to display index
  const getDisplayState = (stepIndex: number) => {
    if (showPreviewStep) {
      return {
        isActive: stepIndex === currentStep,
        isComplete: stepIndex < currentStep,
      };
    } else {
      // When preview is hidden, step 3 (PDF) comes right after step 0 (Input)
      if (stepIndex === 0) {
        return { isActive: currentStep === 0, isComplete: currentStep > 0 };
      }
      if (stepIndex === 1) {
        return { isActive: false, isComplete: currentStep === 3 };
      }
      if (stepIndex === 3) {
        return { isActive: currentStep === 3, isComplete: false };
      }
      return { isActive: false, isComplete: false };
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const { isActive, isComplete } = getDisplayState(step.stepIndex);

        return (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? '0 0 30px rgba(99, 102, 241, 0.4)' : 'none',
                }}
                className={clsx(
                  'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                  isActive && 'bg-gradient-to-br from-brand-500 to-brand-600',
                  isComplete && 'bg-emerald-500/20 border border-emerald-500/40',
                  !isActive && !isComplete && 'glass'
                )}
              >
                <Icon
                  className={clsx(
                    'w-6 h-6',
                    isActive && 'text-white',
                    isComplete && 'text-emerald-400',
                    !isActive && !isComplete && 'text-white/40'
                  )}
                />
              </motion.div>
              <span
                className={clsx(
                  'mt-2 text-xs font-medium',
                  isActive && 'text-white',
                  isComplete && 'text-emerald-400',
                  !isActive && !isComplete && 'text-white/40'
                )}
              >
                {step.label}
              </span>
              <span
                className={clsx(
                  'text-[10px]',
                  isActive ? 'text-white/60' : 'text-white/30'
                )}
              >
                {step.description}
              </span>
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="mx-3"
              >
                <ArrowRight
                  className={clsx(
                    'w-5 h-5',
                    isComplete ? 'text-emerald-400' : 'text-white/20'
                  )}
                />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
