
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Lightbulb, Info, CheckCircle } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepSevenProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepSeven = ({ courseData, updateCourseData }: StepSevenProps) => {
  const watPiOptions = [
    {
      id: 'watPractice',
      title: 'WAT Practice',
      description: 'Written Ability Test preparation with personalized feedback',
      icon: FileText,
      color: 'from-blue-500 to-purple-500',
      price: '₹1,499',
      features: ['30+ WAT topics', 'Expert evaluation', 'Writing tips & strategies', 'Time management practice']
    },
    {
      id: 'mockPI',
      title: 'Mock Personal Interviews',
      description: 'Practice interviews with industry experts',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      price: '₹1,999',
      features: ['5 mock interviews', 'Detailed feedback', 'Interview tips', 'Body language coaching']
    },
    {
      id: 'iimAlumniPanel',
      title: 'IIM Alumni Panel',
      description: 'Exclusive sessions with IIM alumni for insider tips',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-500',
      price: '₹2,499',
      features: ['Alumni interaction', 'IIM insights', 'Career guidance', 'Success stories']
    }
  ];

  const toggleWatPiOption = (optionId: 'watPractice' | 'mockPI' | 'iimAlumniPanel') => {
    const currentValue = courseData.watPiPrep[optionId];
    updateCourseData('watPiPrep', {
      ...courseData.watPiPrep,
      [optionId]: !currentValue
    });
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Enhance your preparation with WAT and Personal Interview training. These are optional add-ons that can significantly boost your final selection chances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watPiOptions.map((option, index) => {
          const isSelected = courseData.watPiPrep[option.id as keyof typeof courseData.watPiPrep];
          const Icon = option.icon;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleWatPiOption(option.id as 'watPractice' | 'mockPI' | 'iimAlumniPanel')}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'glass-card-selected border-2 border-orange-400' 
                  : 'glass-card border border-purple-400/30 hover:border-purple-400/60'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{option.title}</h3>
              <p className="text-purple-200 text-sm mb-4">{option.description}</p>
              
              <ul className="space-y-2 mb-4">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="text-purple-300 text-xs flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-orange-400 font-bold text-lg">
                {option.price}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-300 text-sm font-medium">Optional Enhancement</p>
            <p className="text-blue-200 text-xs mt-1">
              WAT and PI preparation can significantly improve your chances of final selection. You can add these even after the CAT exam.
            </p>
          </div>
        </div>
      </motion.div>

      {(courseData.watPiPrep.watPractice || courseData.watPiPrep.mockPI || courseData.watPiPrep.iimAlumniPanel) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Great! You've selected additional WAT/PI preparation modules to boost your selection chances.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepSeven;
