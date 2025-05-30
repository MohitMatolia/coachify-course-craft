
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Lightbulb, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GDPITopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyPoints: string[];
  sampleQuestions: string[];
  discussionPrompt: string;
  readingTime: string;
}

const GDPITopics = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'questions'>('overview');

  const gdpiTopics: GDPITopic[] = [
    {
      id: '1',
      title: 'Climate Change and Sustainable Development',
      description: 'Understanding the intersection of environmental challenges and economic growth.',
      category: 'Environment',
      difficulty: 'Intermediate',
      keyPoints: [
        'Global warming trends and scientific consensus',
        'Renewable energy transition challenges',
        'Carbon pricing and market mechanisms',
        'India\'s climate commitments and NDCs',
        'Green finance and sustainable investments'
      ],
      sampleQuestions: [
        'How can India balance economic growth with environmental sustainability?',
        'What role should carbon pricing play in India\'s climate strategy?',
        'Discuss the challenges in implementing renewable energy at scale.'
      ],
      discussionPrompt: 'You are part of a policy committee tasked with creating India\'s next climate action plan. What would be your top 3 priorities?',
      readingTime: '8 min'
    },
    {
      id: '2',
      title: 'Digital Economy and Data Privacy',
      description: 'Exploring the balance between digital innovation and user privacy rights.',
      category: 'Technology',
      difficulty: 'Advanced',
      keyPoints: [
        'Digital transformation impact on traditional industries',
        'Data localization vs. global data flows',
        'Platform economy and gig worker rights',
        'Cybersecurity and national security concerns',
        'Digital divide and inclusive technology access'
      ],
      sampleQuestions: [
        'Should India mandate data localization for all tech companies?',
        'How can we ensure gig workers have adequate social protection?',
        'What are the pros and cons of cryptocurrency adoption in India?'
      ],
      discussionPrompt: 'As a startup founder, how would you address data privacy concerns while building a scalable digital platform?',
      readingTime: '10 min'
    },
    {
      id: '3',
      title: 'Healthcare Access and Universal Coverage',
      description: 'Examining healthcare delivery models and universal health coverage challenges.',
      category: 'Social Policy',
      difficulty: 'Beginner',
      keyPoints: [
        'Public vs private healthcare delivery models',
        'Telemedicine and digital health solutions',
        'Healthcare financing and insurance schemes',
        'Rural healthcare infrastructure gaps',
        'Medical education and doctor shortage'
      ],
      sampleQuestions: [
        'Is universal healthcare coverage feasible in India?',
        'How can technology bridge the urban-rural healthcare divide?',
        'What role should private players have in public health?'
      ],
      discussionPrompt: 'You\'re designing a healthcare policy for a tier-2 city. What would be your key focus areas?',
      readingTime: '6 min'
    },
    {
      id: '4',
      title: 'Education Reform and Future Skills',
      description: 'Analyzing education system transformation for the 21st century economy.',
      category: 'Education',
      difficulty: 'Intermediate',
      keyPoints: [
        'NEP 2020 implementation challenges and opportunities',
        'Skill development vs traditional academic education',
        'EdTech adoption and digital learning divide',
        'Vocational training and industry-academia partnerships',
        'Critical thinking and creativity in curriculum'
      ],
      sampleQuestions: [
        'How should India\'s education system prepare students for future jobs?',
        'What are the challenges in implementing NEP 2020?',
        'Should coding be mandatory in school curriculum?'
      ],
      discussionPrompt: 'If you were an education minister, what three reforms would you prioritize to make Indian students globally competitive?',
      readingTime: '7 min'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
      Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      Advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Environment: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      Technology: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Social Policy': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Education: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const selectedTopicData = gdpiTopics.find(topic => topic.id === selectedTopic);

  return (
    <div className="space-y-6">
      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gdpiTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="glass-card border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group h-full">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(topic.category)}`}>
                        {topic.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-purple-200 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-purple-300 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {topic.readingTime}
                  </div>
                </div>

                {/* Description */}
                <p className="text-purple-100 text-sm leading-relaxed mb-4 flex-1">
                  {topic.description}
                </p>

                {/* Key Points Preview */}
                <div className="mb-4">
                  <h4 className="text-white font-medium text-sm mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-1 text-yellow-400" />
                    Key Discussion Points:
                  </h4>
                  <ul className="text-purple-200 text-xs space-y-1">
                    {topic.keyPoints.slice(0, 3).map((point, idx) => (
                      <li key={idx}>• {point}</li>
                    ))}
                    {topic.keyPoints.length > 3 && (
                      <li className="text-purple-400">• +{topic.keyPoints.length - 3} more...</li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <Button
                    onClick={() => setSelectedTopic(topic.id)}
                    className="flex-1 bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Explore
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Topic View Modal */}
      {selectedTopic && selectedTopicData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-full max-h-[90vh] bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg shadow-2xl flex flex-col border border-purple-400/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {selectedTopicData.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(selectedTopicData.category)}`}>
                    {selectedTopicData.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(selectedTopicData.difficulty)}`}>
                    {selectedTopicData.difficulty}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setSelectedTopic(null)}
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-white"
              >
                ✕
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-purple-500/30">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'points', label: 'Key Points', icon: Lightbulb },
                { id: 'questions', label: 'Questions', icon: MessageCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'text-white bg-coachify-purple-primary/30 border-b-2 border-coachify-purple-primary'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-purple-100 leading-relaxed">
                    {selectedTopicData.description}
                  </p>
                  
                  <div className="bg-coachify-purple-primary/20 border border-coachify-purple-primary/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-300" />
                      Discussion Prompt:
                    </h4>
                    <p className="text-purple-100 leading-relaxed">
                      {selectedTopicData.discussionPrompt}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'points' && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg">Key Discussion Points:</h4>
                  <div className="space-y-3">
                    {selectedTopicData.keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-purple-800/30 rounded-lg border border-purple-600/30"
                      >
                        <span className="w-6 h-6 rounded-full bg-coachify-purple-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-purple-100 leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg">Sample Discussion Questions:</h4>
                  <div className="space-y-3">
                    {selectedTopicData.sampleQuestions.map((question, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-purple-800/30 rounded-lg border border-purple-600/30"
                      >
                        <div className="flex items-start gap-3">
                          <MessageCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                          <p className="text-purple-100 leading-relaxed">{question}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-purple-500/30 flex justify-between items-center">
              <div className="text-sm text-purple-300">
                💡 Tip: Practice articulating your thoughts clearly and consider multiple perspectives
              </div>
              <Button className="bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white">
                Start Practice Session
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GDPITopics;
