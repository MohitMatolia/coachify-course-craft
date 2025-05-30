
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Download, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Infographic {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  type: 'chart' | 'diagram' | 'timeline';
  thumbnail: string;
}

const Infographics = () => {
  const [selectedInfographic, setSelectedInfographic] = useState<string | null>(null);

  const infographics: Infographic[] = [
    {
      id: '1',
      title: 'Budget 2025: Sector-wise Allocation',
      description: 'Visual breakdown of government budget allocation across different sectors and ministries.',
      category: 'Economy',
      views: 1250,
      type: 'chart',
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '2',
      title: 'India\'s Trade Partners 2024',
      description: 'Comprehensive overview of India\'s major trading partners and bilateral trade volumes.',
      category: 'International',
      views: 980,
      type: 'diagram',
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '3',
      title: 'Climate Goals Timeline',
      description: 'India\'s roadmap to net-zero emissions with key milestones and targets.',
      category: 'Environment',
      views: 756,
      type: 'timeline',
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '4',
      title: 'Digital India Progress',
      description: 'Statistics and achievements of Digital India initiative across various parameters.',
      category: 'Technology',
      views: 642,
      type: 'chart',
      thumbnail: '/api/placeholder/400/300'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chart': return <BarChart3 className="w-4 h-4" />;
      case 'diagram': return <PieChart className="w-4 h-4" />;
      case 'timeline': return <TrendingUp className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Economy: 'bg-green-500/20 text-green-300 border-green-500/30',
      International: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Environment: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      Technology: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infographics.map((infographic, index) => (
          <motion.div
            key={infographic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="glass-card border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
              <CardContent className="p-4">
                {/* Thumbnail */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-500/30 flex items-center justify-center">
                    {getTypeIcon(infographic.type)}
                    <span className="ml-2 text-purple-300 text-lg font-medium">
                      {infographic.title.split(':')[0]}
                    </span>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(infographic.category)}`}>
                      {infographic.category}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <Eye className="w-3 h-3" />
                      {infographic.views}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {infographic.title}
                  </h3>
                  
                  <p className="text-purple-100 text-sm leading-relaxed">
                    {infographic.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setSelectedInfographic(infographic.id)}
                      className="flex-1 bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Infographic Viewer Modal */}
      {selectedInfographic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedInfographic(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                {infographics.find(i => i.id === selectedInfographic)?.title}
              </h3>
              <Button
                onClick={() => setSelectedInfographic(null)}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </Button>
            </div>

            {/* Infographic Content */}
            <div className="flex-1 p-4 bg-gray-100 overflow-auto">
              <div className="w-full h-full bg-white rounded border shadow-inner flex items-center justify-center">
                <div className="text-center text-gray-600">
                  {getTypeIcon(infographics.find(i => i.id === selectedInfographic)?.type || 'chart')}
                  <p className="text-lg font-medium mt-4 mb-2">Interactive Infographic</p>
                  <p className="text-sm max-w-md mx-auto leading-relaxed">
                    {infographics.find(i => i.id === selectedInfographic)?.description}
                  </p>
                  {/* Sample chart representation */}
                  <div className="mt-8 max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="bg-blue-100 p-4 rounded">
                          <div className="text-2xl font-bold text-blue-600">25%</div>
                          <div className="text-sm text-gray-600">Infrastructure</div>
                        </div>
                        <div className="bg-green-100 p-4 rounded">
                          <div className="text-2xl font-bold text-green-600">20%</div>
                          <div className="text-sm text-gray-600">Education</div>
                        </div>
                        <div className="bg-orange-100 p-4 rounded">
                          <div className="text-2xl font-bold text-orange-600">18%</div>
                          <div className="text-sm text-gray-600">Healthcare</div>
                        </div>
                        <div className="bg-purple-100 p-4 rounded">
                          <div className="text-2xl font-bold text-purple-600">15%</div>
                          <div className="text-sm text-gray-600">Defense</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Infographics;
