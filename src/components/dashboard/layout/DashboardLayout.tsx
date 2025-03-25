
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FreeTrial from '@/components/dashboard/FreeTrial';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DetailCards from '@/components/dashboard/DetailCards';
import RecommendedFeatures from '@/components/dashboard/RecommendedFeatures';
import Footer from '@/components/layout/Footer';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f14] overflow-y-auto">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-6 py-6 space-y-6 overflow-y-auto">
        {/* Free Trial Banner */}
        <FreeTrial />

        {/* Welcome Section */}
        <WelcomeSection />

        {/* Stats Cards */}
        <StatsCards />

        {/* Two column layout */}
        <DetailCards />

        {/* Recommended Features */}
        <RecommendedFeatures />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
