
import React, { useState } from 'react';
import CourseBuilder from "@/components/CourseBuilder";
import CurrentAffairsZone from "@/components/CurrentAffairsZone";
import { Button } from "@/components/ui/button";
import { BookOpen, Newspaper } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'course-builder' | 'current-affairs'>('course-builder');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800" style={{
      background: 'linear-gradient(135deg, #0F0A2E 0%, #1E1B4B 50%, #6B46C1 100%)'
    }}>
      {/* Navigation */}
      <div className="container mx-auto p-4">
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => setCurrentView('course-builder')}
            variant={currentView === 'course-builder' ? 'default' : 'outline'}
            className={currentView === 'course-builder' 
              ? 'bg-coachify-purple-primary text-white' 
              : 'glass-button text-white border-purple-400/30'
            }
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Course Builder
          </Button>
          <Button
            onClick={() => setCurrentView('current-affairs')}
            variant={currentView === 'current-affairs' ? 'default' : 'outline'}
            className={currentView === 'current-affairs' 
              ? 'bg-coachify-purple-primary text-white' 
              : 'glass-button text-white border-purple-400/30'
            }
          >
            <Newspaper className="w-4 h-4 mr-2" />
            Current Affairs Zone
          </Button>
        </div>
      </div>

      {/* Content */}
      {currentView === 'course-builder' ? <CourseBuilder /> : <CurrentAffairsZone />}
    </div>
  );
};

export default Index;
