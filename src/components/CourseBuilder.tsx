
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Clock, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import PricingSummary from './PricingSummary';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import StepFive from './steps/StepFive';
import StepSix from './steps/StepSix';

export interface CourseData {
  focusAreas: string[];
  learningMode: string;
  mentors: string[];
  testSeries: string;
  doubtSolving: string;
}

const CourseBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    focusAreas: [],
    learningMode: '',
    mentors: [],
    testSeries: '',
    doubtSolving: ''
  });

  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const updateCourseData = (field: keyof CourseData, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return courseData.focusAreas.length > 0;
      case 2: return courseData.learningMode !== '';
      case 3: return courseData.mentors.length > 0;
      case 4: return courseData.testSeries !== '';
      case 5: return courseData.doubtSolving !== '';
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne courseData={courseData} updateCourseData={updateCourseData} />;
      case 2:
        return <StepTwo courseData={courseData} updateCourseData={updateCourseData} />;
      case 3:
        return <StepThree courseData={courseData} updateCourseData={updateCourseData} />;
      case 4:
        return <StepFour courseData={courseData} updateCourseData={updateCourseData} />;
      case 5:
        return <StepFive courseData={courseData} updateCourseData={updateCourseData} />;
      case 6:
        return <StepSix courseData={courseData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-orange-300 bg-clip-text text-transparent">
            Build Your Own CAT Course
          </h1>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Customize your preparation journey with India's most trusted personalized CAT coaching platform
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} percentage={progressPercentage} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Steps Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8 rounded-2xl"
            >
              <div className="mb-6">
                <span className="text-purple-300 text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  {currentStep === 1 && "Choose Your Focus Areas"}
                  {currentStep === 2 && "Select Learning Mode"}
                  {currentStep === 3 && "Pick Your Mentors"}
                  {currentStep === 4 && "Add Test Series"}
                  {currentStep === 5 && "Choose Doubt Solving"}
                  {currentStep === 6 && "Review Your Course"}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="glass-button text-white border-purple-400 hover:bg-purple-500/20"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8">
                    Finalize My Plan
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <PricingSummary courseData={courseData} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
