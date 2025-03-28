
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FreeTrial from '@/components/dashboard/FreeTrial';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DetailCards from '@/components/dashboard/DetailCards';
import RecommendedFeatures from '@/components/dashboard/RecommendedFeatures';
import ChatPopup from '@/components/chatbot/ChatPopup';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { isDemoMode, isFreeTrial, planId, hasActiveSubscription } = useAuthStatus();
  const navigate = useNavigate();
  
  // Determine if user should see the free trial banner
  const showTrialBanner = isFreeTrial || isDemoMode;
  
  // Check if plan allows AI features (only enterprise in this example)
  const hasAIAccess = planId === 'enterprise' || isDemoMode;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f14]">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-6 py-6 space-y-6 overflow-y-auto">
        {/* Free Trial Banner - only show if in free trial or demo mode */}
        {showTrialBanner && <FreeTrial />}

        {/* Welcome Section with Tabs */}
        <WelcomeSection activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Stats Cards */}
        <StatsCards />

        {/* Two column layout */}
        <DetailCards />

        {/* Show feature restrictions based on plan */}
        {!hasActiveSubscription && !isFreeTrial && !isDemoMode && (
          <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400">
            <InfoCircle className="h-4 w-4" />
            <AlertTitle>Subscription required</AlertTitle>
            <AlertDescription className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <span>Your free trial has ended. Subscribe to a plan to regain access to all features.</span>
              <Button 
                size="sm" 
                onClick={() => navigate('/subscription')}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                View Plans
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Recommended Features */}
        <RecommendedFeatures />
      </main>

      {/* Chat Popup - Only show for enterprise plan or during trial/demo */}
      {(hasAIAccess || isFreeTrial) ? (
        <ChatPopup />
      ) : (
        <div className="fixed bottom-4 right-4">
          <Button 
            onClick={() => navigate('/subscription')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Upgrade to Access AI Assistant
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
