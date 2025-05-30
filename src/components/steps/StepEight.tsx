
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, FileText, User, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepEightProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepEight = ({ courseData, updateCourseData }: StepEightProps) => {
  const complimentaryAddons = [
    {
      id: 'resume-building',
      title: 'Resume Building',
      description: 'Professional resume creation and optimization',
      icon: FileText,
      color: 'from-blue-500 to-purple-500',
      originalPrice: '₹2,999',
      features: ['ATS-optimized format', 'Industry-specific templates', 'Expert review', 'Multiple revisions']
    },
    {
      id: 'sop-evaluation',
      title: 'SOP Evaluation',
      description: 'Statement of Purpose review and enhancement',
      icon: User,
      color: 'from-purple-500 to-pink-500',
      originalPrice: '₹1,999',
      features: ['Detailed feedback', 'Structure optimization', 'Content enhancement', 'Admission expert review']
    },
    {
      id: 'iim-profilizer',
      title: 'IIM Profilizer Tool',
      description: 'AI-powered profile analysis for IIM selection',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      originalPrice: '₹1,499',
      features: ['Profile strength analysis', 'IIM recommendation', 'Improvement suggestions', 'Success probability']
    }
  ];

  const totalSavings = complimentaryAddons.reduce((sum, addon) => {
    return sum + parseInt(addon.originalPrice.replace('₹', '').replace(',', ''));
  }, 0);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 px-4 py-2 rounded-full mb-4">
          <Gift className="w-5 h-5 text-white" />
          <span className="text-white font-bold">🎁 Included with Your Plan</span>
        </div>
        <p className="text-purple-200 text-lg">
          Congratulations! These premium services are included absolutely free with your course.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {complimentaryAddons.map((addon, index) => {
          const Icon = addon.icon;
          
          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-xl glass-card-selected border-2 border-green-400/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
            >
              <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${addon.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{addon.title}</h3>
              <p className="text-purple-200 text-sm mb-4">{addon.description}</p>
              
              <ul className="space-y-2 mb-4">
                {addon.features.map((feature, idx) => (
                  <li key={idx} className="text-purple-300 text-xs flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold text-lg">FREE</span>
                <span className="text-purple-300 text-sm line-through">{addon.originalPrice}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Celebration Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-xl border border-orange-400/30"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Total Savings: ₹{totalSavings.toLocaleString('en-IN')}</h3>
            <Sparkles className="w-6 h-6 text-orange-400" />
          </div>
          <p className="text-purple-200 text-lg">
            These premium services are worth ₹{totalSavings.toLocaleString('en-IN')} but included free with your Coachify course!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 font-medium">All services automatically included</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StepEight;
