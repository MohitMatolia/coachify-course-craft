
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Download, Truck, CheckCircle, Clock, Package } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepFourProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepFour = ({ courseData, updateCourseData }: StepFourProps) => {
  const bookOptions = [
    {
      id: 'printed',
      title: 'Printed Books',
      description: 'Physical books delivered to your doorstep',
      features: ['High-quality paper', 'Easy to annotate', 'No screen fatigue', 'Doorstep delivery'],
      price: '₹2,999',
      icon: Book,
      color: 'from-blue-500 to-purple-500',
      deliveryTime: '3-5 days',
      badge: 'Popular'
    },
    {
      id: 'digital',
      title: 'E-Books',
      description: 'Digital books for instant access',
      features: ['Instant download', 'Search functionality', 'Portable access', 'Interactive content'],
      price: '₹1,999',
      icon: Download,
      color: 'from-green-500 to-blue-500',
      deliveryTime: 'Instant',
      badge: 'Eco-Friendly'
    },
    {
      id: 'both',
      title: 'Both (Combo)',
      description: 'Get the best of both worlds',
      features: ['Physical + digital copy', 'Flexibility to study anywhere', 'Backup access', 'Complete package'],
      price: '₹3,999',
      icon: Package,
      color: 'from-purple-500 to-orange-500',
      deliveryTime: '3-5 days',
      badge: 'Best Value'
    }
  ];

  const selectBooks = (booksId: string) => {
    updateCourseData('books', booksId);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Choose how you'd like to receive your study materials. Our books are specifically designed for CAT preparation with updated content and practice questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bookOptions.map((option, index) => {
          const isSelected = courseData.books === option.id;
          const Icon = option.icon;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectBooks(option.id)}
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

              {/* Delivery Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {option.id === 'printed' || option.id === 'both' ? (
                    <Truck className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-400" />
                  )}
                  <span className="text-purple-200 text-xs">{option.deliveryTime}</span>
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

      {courseData.books && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Perfect! You've selected {bookOptions.find(b => b.id === courseData.books)?.title} for your study materials.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepFour;
