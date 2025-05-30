
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

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1: return "Subjects";
      case 2: return "Mode";
      case 3: return "Mentors";
      case 4: return "Books";
      case 5: return "Tests";
      case 6: return "Doubts";
      case 7: return "WAT/PI";
      case 8: return "Add-ons";
      default: return "";
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-purple-100 text-sm font-medium">
          Building your dream plan...
        </span>
        <span className="text-white text-sm font-bold">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-purple-800/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
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
                    : 'bg-purple-800/30 border-purple-600 text-purple-300'
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
              <span className="text-xs text-purple-200 mt-1 hidden sm:block">
                {getStepLabel(step)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
