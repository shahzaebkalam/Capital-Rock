'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  type: 'email' | 'push' | 'sms';
}

export default function NotificationsSettings() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'investment-updates',
      title: 'Investment Updates',
      description: 'Get notified about your investment performance and portfolio changes',
      enabled: true,
      type: 'email'
    },
    {
      id: 'market-alerts',
      title: 'Market Alerts',
      description: 'Receive alerts about market movements and opportunities',
      enabled: true,
      type: 'push'
    },
    {
      id: 'transaction-notifications',
      title: 'Transaction Notifications',
      description: 'Get notified when transactions are completed or failed',
      enabled: true,
      type: 'email'
    },
    {
      id: 'security-alerts',
      title: 'Security Alerts',
      description: 'Important security notifications and login attempts',
      enabled: true,
      type: 'sms'
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      description: 'Weekly newsletter with market insights and company updates',
      enabled: false,
      type: 'email'
    },
    {
      id: 'promotional',
      title: 'Promotional Offers',
      description: 'Special offers and promotional content',
      enabled: false,
      type: 'email'
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const handleSave = () => {
    console.log('Notification preferences saved:', notifications);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold text-secondary-black">Notifications</h1>
        <Button variant="primary" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>

        <div className="space-y-6">
          {notifications.map((notification) => (
            <div key={notification.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      notification.type === 'email' 
                        ? 'bg-blue-100 text-blue-800'
                        : notification.type === 'push'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {notification.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {notification.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
