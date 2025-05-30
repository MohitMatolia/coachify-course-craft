
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Brain, CheckCircle } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepOneProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepOne = ({ courseData, updateCourseData }: StepOneProps) => {
  const focusAreas = [
    {
      id: 'qa',
      title: 'Quantitative Aptitude',
      description: 'Master arithmetic, algebra, geometry & more',
      icon: Calculator,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'varc',
      title: 'Verbal Ability & RC',
      description: 'Reading comprehension, grammar & vocabulary',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'lrdi',
      title: 'Logical Reasoning & DI',
      description: 'Data interpretation & logical puzzles',
      icon: Brain,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const toggleFocusArea = (areaId: string) => {
    const currentAreas = courseData.focusAreas;
    const newAreas = currentAreas.includes(areaId)
      ? currentAreas.filter(area => area !== areaId)
      : [...currentAreas, areaId];
    
    updateCourseData('focusAreas', newAreas);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Select the areas you want to focus on. You can choose multiple areas based on your strengths and weaknesses.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {focusAreas.map((area, index) => {
          const isSelected = courseData.focusAreas.includes(area.id);
          const Icon = area.icon;
          
          return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFocusArea(area.id)}
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
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{area.title}</h3>
              <p className="text-purple-200 text-sm">{area.description}</p>
              
              <div className="mt-4 text-xs text-purple-300">
                Base Price: ₹2,999
              </div>
            </motion.div>
          );
        })}
      </div>

      {courseData.focusAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Great choice! You've selected {courseData.focusAreas.length} focus area{courseData.focusAreas.length > 1 ? 's' : ''}.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepOne;
