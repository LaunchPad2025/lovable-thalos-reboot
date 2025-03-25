
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RiskAssessmentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RiskAssessmentTabs: React.FC<RiskAssessmentTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-800">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="bg-[#0f1419] border-b border-gray-800">
          <TabsTrigger 
            value="assessments" 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'assessments' ? 'text-white' : 'text-gray-400'}`}
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'templates' ? 'text-white' : 'text-gray-400'}`}
          >
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="risk-matrix" 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'risk-matrix' ? 'text-white' : 'text-gray-400'}`}
          >
            Risk Matrix
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
              Soon
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentTabs;
