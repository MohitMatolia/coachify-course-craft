
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationPanel = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-400" />
            Stay Updated
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notification Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">Email Digest</span>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-coachify-purple-primary' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">Push Alerts</span>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  pushNotifications ? 'bg-coachify-purple-primary' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    pushNotifications ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Subscription Buttons */}
          <div className="space-y-3 pt-4 border-t border-purple-500/30">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Join WhatsApp
            </Button>
            
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Join Telegram
            </Button>
          </div>

          {/* Frequency Settings */}
          <div className="pt-4 border-t border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200 text-sm">Email Frequency</span>
            </div>
            <select className="w-full p-2 bg-purple-800/30 border border-purple-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-coachify-purple-primary">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationPanel;
