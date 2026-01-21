import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Check, Circle } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor: index < currentStep
                  ? 'rgb(99, 102, 241)'
                  : index === currentStep
                  ? 'rgb(99, 102, 241)'
                  : 'rgba(255, 255, 255, 0.1)',
              }}
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                index === currentStep && 'ring-4 ring-brand-500/30'
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : index === currentStep ? (
                <span className="text-white font-semibold">{index + 1}</span>
              ) : (
                <Circle className="w-5 h-5 text-white/40" />
              )}
            </motion.div>
            <span
              className={clsx(
                'mt-2 text-xs font-medium',
                index <= currentStep ? 'text-white/90' : 'text-white/40'
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={clsx(
                'w-16 h-0.5 mx-4 mt-[-20px] rounded-full transition-all duration-300',
                index < currentStep ? 'bg-brand-500' : 'bg-white/10'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
