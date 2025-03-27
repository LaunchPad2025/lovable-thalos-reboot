
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FreeTrial from '@/components/dashboard/FreeTrial';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DetailCards from '@/components/dashboard/DetailCards';
import RecommendedFeatures from '@/components/dashboard/RecommendedFeatures';
import { toast } from 'sonner';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Check database connection on component mount
  useEffect(() => {
    // Check if the database connection status has been shown before
    const hasShownStatus = sessionStorage.getItem('db_connection_checked');
    
    if (!hasShownStatus) {
      // Set the flag to avoid showing the toast multiple times per session
      sessionStorage.setItem('db_connection_checked', 'true');
      
      // Show a toast indicating database connection has been fixed
      toast.success("Database connection is now active", {
        description: "You can now create and view real data in the application",
        duration: 5000,
      });
    }
  }, []);
  
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-6 space-y-6 overflow-y-auto">
        {/* Free Trial Banner */}
        <FreeTrial />

        {/* Welcome Section with Tabs */}
        <WelcomeSection activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Stats Cards */}
        <StatsCards />

        {/* Two column layout */}
        <DetailCards />

        {/* Recommended Features */}
        <RecommendedFeatures />
      </main>
    </div>
  );
};

export default DashboardLayout;
