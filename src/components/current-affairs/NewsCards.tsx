
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookmarkIcon, ExternalLink, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  examRelevance: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  isBookmarked: boolean;
}

interface NewsCardsProps {
  limit?: number;
}

const NewsCards = ({ limit }: NewsCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'RBI Monetary Policy: Repo Rate Unchanged at 6.5%',
      summary: 'Reserve Bank of India maintains status quo on interest rates, focusing on inflation control and economic growth balance.',
      examRelevance: 'Important for Banking Awareness in CAT, Economics section in CLAT. Expect questions on monetary policy tools.',
      category: 'Economy',
      readTime: '3 min',
      publishedAt: '2 hours ago',
      tags: ['RBI', 'Monetary Policy', 'Banking'],
      isBookmarked: false
    },
    {
      id: '2',
      title: 'India-UAE Trade Corridor: New Maritime Route Launched',
      summary: 'Strategic partnership establishes direct shipping route, reducing logistics costs and improving bilateral trade.',
      examRelevance: 'Crucial for International Relations in GD-PI. Geography questions possible in competitive exams.',
      category: 'International',
      readTime: '4 min',
      publishedAt: '4 hours ago',
      tags: ['Trade', 'UAE', 'Maritime'],
      isBookmarked: false
    },
    {
      id: '3',
      title: 'Climate Finance: India Receives $2.5B Green Bond Funding',
      summary: 'International climate funding approved for renewable energy projects and sustainable infrastructure development.',
      examRelevance: 'Environmental issues are trending in WAT topics. Climate finance concepts important for PI discussions.',
      category: 'Environment',
      readTime: '5 min',
      publishedAt: '6 hours ago',
      tags: ['Climate', 'Green Bonds', 'Environment'],
      isBookmarked: false
    },
    {
      id: '4',
      title: 'Digital India Initiative: New Cybersecurity Framework',
      summary: 'Government launches comprehensive cybersecurity policy to protect critical infrastructure and citizen data.',
      examRelevance: 'Technology and governance overlap - important for Public Administration questions and current GD topics.',
      category: 'Technology',
      readTime: '4 min',
      publishedAt: '8 hours ago',
      tags: ['Digital India', 'Cybersecurity', 'Policy'],
      isBookmarked: false
    },
    {
      id: '5',
      title: 'Education Policy Update: NEP 2020 Implementation Progress',
      summary: 'National Education Policy shows significant progress in skill development and digital learning infrastructure.',
      examRelevance: 'Education reforms are hot topics for essays and GD. Policy implementation questions likely in interviews.',
      category: 'Education',
      readTime: '3 min',
      publishedAt: '10 hours ago',
      tags: ['NEP 2020', 'Education', 'Policy'],
      isBookmarked: false
    }
  ];

  const displayItems = limit ? newsItems.slice(0, limit) : newsItems;

  const toggleBookmark = (id: string) => {
    const newBookmarked = new Set(bookmarkedItems);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarkedItems(newBookmarked);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Economy: 'bg-green-500/20 text-green-300 border-green-500/30',
      International: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Environment: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      Technology: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      Education: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-4">
      {displayItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Card className="glass-card border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center text-purple-300 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.readTime}
                      </div>
                      <span className="text-purple-400 text-xs">{item.publishedAt}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg leading-tight hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(item.id)}
                    className="text-purple-300 hover:text-white p-2"
                  >
                    <BookmarkIcon
                      className={`w-4 h-4 ${bookmarkedItems.has(item.id) ? 'fill-current text-yellow-400' : ''}`}
                    />
                  </Button>
                </div>

                {/* Content */}
                <p className="text-purple-100 text-sm leading-relaxed">
                  {item.summary}
                </p>

                {/* Exam Relevance */}
                <div className="bg-coachify-purple-primary/20 border border-coachify-purple-primary/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-coachify-purple-light flex-shrink-0 mt-0.5">
                      🎯 EXAM RELEVANCE:
                    </span>
                    <p className="text-purple-100 text-xs leading-relaxed">
                      {item.examRelevance}
                    </p>
                  </div>
                </div>

                {/* Tags and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-md border border-purple-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsCards;
