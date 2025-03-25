
import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuditSchedule from "@/components/audits/AuditSchedule";
import AuditFindings from "@/components/audits/AuditFindings";
import AuditTemplates from "@/components/audits/AuditTemplates";
import AuditReports from "@/components/audits/AuditReports";
import AuditStatusCard from "@/components/audits/AuditStatusCard";

const Audits = () => {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <PageTitle 
            title="Audits" 
            subtitle="Schedule, conduct and track safety audits and inspections"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AuditStatusCard 
            title="Upcoming Audits" 
            count={3} 
            description="Scheduled audits waiting to be conducted" 
            variant="upcoming" 
          />
          <AuditStatusCard 
            title="In Progress" 
            count={2} 
            description="Audits currently being conducted" 
            variant="in-progress" 
          />
          <AuditStatusCard 
            title="Completed" 
            count={12} 
            description="Successfully completed audits" 
            variant="completed" 
          />
        </div>

        <Tabs 
          defaultValue="schedule" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            <AuditSchedule />
          </TabsContent>
          
          <TabsContent value="findings">
            <AuditFindings />
          </TabsContent>
          
          <TabsContent value="templates">
            <AuditTemplates />
          </TabsContent>
          
          <TabsContent value="reports">
            <AuditReports />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Audits;
