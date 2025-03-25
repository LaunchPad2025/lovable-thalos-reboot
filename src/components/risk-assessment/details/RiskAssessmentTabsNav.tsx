
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
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="bg-[#0f1419] border border-gray-800 rounded-md p-0 w-full">
        <TabsTrigger 
          value="overview" 
          className={`flex-1 rounded-none py-3 ${activeTab === 'overview' ? 'bg-[#1a1f29]' : ''}`}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="findings" 
          className={`flex-1 rounded-none py-3 ${activeTab === 'findings' ? 'bg-[#1a1f29]' : ''}`}
        >
          Findings
        </TabsTrigger>
        <TabsTrigger 
          value="mitigation" 
          className={`flex-1 rounded-none py-3 ${activeTab === 'mitigation' ? 'bg-[#1a1f29]' : ''}`}
        >
          Mitigation Actions
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className={`flex-1 rounded-none py-3 ${activeTab === 'documents' ? 'bg-[#1a1f29]' : ''}`}
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="related" 
          className={`flex-1 rounded-none py-3 ${activeTab === 'related' ? 'bg-[#1a1f29]' : ''}`}
        >
          Related Items
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default RiskAssessmentTabsNav;
