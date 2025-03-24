
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ProfileCard from '@/components/dashboard/ProfileCard';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentItems from '@/components/dashboard/RecentItems';
import { AlertTriangle, ClipboardList, CheckCircle, Clock } from 'lucide-react';

const recentViolations = [
  {
    id: 'V-1234',
    title: 'Missing guardrail on platform',
    date: 'Oct 15, 2023',
    status: 'open' as const,
    type: 'violation' as const
  },
  {
    id: 'V-1235',
    title: 'Improper chemical storage',
    date: 'Oct 12, 2023',
    status: 'in-progress' as const,
    type: 'violation' as const
  },
  {
    id: 'V-1236',
    title: 'Blocked fire exit',
    date: 'Oct 10, 2023',
    status: 'resolved' as const,
    type: 'violation' as const
  }
];

const recentTasks = [
  {
    id: 'T-5678',
    title: 'Conduct safety training for new employees',
    date: 'Oct 18, 2023',
    status: 'pending' as const,
    type: 'task' as const
  },
  {
    id: 'T-5679',
    title: 'Inspect fire extinguishers',
    date: 'Oct 14, 2023',
    status: 'completed' as const,
    type: 'task' as const
  },
  {
    id: 'T-5680',
    title: 'Update emergency evacuation plan',
    date: 'Oct 13, 2023',
    status: 'in-progress' as const,
    type: 'task' as const
  }
];

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" subtitle="Welcome back, John">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <ProfileCard
            name="John Doe"
            role="Safety Manager"
            company="Acme Manufacturing"
            location="Portland, OR"
            phone="(503) 555-1234"
            email="john.doe@acme.com"
          />
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatsCard
            title="Open Violations"
            value="12"
            change="2 more than last month"
            trend="up"
            icon={AlertTriangle}
            color="red"
          />
          
          <StatsCard
            title="Tasks Completed"
            value="28"
            change="5 more than last month"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          
          <StatsCard
            title="Pending Tasks"
            value="8"
            change="3 less than last month"
            trend="down"
            icon={ClipboardList}
            color="yellow"
          />
          
          <StatsCard
            title="Inspection Due"
            value="Oct 28"
            change="13 days remaining"
            icon={Clock}
            color="blue"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentItems
          title="Recent Violations"
          items={recentViolations}
          viewAllLink="/violations"
        />
        
        <RecentItems
          title="Recent Tasks"
          items={recentTasks}
          viewAllLink="/tasks"
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
