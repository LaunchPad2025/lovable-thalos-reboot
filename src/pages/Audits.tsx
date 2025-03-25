
import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AuditStatusCard from "@/components/audits/AuditStatusCard";
import AuditFindings from "@/components/audits/AuditFindings";
import AuditTemplates from "@/components/audits/AuditTemplates";
import AuditReports from "@/components/audits/AuditReports";
import AuditSchedule from "@/components/audits/AuditSchedule";
import ComingSoonOverlay from "@/components/admin/ComingSoonOverlay";

const Audits = () => {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <PageContainer>
      <div className="relative space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Safety Audits</h1>
            <p className="text-muted-foreground mt-1">
              Schedule, conduct, and manage workplace safety audits
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search audits..."
                className="pl-8 bg-background border-border w-full"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
              New Audit
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-[#0f1419] border-b border-gray-800">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {activeTab === "schedule" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AuditStatusCard
                  title="Upcoming Audits"
                  count={10}
                  description="Scheduled for the next 30 days"
                  variant="upcoming"
                />
                <AuditStatusCard
                  title="Completed Audits"
                  count={5}
                  description="Successfully completed audits"
                  variant="completed"
                />
                <AuditStatusCard
                  title="Overdue Audits"
                  count={3}
                  description="Past due and require attention"
                  variant="overdue"
                />
              </div>

              <AuditSchedule />
            </>
          )}

          {activeTab === "templates" && <AuditTemplates />}

          {activeTab === "findings" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AuditStatusCard
                  title="Open Findings"
                  count={12}
                  description="Not yet addressed"
                  variant="open"
                />
                <AuditStatusCard
                  title="In Progress"
                  count={5}
                  description="Currently being fixed"
                  variant="in-progress"
                />
                <AuditStatusCard
                  title="Resolved"
                  count={24}
                  description="Fixed but not verified"
                  variant="resolved"
                />
                <AuditStatusCard
                  title="Verified"
                  count={18}
                  description="Fixed and verified"
                  variant="verified"
                />
              </div>

              <AuditFindings />
            </>
          )}

          {activeTab === "reports" && <AuditReports />}
        </Tabs>
        
        {/* Overlay for "Coming Soon" - since this is a future feature */}
        <ComingSoonOverlay />
      </div>
    </PageContainer>
  );
};

export default Audits;
