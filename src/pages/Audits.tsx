
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import AuditStatusCard from '@/components/audits/AuditStatusCard';
import AuditFindings from '@/components/audits/AuditFindings';
import AuditSchedule from '@/components/audits/AuditSchedule';
import AuditReports from '@/components/audits/AuditReports';
import AuditTemplates from '@/components/audits/AuditTemplates';
import { statisticsData } from '@/components/audits/mockData';

const Audits = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold">Safety Audits</h1>
            <p className="text-muted-foreground">
              Schedule, conduct, and manage workplace safety audits
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search audits..."
                className="pl-8 h-9"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              New Audit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#0f1419] border-b border-gray-800">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === 'findings' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AuditStatusCard
              title="Open Findings"
              count={statisticsData.openFindings}
              description="Not yet addressed"
              variant="open"
            />
            <AuditStatusCard
              title="In Progress"
              count={statisticsData.inProgressFindings}
              description="Currently being fixed"
              variant="in-progress"
            />
            <AuditStatusCard
              title="Resolved"
              count={statisticsData.resolvedFindings}
              description="Fixed but not verified"
              variant="resolved"
            />
            <AuditStatusCard
              title="Verified"
              count={statisticsData.verifiedFindings}
              description="Fixed and verified"
              variant="verified"
            />
          </div>
          <AuditFindings />
        </>
      )}

      {activeTab === 'schedule' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <AuditStatusCard
              title="Upcoming Audits"
              count={statisticsData.upcomingAudits}
              description="Scheduled for the next 30 days"
              variant="upcoming"
            />
            <AuditStatusCard
              title="Completed Audits"
              count={statisticsData.completedAudits}
              description="Successfully completed audits"
              variant="completed"
            />
            <AuditStatusCard
              title="Overdue Audits"
              count={statisticsData.overdueAudits}
              description="Past due and require attention"
              variant="overdue"
            />
          </div>
          <AuditSchedule />
        </>
      )}

      {activeTab === 'reports' && <AuditReports />}
      {activeTab === 'templates' && <AuditTemplates />}
    </PageContainer>
  );
};

export default Audits;
