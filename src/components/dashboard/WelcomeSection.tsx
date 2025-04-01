
import React from 'react';
import TabSelector from './welcome/TabSelector';
import StatusCardGrid from './welcome/StatusCardGrid';

interface WelcomeSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const WelcomeSection = ({ activeTab, setActiveTab }: WelcomeSectionProps) => {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Welcome back, Hal</h2>
          <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        
        <p className="text-gray-400 mb-6">
          {activeTab === 'personal' 
            ? 'Here\'s a summary of your personal safety compliance status.' 
            : 'Here\'s a summary of your organization\'s safety compliance status.'}
        </p>
        
        <StatusCardGrid activeTab={activeTab} />
      </div>
    </div>
  );
};

export default WelcomeSection;
