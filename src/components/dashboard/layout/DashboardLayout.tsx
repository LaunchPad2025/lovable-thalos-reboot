
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DetailCards from '@/components/dashboard/DetailCards';
import ChatPopup from '@/components/chatbot/ChatPopup';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f14]">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-6 py-6 space-y-6 overflow-y-auto">
        {/* Welcome Section with Tabs */}
        <WelcomeSection activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Stats Cards */}
        <StatsCards />

        {/* Two column layout */}
        <DetailCards />
      </main>

      {/* Footer removed from dashboard */}
      
      {/* Chat Popup - Fixed positioning ensures it doesn't affect scroll */}
      <ChatPopup />
    </div>
  );
};

export default DashboardLayout;
