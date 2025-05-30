
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

const ProgressBar = ({ currentStep, totalSteps, percentage }: ProgressBarProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="glass-card p-6 rounded-xl mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-purple-200 text-sm font-medium">
          Building your dream plan...
        </span>
        <span className="text-white text-sm font-bold">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : step === currentStep
                    ? 'bg-purple-600 border-purple-400 text-white'
                    : 'bg-purple-900/30 border-purple-700 text-purple-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{step}</span>
                )}
              </motion.div>
              <span className="text-xs text-purple-300 mt-1 hidden sm:block">
                {step === 1 && "Focus"}
                {step === 2 && "Mode"}
                {step === 3 && "Mentors"}
                {step === 4 && "Tests"}
                {step === 5 && "Doubts"}
                {step === 6 && "Review"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
