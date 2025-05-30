
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, MessageCircle, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseData } from './CourseBuilder';

interface PricingSummaryProps {
  courseData: CourseData;
  currentStep: number;
}

const PricingSummary = ({ courseData, currentStep }: PricingSummaryProps) => {
  const calculatePrice = () => {
    let basePrice = 0;
    
    // Focus Areas pricing
    basePrice += courseData.focusAreas.length * 2999;
    
    // Learning Mode pricing
    if (courseData.learningMode === 'live') basePrice += 5000;
    if (courseData.learningMode === 'hybrid') basePrice += 3000;
    if (courseData.learningMode === 'recorded') basePrice += 1000;
    
    // Mentor pricing
    basePrice += courseData.mentors.length * 1999;
    
    // Books pricing
    if (courseData.books === 'printed') basePrice += 2999;
    if (courseData.books === 'digital') basePrice += 1999;
    if (courseData.books === 'both') basePrice += 3999;
    
    // Test Series pricing
    if (courseData.testSeries === 'basic') basePrice += 999;
    if (courseData.testSeries === 'advanced') basePrice += 1999;
    if (courseData.testSeries === 'toppers') basePrice += 2999;
    
    // Doubt Solving pricing
    if (courseData.doubtSolving === 'whatsapp') basePrice += 499;
    if (courseData.doubtSolving === 'app') basePrice += 799;
    if (courseData.doubtSolving === 'live') basePrice += 1499;
    
    // WAT/PI Preparation pricing
    if (courseData.watPiPrep.watPractice) basePrice += 1499;
    if (courseData.watPiPrep.mockPI) basePrice += 1999;
    if (courseData.watPiPrep.iimAlumniPanel) basePrice += 2499;
    
    return basePrice;
  };

  const originalPrice = calculatePrice() * 1.4; // Show 40% discount
  const currentPrice = calculatePrice();
  const savings = originalPrice - currentPrice;
  const complimentarySavings = 6497; // Resume + SOP + IIM Profilizer

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-8"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Your Custom Plan</h3>
        </div>

        {/* Selected Items */}
        <div className="space-y-3 mb-6">
          {courseData.focusAreas.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Subjects ({courseData.focusAreas.length})</span>
              <span className="text-white font-medium">₹{(courseData.focusAreas.length * 2999).toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {courseData.learningMode && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm capitalize">{courseData.learningMode} Classes</span>
              <span className="text-white font-medium">
                ₹{courseData.learningMode === 'live' ? '5,000' : courseData.learningMode === 'hybrid' ? '3,000' : '1,000'}
              </span>
            </div>
          )}
          
          {courseData.mentors.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Mentors ({courseData.mentors.length})</span>
              <span className="text-white font-medium">₹{(courseData.mentors.length * 1999).toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {courseData.books && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm capitalize">{courseData.books === 'both' ? 'Combo' : courseData.books} Books</span>
              <span className="text-white font-medium">
                ₹{courseData.books === 'printed' ? '2,999' : courseData.books === 'digital' ? '1,999' : '3,999'}
              </span>
            </div>
          )}
          
          {courseData.testSeries && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm capitalize">{courseData.testSeries} Test Series</span>
              <span className="text-white font-medium">
                ₹{courseData.testSeries === 'basic' ? '999' : courseData.testSeries === 'advanced' ? '1,999' : '2,999'}
              </span>
            </div>
          )}
          
          {courseData.doubtSolving && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm capitalize">{courseData.doubtSolving === 'app' ? 'DoubtPucho' : courseData.doubtSolving} Support</span>
              <span className="text-white font-medium">
                ₹{courseData.doubtSolving === 'whatsapp' ? '499' : courseData.doubtSolving === 'app' ? '799' : '1,499'}
              </span>
            </div>
          )}

          {/* WAT/PI Preparation */}
          {courseData.watPiPrep.watPractice && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">WAT Practice</span>
              <span className="text-white font-medium">₹1,499</span>
            </div>
          )}
          
          {courseData.watPiPrep.mockPI && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Mock PI</span>
              <span className="text-white font-medium">₹1,999</span>
            </div>
          )}
          
          {courseData.watPiPrep.iimAlumniPanel && (
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">IIM Alumni Panel</span>
              <span className="text-white font-medium">₹2,499</span>
            </div>
          )}
        </div>

        {/* Complimentary Add-ons */}
        {currentStep >= 8 && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
            <h4 className="text-green-300 text-sm font-medium mb-2">🎁 Included Free</h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-green-200 text-xs">Resume Building</span>
                <span className="text-green-300 text-xs line-through">₹2,999</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-200 text-xs">SOP Evaluation</span>
                <span className="text-green-300 text-xs line-through">₹1,999</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-200 text-xs">IIM Profilizer</span>
                <span className="text-green-300 text-xs line-through">₹1,499</span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        {currentPrice > 0 && (
          <div className="border-t border-purple-400/20 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-300 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
            </div>
            {currentStep >= 8 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-300 text-sm">Free Add-ons Value</span>
                <span className="text-green-400 font-medium">₹{complimentarySavings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">Final Price</span>
              <span className="text-orange-400 font-bold text-2xl">₹{currentPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-purple-200 text-sm">
            <Star className="w-4 h-4 text-orange-400" />
            <span>Lifetime Access</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-sm">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span>Performance Analytics</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-sm">
            <Users className="w-4 h-4 text-orange-400" />
            <span>Peer Learning Groups</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 space-y-3">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
            Save My Plan
          </Button>
          <Button variant="outline" className="w-full glass-button text-white border-purple-400 hover:bg-purple-500/20">
            Share Plan
          </Button>
        </div>

        {/* CoachBot Assistant */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-xl border border-purple-400/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-400 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-purple-200 text-sm font-medium">CoachBot Tip:</p>
              <p className="text-purple-300 text-xs mt-1">
                {currentStep <= 4 ? "Take your time choosing the right combination for better results!" : 
                 currentStep <= 6 ? "You're doing great! Add-ons can significantly boost your preparation." :
                 "You're almost done! Review your selections carefully."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingSummary;
