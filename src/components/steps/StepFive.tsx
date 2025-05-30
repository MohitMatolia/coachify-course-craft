
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Crown, CheckCircle, FileText, Timer, BarChart } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepFiveProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepFive = ({ courseData, updateCourseData }: StepFiveProps) => {
  const testSeries = [
    {
      id: 'basic',
      title: 'Basic Test Series',
      description: 'Foundation level practice tests',
      features: ['15 Full-length tests', 'Sectional tests', 'Basic analytics', 'PDF solutions'],
      price: '₹999',
      icon: FileText,
      color: 'from-green-500 to-blue-500',
      tests: 15,
      analytics: 'Basic'
    },
    {
      id: 'advanced',
      title: 'Advanced Test Series',
      description: 'Comprehensive practice with detailed analysis',
      features: ['25 Full-length tests', 'Sectional tests', 'Advanced analytics', 'Video solutions', 'Peer comparison'],
      price: '₹1,999',
      icon: Target,
      color: 'from-blue-500 to-purple-500',
      badge: 'Popular',
      tests: 25,
      analytics: 'Advanced'
    },
    {
      id: 'toppers',
      title: 'Toppers Edition',
      description: 'Ultimate preparation for 99+ percentile',
      features: ['40 Full-length tests', 'Sectional tests', 'AI-powered analytics', 'Video solutions', 'Personal mentor feedback', 'Toppers study group'],
      price: '₹2,999',
      icon: Crown,
      color: 'from-purple-500 to-orange-500',
      badge: 'Premium',
      tests: 40,
      analytics: 'AI-Powered'
    }
  ];

  const selectTestSeries = (seriesId: string) => {
    updateCourseData('testSeries', seriesId);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Choose your test series package. Regular practice with mock tests is crucial for CAT success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testSeries.map((series, index) => {
          const isSelected = courseData.testSeries === series.id;
          const Icon = series.icon;
          
          return (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectTestSeries(series.id)}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'glass-card-selected border-2 border-orange-400' 
                  : 'glass-card border border-purple-400/30 hover:border-purple-400/60'
              }`}
            >
              {series.badge && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {series.badge}
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
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${series.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{series.title}</h3>
              <p className="text-purple-200 text-sm mb-4">{series.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4 text-orange-400" />
                  <span className="text-purple-200 text-xs">{series.tests} Tests</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart className="w-4 h-4 text-orange-400" />
                  <span className="text-purple-200 text-xs">{series.analytics}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {series.features.map((feature, idx) => (
                  <li key={idx} className="text-purple-300 text-xs flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-orange-400 font-bold text-lg">
                {series.price}
              </div>
            </motion.div>
          );
        })}
      </div>

      {courseData.testSeries && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Great choice! You've selected the {testSeries.find(s => s.id === courseData.testSeries)?.title}.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepFive;
