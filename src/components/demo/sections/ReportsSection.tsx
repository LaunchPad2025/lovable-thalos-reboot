
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowDownToLine } from 'lucide-react';
import DemoCard from '../DemoCard';

// Import our refactored components
import ReportTabs from './reports/ReportTabs';
import ReportOptions from './reports/ReportOptions';
import ReportHeader from './reports/ReportHeader';
import ComplianceCharts from './reports/charts/ComplianceCharts';
import MediaCharts from './reports/charts/MediaCharts';
import TasksCharts from './reports/charts/TasksCharts';
import ViolationsCharts from './reports/charts/ViolationsCharts';

interface ReportsSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const ReportsSection = ({ onShowFeatureInfo }: ReportsSectionProps) => {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Safety Reports</h2>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <ArrowDownToLine className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Report Options */}
      <ReportOptions activeTab={activeTab} />

      {/* Report Header */}
      <ReportHeader activeTab={activeTab} />

      {/* Content Specific to Each Tab */}
      {activeTab === 'compliance' && <ComplianceCharts />}
      {activeTab === 'media' && <MediaCharts />}
      {activeTab === 'tasks' && <TasksCharts />}
      {activeTab === 'violations' && <ViolationsCharts />}

      <DemoCard message="You're viewing simulated data for demonstration purposes" />
    </div>
  );
};

export default ReportsSection;
