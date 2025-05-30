
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Smartphone, Video, CheckCircle, Clock, Users, Zap } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepSixProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepSix = ({ courseData, updateCourseData }: StepSixProps) => {
  const doubtSolvingOptions = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Quick text-based doubt solving',
      features: ['24/7 WhatsApp support', 'Text & image queries', 'Response within 30 mins', 'Group discussions'],
      price: '₹499',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      responseTime: '30 mins',
      availability: '24/7'
    },
    {
      id: 'app',
      title: 'DoubtPucho App',
      description: 'Dedicated app-based doubt solving',
      features: ['In-app messaging', 'File & media sharing', 'Doubt history tracking', 'Expert responses', 'Smart search'],
      price: '₹799',
      icon: Smartphone,
      color: 'from-blue-500 to-purple-500',
      badge: 'Recommended',
      responseTime: '15 mins',
      availability: '18 hours'
    },
    {
      id: 'live',
      title: 'Live Doubt Sessions',
      description: 'Interactive video sessions with experts',
      features: ['Live video sessions', 'Screen sharing', 'Instant clarification', 'Record sessions', 'Group doubt solving', '1-on-1 sessions'],
      price: '₹1,499',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      badge: 'Premium',
      responseTime: 'Instant',
      availability: 'Scheduled'
    }
  ];

  const selectDoubtSolving = (optionId: string) => {
    updateCourseData('doubtSolving', optionId);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Choose your preferred doubt solving method. Getting timely help is crucial for maintaining your study momentum.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doubtSolvingOptions.map((option, index) => {
          const isSelected = courseData.doubtSolving === option.id;
          const Icon = option.icon;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectDoubtSolving(option.id)}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'glass-card-selected border-2 border-orange-400' 
                  : 'glass-card border border-purple-400/30 hover:border-purple-400/60'
              }`}
            >
              {option.badge && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {option.badge}
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
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{option.title}</h3>
              <p className="text-purple-200 text-sm mb-4">{option.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-purple-200 text-xs">{option.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-purple-200 text-xs">{option.availability}</span>
                </div>
              </div>
              
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

      {courseData.doubtSolving && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Perfect! You've chosen {doubtSolvingOptions.find(o => o.id === courseData.doubtSolving)?.title} for doubt resolution.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepSix;
