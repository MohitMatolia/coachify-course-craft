
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GKTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  subtopics: number;
  lastUpdated: string;
}

const StaticGKRepository = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const categories = ['All', 'Constitution', 'Awards', 'Geography', 'History', 'Science', 'Sports'];

  const gkTopics: GKTopic[] = [
    {
      id: '1',
      title: 'Indian Constitution',
      description: 'Comprehensive coverage of constitutional articles, amendments, and fundamental rights.',
      category: 'Constitution',
      subtopics: 25,
      lastUpdated: '2025-01-15'
    },
    {
      id: '2',
      title: 'National & International Awards',
      description: 'Complete list of prestigious awards, recipients, and their contributions.',
      category: 'Awards',
      subtopics: 18,
      lastUpdated: '2025-01-12'
    },
    {
      id: '3',
      title: 'India Physical Geography',
      description: 'Mountains, rivers, climate, natural resources, and geographical features.',
      category: 'Geography',
      subtopics: 22,
      lastUpdated: '2025-01-10'
    },
    {
      id: '4',
      title: 'Freedom Struggle Timeline',
      description: 'Key events, movements, and personalities in India\'s independence struggle.',
      category: 'History',
      subtopics: 30,
      lastUpdated: '2025-01-08'
    },
    {
      id: '5',
      title: 'Space & Technology',
      description: 'ISRO missions, technological developments, and scientific achievements.',
      category: 'Science',
      subtopics: 15,
      lastUpdated: '2025-01-14'
    },
    {
      id: '6',
      title: 'Olympic & Commonwealth Games',
      description: 'India\'s performance, medal winners, and sporting achievements.',
      category: 'Sports',
      subtopics: 12,
      lastUpdated: '2025-01-11'
    }
  ];

  const filteredTopics = gkTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Constitution: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Awards: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      Geography: 'bg-green-500/20 text-green-300 border-green-500/30',
      History: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      Science: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      Sports: 'bg-red-500/20 text-red-300 border-red-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            Static GK Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-purple-800/30 border border-purple-600/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-coachify-purple-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-coachify-purple-primary text-white" 
                  : "text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="space-y-4">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
              <CardContent className="p-6">
                <div 
                  className="cursor-pointer"
                  onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg group-hover:text-purple-200 transition-colors">
                          {topic.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(topic.category)}`}>
                          {topic.category}
                        </span>
                      </div>
                      
                      <p className="text-purple-100 text-sm leading-relaxed mb-3">
                        {topic.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-purple-300">
                        <span>📚 {topic.subtopics} subtopics</span>
                        <span>📅 Updated {new Date(topic.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedTopic === topic.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  </div>
                </div>

                {expandedTopic === topic.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pt-4 border-t border-purple-500/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">Key Subtopics:</h4>
                        <ul className="text-purple-100 text-sm space-y-1">
                          <li>• Fundamental principles and concepts</li>
                          <li>• Historical background and context</li>
                          <li>• Important facts and figures</li>
                          <li>• Recent developments and updates</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">Exam Relevance:</h4>
                        <p className="text-purple-100 text-sm leading-relaxed">
                          High importance for competitive exams. Frequently asked in general knowledge sections of CAT, CLAT, and other entrance tests.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white"
                      >
                        <BookOpen className="w-4 h-4 mr-1" />
                        Study Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                      >
                        Quick Quiz
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <Card className="glass-card border-purple-400/20">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-200 text-lg">No topics found matching your criteria</p>
            <p className="text-purple-300 text-sm mt-2">Try adjusting your search or category filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaticGKRepository;
