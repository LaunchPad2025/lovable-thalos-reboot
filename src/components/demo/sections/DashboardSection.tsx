
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DemoCard from '../DemoCard';
import DashboardHeader from './dashboard/DashboardHeader';
import WelcomeMessage from './dashboard/WelcomeMessage';
import StatCards from './dashboard/StatCards';
import PriorityTasksSection from './dashboard/PriorityTasksSection';
import DocumentsSection from './dashboard/DocumentsSection';

interface DashboardSectionProps {
  onShowFeatureInfo: () => void;
}

const DashboardSection = ({ onShowFeatureInfo }: DashboardSectionProps) => {
  return (
    <>
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Overview of your safety compliance status" 
      />
      
      <Tabs defaultValue="my-dashboard" className="mb-6">
        <TabsList className="bg-[#0d1117] border border-gray-800 rounded-md">
          <TabsTrigger value="my-dashboard" className="data-[state=active]:bg-[#1a1f29]">
            My Dashboard
          </TabsTrigger>
          <TabsTrigger value="organization" className="data-[state=active]:bg-[#1a1f29]">
            Organization
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <WelcomeMessage />
      
      <StatCards />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PriorityTasksSection />
        <DocumentsSection />
      </div>
      
      <DemoCard message="You're viewing simulated data for demonstration purposes" />
    </>
  );
};

export default DashboardSection;
