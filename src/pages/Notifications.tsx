
import React, { useState } from 'react';
import { Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationItem from '@/components/notifications/NotificationItem';
import { mockNotifications } from '@/components/notifications/mockData';
import MockDataAlert from '@/components/ui/MockDataAlert';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const filterNotifications = (filter: string) => {
    setActiveFilter(filter);
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get notifications based on active filter
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    return notification.type === activeFilter;
  });

  return (
    <PageContainer>
      <MockDataAlert featureName="Notifications" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold mr-2">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <span className="hidden md:inline">Mark all as read</span>
            <span className="inline md:hidden">Read all</span>
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Stay informed about safety incidents, tasks, and important updates.
        </p>
      </div>

      <Tabs value={activeFilter} onValueChange={filterNotifications}>
        <TabsList className="bg-[#0f1419] border-b border-gray-800">
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4 space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="bg-background border rounded-md p-8 flex flex-col items-center justify-center">
            <p className="text-muted-foreground">No notifications to display</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Notifications;
