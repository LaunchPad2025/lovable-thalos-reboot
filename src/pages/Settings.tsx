
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import AccountSettings from '@/components/settings/AccountSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <PageContainer>
      <PageTitle 
        title="Settings" 
        subtitle="Configure your account and application preferences" 
      />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        <TabsList className="grid grid-cols-4 w-full bg-[#131920]">
          <TabsTrigger value="account" className="data-[state=active]:bg-[#1e2530] data-[state=active]:text-white">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1e2530] data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#1e2530] data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#1e2530] data-[state=active]:text-white">
            Appearance
          </TabsTrigger>
        </TabsList>
        
        <Card className="border-0 bg-[#0f1419] text-white p-6">
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
        </Card>
      </Tabs>
    </PageContainer>
  );
};

export default Settings;
