
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, BookOpen, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
}

const FilterPanel = ({
  selectedDate,
  setSelectedDate,
  selectedTags,
  setSelectedTags,
  selectedExam,
  setSelectedExam
}: FilterPanelProps) => {
  const examTypes = ['CAT', 'CLAT', 'IPMAT', 'WAT/PI'];
  const topicTags = [
    'Economy', 'Politics', 'International', 'Technology', 'Environment',
    'Sports', 'Science', 'Education', 'Healthcare', 'Infrastructure'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedExam('CAT');
    setSelectedDate(new Date());
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Card className="glass-card border-purple-400/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-purple-300" />
                <label className="text-white font-medium">Date</label>
              </div>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full p-3 bg-purple-800/30 border border-purple-600/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-coachify-purple-primary"
              />
            </div>

            {/* Exam Type Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-purple-300" />
                <label className="text-white font-medium">Exam Type</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {examTypes.map((exam) => (
                  <Button
                    key={exam}
                    variant={selectedExam === exam ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExam(exam)}
                    className={selectedExam === exam 
                      ? "bg-coachify-purple-primary text-white" 
                      : "text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                    }
                  >
                    {exam}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic Tags Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-purple-300" />
                <label className="text-white font-medium">Topics</label>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {topicTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={selectedTags.includes(tag)
                      ? "bg-coachify-purple-primary text-white text-xs"
                      : "text-purple-300 border-purple-400/30 hover:bg-purple-700/30 text-xs"
                    }
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-purple-300 hover:text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterPanel;
