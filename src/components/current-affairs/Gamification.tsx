
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Gamification = () => {
  const userStats = {
    xp: 2450,
    level: 8,
    streak: 12,
    rank: 47,
    totalUsers: 1250
  };

  const badges = [
    { id: 1, name: 'News Ninja', icon: '🥷', earned: true, description: 'Read 50 articles' },
    { id: 2, name: 'Budget Boss', icon: '💰', earned: true, description: 'Completed budget quiz' },
    { id: 3, name: 'PI Pro', icon: '🎯', earned: false, description: 'Score 90% in PI topics' },
    { id: 4, name: 'Streak Master', icon: '🔥', earned: false, description: '30-day reading streak' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Rahul S.', xp: 4580, avatar: '👨‍🎓' },
    { rank: 2, name: 'Priya M.', xp: 4320, avatar: '👩‍🎓' },
    { rank: 3, name: 'Arjun K.', xp: 3890, avatar: '👨‍💼' },
    { rank: 47, name: 'You', xp: 2450, avatar: '🚀', isCurrentUser: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* XP and Level */}
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              Level {userStats.level}
            </div>
            <div className="text-purple-200 text-sm">
              {userStats.xp} XP
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-purple-300">
              <span>Level {userStats.level}</span>
              <span>Level {userStats.level + 1}</span>
            </div>
            <div className="w-full bg-purple-800/40 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
            <div className="text-center text-xs text-purple-300">
              650 XP to next level
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/30">
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg">{userStats.streak}</div>
              <div className="text-purple-200 text-xs">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">#{userStats.rank}</div>
              <div className="text-purple-200 text-xs">Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-400" />
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  badge.earned
                    ? 'bg-yellow-500/20 border-yellow-500/40'
                    : 'bg-gray-600/20 border-gray-600/40'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className={`text-xs font-medium ${
                  badge.earned ? 'text-yellow-200' : 'text-gray-400'
                }`}>
                  {badge.name}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Weekly Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  user.isCurrentUser
                    ? 'bg-coachify-purple-primary/30 border border-coachify-purple-primary/50'
                    : 'bg-purple-800/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank <= 3 ? 'bg-yellow-500 text-black' : 'bg-purple-600 text-white'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="text-lg">{user.avatar}</span>
                  <span className={`text-sm ${user.isCurrentUser ? 'text-white font-medium' : 'text-purple-200'}`}>
                    {user.name}
                  </span>
                </div>
                <span className="text-purple-200 text-sm font-medium">
                  {user.xp} XP
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Gamification;
