
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, Bell, Trophy, BookOpen, FileText, Brain, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import NewsCards from './current-affairs/NewsCards';
import QuizOfTheDay from './current-affairs/QuizOfTheDay';
import Infographics from './current-affairs/Infographics';
import PDFViewer from './current-affairs/PDFViewer';
import StaticGKRepository from './current-affairs/StaticGKRepository';
import GDPITopics from './current-affairs/GDPITopics';
import TrendingTopics from './current-affairs/TrendingTopics';
import FilterPanel from './current-affairs/FilterPanel';
import Gamification from './current-affairs/Gamification';
import NotificationPanel from './current-affairs/NotificationPanel';

const CurrentAffairsZone = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState('CAT');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-coachify-purple-bg via-coachify-purple-dark to-purple-900">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                📰 Current Affairs Zone
              </h1>
              <p className="text-purple-100">
                Stay updated with exam-ready current affairs for CAT, CLAT & IPMAT
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="glass-button text-white border-purple-400/30"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white">
                <Bell className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
          />
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    🗓 Today's Highlights
                    <span className="ml-auto text-sm text-purple-200">
                      {selectedDate.toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NewsCards limit={5} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Topics */}
            <TrendingTopics />

            {/* Main Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="news" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-purple-900/50 border border-purple-400/20">
                  <TabsTrigger value="news" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    📰 News
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    ❓ Quiz
                  </TabsTrigger>
                  <TabsTrigger value="infographics" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    📊 Charts
                  </TabsTrigger>
                  <TabsTrigger value="pdfs" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    📄 PDFs
                  </TabsTrigger>
                  <TabsTrigger value="gk" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    🧠 Static GK
                  </TabsTrigger>
                  <TabsTrigger value="gdpi" className="text-purple-100 data-[state=active]:bg-coachify-purple-primary data-[state=active]:text-white">
                    💬 GD-PI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="news" className="mt-6">
                  <NewsCards />
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                  <QuizOfTheDay />
                </TabsContent>

                <TabsContent value="infographics" className="mt-6">
                  <Infographics />
                </TabsContent>

                <TabsContent value="pdfs" className="mt-6">
                  <PDFViewer />
                </TabsContent>

                <TabsContent value="gk" className="mt-6">
                  <StaticGKRepository />
                </TabsContent>

                <TabsContent value="gdpi" className="mt-6">
                  <GDPITopics />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gamification */}
            <Gamification />
            
            {/* Notifications */}
            <NotificationPanel />

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">📈 Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Articles Read</span>
                    <span className="text-white font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Quiz Score</span>
                    <span className="text-green-400 font-bold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Streak</span>
                    <span className="text-orange-400 font-bold">12 days</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsZone;
