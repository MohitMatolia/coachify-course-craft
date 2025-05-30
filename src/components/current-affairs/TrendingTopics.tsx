
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  engagement: number;
  articles: number;
}

const TrendingTopics = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      title: '2025 General Elections',
      description: 'Comprehensive coverage of election preparations, candidate announcements, and policy manifestos across states.',
      category: 'Politics',
      engagement: 92,
      articles: 24
    },
    {
      id: '2',
      title: 'Interim Budget 2025',
      description: 'Analysis of interim budget announcements, fiscal policies, and economic implications for various sectors.',
      category: 'Economy',
      engagement: 88,
      articles: 18
    },
    {
      id: '3',
      title: 'Israel-Iran Conflict',
      description: 'Latest developments in Middle East tensions, international diplomatic responses, and regional implications.',
      category: 'International',
      engagement: 85,
      articles: 15
    },
    {
      id: '4',
      title: 'AI & Technology Regulation',
      description: 'Global tech regulations, AI governance frameworks, and India\'s digital policy initiatives.',
      category: 'Technology',
      engagement: 76,
      articles: 12
    }
  ];

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-card border-purple-400/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-white text-xl font-semibold">🔥 Trending Topics</h2>
          </div>

          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    expandedTopic === topic.id
                      ? 'bg-coachify-purple-primary/20 border-coachify-purple-primary/40'
                      : 'bg-purple-800/20 border-purple-600/30 hover:bg-purple-700/30'
                  }`}
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium group-hover:text-purple-200 transition-colors">
                          {topic.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                          {topic.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-purple-300">
                        <span>📈 {topic.engagement}% engagement</span>
                        <span>📰 {topic.articles} articles</span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedTopic === topic.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  </div>

                  {expandedTopic === topic.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-purple-500/30"
                    >
                      <p className="text-purple-100 text-sm leading-relaxed mb-4">
                        {topic.description}
                      </p>
                      <Button
                        size="sm"
                        className="bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white"
                      >
                        Explore Topic
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrendingTopics;
