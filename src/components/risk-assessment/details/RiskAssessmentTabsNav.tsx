
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RiskAssessmentTabsNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RiskAssessmentTabsNav: React.FC<RiskAssessmentTabsNavProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  // Validate the activeTab to prevent UI issues
  const validTabs = ['overview', 'findings', 'mitigation', 'documents', 'related'];
  const safeActiveTab = validTabs.includes(activeTab) ? activeTab : 'overview';
  
  const handleTabChange = (value: string) => {
    // Log tab switching for debugging
    console.log(`Switching tab from ${activeTab} to ${value}`);
    if (validTabs.includes(value)) {
      onTabChange(value);
    } else {
      console.error(`Invalid tab value: ${value}`);
      onTabChange('overview'); // Default to overview for invalid tabs
    }
  };
  
  return (
    <Tabs value={safeActiveTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-[#0f1419] border border-gray-800 rounded-md p-0 w-full">
        <TabsTrigger 
          value="overview" 
          className={`flex-1 rounded-none py-3 ${safeActiveTab === 'overview' ? 'bg-[#1a1f29]' : ''}`}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="findings" 
          className={`flex-1 rounded-none py-3 ${safeActiveTab === 'findings' ? 'bg-[#1a1f29]' : ''}`}
        >
          Findings
        </TabsTrigger>
        <TabsTrigger 
          value="mitigation" 
          className={`flex-1 rounded-none py-3 ${safeActiveTab === 'mitigation' ? 'bg-[#1a1f29]' : ''}`}
        >
          Mitigation Actions
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className={`flex-1 rounded-none py-3 ${safeActiveTab === 'documents' ? 'bg-[#1a1f29]' : ''}`}
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="related" 
          className={`flex-1 rounded-none py-3 ${safeActiveTab === 'related' ? 'bg-[#1a1f29]' : ''}`}
        >
          Related Items
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default RiskAssessmentTabsNav;
