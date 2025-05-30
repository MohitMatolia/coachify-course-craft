
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Zap, CheckCircle } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepTwoProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepTwo = ({ courseData, updateCourseData }: StepTwoProps) => {
  const learningModes = [
    {
      id: 'live',
      title: 'Live Classes',
      description: 'Interactive sessions with real-time doubt solving',
      features: ['Live interaction', 'Real-time doubt solving', 'Recorded for later'],
      price: '₹5,000',
      icon: Video,
      color: 'from-red-500 to-orange-500',
      badge: 'Most Popular'
    },
    {
      id: 'recorded',
      title: 'Pre-recorded',
      description: 'Learn at your own pace with structured content',
      features: ['Self-paced learning', 'Lifetime access', 'Download offline'],
      price: '₹1,000',
      icon: Play,
      color: 'from-blue-500 to-purple-500',
      badge: 'Budget Friendly'
    },
    {
      id: 'hybrid',
      title: 'Hybrid Learning',
      description: 'Best of both worlds - live + recorded',
      features: ['Live + recorded', 'Flexible schedule', 'Complete package'],
      price: '₹3,000',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      badge: 'Recommended'
    }
  ];

  const selectMode = (modeId: string) => {
    updateCourseData('learningMode', modeId);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Choose your preferred learning mode. Each option is designed to cater to different learning styles and schedules.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {learningModes.map((mode, index) => {
          const isSelected = courseData.learningMode === mode.id;
          const Icon = mode.icon;
          
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectMode(mode.id)}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'glass-card-selected border-2 border-orange-400' 
                  : 'glass-card border border-purple-400/30 hover:border-purple-400/60'
              }`}
            >
              {mode.badge && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {mode.badge}
                  </span>
                </div>
              )}

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{mode.title}</h3>
              <p className="text-purple-200 text-sm mb-4">{mode.description}</p>
              
              <ul className="space-y-2 mb-4">
                {mode.features.map((feature, idx) => (
                  <li key={idx} className="text-purple-300 text-xs flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-orange-400 font-bold text-lg">
                {mode.price}
              </div>
            </motion.div>
          );
        })}
      </div>

      {courseData.learningMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Perfect! You've chosen {learningModes.find(m => m.id === courseData.learningMode)?.title} mode.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepTwo;
