
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, Award, MessageCircle, RefreshCw, Share, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseData } from '../CourseBuilder';

interface StepSixProps {
  courseData: CourseData;
}

const StepSix = ({ courseData }: StepSixProps) => {
  const calculatePrice = () => {
    let total = 0;
    total += courseData.focusAreas.length * 2999;
    if (courseData.learningMode === 'live') total += 5000;
    if (courseData.learningMode === 'hybrid') total += 3000;
    if (courseData.learningMode === 'recorded') total += 1000;
    total += courseData.mentors.length * 1999;
    if (courseData.testSeries === 'basic') total += 999;
    if (courseData.testSeries === 'advanced') total += 1999;
    if (courseData.testSeries === 'toppers') total += 2999;
    if (courseData.doubtSolving === 'whatsapp') total += 499;
    if (courseData.doubtSolving === 'app') total += 799;
    if (courseData.doubtSolving === 'live') total += 1499;
    return total;
  };

  const finalPrice = calculatePrice();
  const originalPrice = finalPrice * 1.4;
  const savings = originalPrice - finalPrice;

  const summaryItems = [
    {
      category: 'Focus Areas',
      items: courseData.focusAreas.map(area => ({
        name: area.toUpperCase(),
        price: 2999
      })),
      icon: Award
    },
    {
      category: 'Learning Mode',
      items: courseData.learningMode ? [{
        name: courseData.learningMode.charAt(0).toUpperCase() + courseData.learningMode.slice(1) + ' Classes',
        price: courseData.learningMode === 'live' ? 5000 : courseData.learningMode === 'hybrid' ? 3000 : 1000
      }] : [],
      icon: Calendar
    },
    {
      category: 'Mentors',
      items: courseData.mentors.map(mentor => ({
        name: mentor.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        price: 1999
      })),
      icon: Users
    },
    {
      category: 'Test Series',
      items: courseData.testSeries ? [{
        name: courseData.testSeries.charAt(0).toUpperCase() + courseData.testSeries.slice(1) + ' Test Series',
        price: courseData.testSeries === 'basic' ? 999 : courseData.testSeries === 'advanced' ? 1999 : 2999
      }] : [],
      icon: Award
    },
    {
      category: 'Doubt Solving',
      items: courseData.doubtSolving ? [{
        name: courseData.doubtSolving.charAt(0).toUpperCase() + courseData.doubtSolving.slice(1) + ' Support',
        price: courseData.doubtSolving === 'whatsapp' ? 499 : courseData.doubtSolving === 'app' ? 799 : 1499
      }] : [],
      icon: MessageCircle
    }
  ];

  return (
    <div>
      <p className="text-purple-200 mb-8">
        Congratulations! Here's your personalized CAT preparation course. Review your selections and proceed to finalize your plan.
      </p>

      {/* Course Summary */}
      <div className="space-y-6 mb-8">
        {summaryItems.map((section, index) => {
          if (section.items.length === 0) return null;
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-400 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">{section.category}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                    className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-purple-200">{item.name}</span>
                    </div>
                    <span className="text-orange-400 font-medium">₹{item.price.toLocaleString('en-IN')}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pricing Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-xl mb-8"
      >
        <h3 className="text-white font-bold text-xl mb-6 text-center">Investment Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-purple-400/20">
            <span className="text-purple-200">Course Value</span>
            <span className="text-purple-300 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-purple-400/20">
            <span className="text-purple-200">Discount Applied</span>
            <span className="text-green-400">-₹{savings.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex justify-between items-center text-xl font-bold">
            <span className="text-white">Final Investment</span>
            <span className="text-orange-400">₹{finalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl">
          <p className="text-green-300 text-sm text-center">
            🎉 You're saving ₹{savings.toLocaleString('en-IN')} with our personalized package!
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="glass-button text-white border-purple-400 hover:bg-purple-500/20"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
        
        <Button
          variant="outline"
          className="glass-button text-white border-purple-400 hover:bg-purple-500/20"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Plan
        </Button>
        
        <Button
          variant="outline"
          className="glass-button text-white border-purple-400 hover:bg-purple-500/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-xl border border-purple-400/30"
      >
        <div className="text-center">
          <h4 className="text-white font-bold text-lg mb-2">🚀 Your Journey Awaits!</h4>
          <p className="text-purple-200 text-sm">
            You've crafted the perfect CAT preparation plan. Ready to begin your journey to success?
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StepSix;
