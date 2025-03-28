
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FreeTrial from '@/components/dashboard/FreeTrial';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DetailCards from '@/components/dashboard/DetailCards';
import RecommendedFeatures from '@/components/dashboard/RecommendedFeatures';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';

const DashboardLayout = () => {
  const { isDemoMode, isFreeTrial, planId, hasActiveSubscription } = useAuthStatus();
  const navigate = useNavigate();
  
  // Determine if user should see the free trial banner
  const showTrialBanner = isFreeTrial || isDemoMode;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f14]">
      <DashboardHeader />

      <PageContainer className="py-6 space-y-6">
        {/* Free Trial Banner - only show if in free trial or demo mode */}
        {showTrialBanner && <FreeTrial />}

        {/* Welcome Section */}
        <WelcomeSection />

        {/* Stats Cards */}
        <StatsCards />

        {/* Two column layout */}
        <DetailCards />

        {/* Recommended Features */}
        <RecommendedFeatures />
      </PageContainer>
    </div>
  );
};

export default DashboardLayout;
