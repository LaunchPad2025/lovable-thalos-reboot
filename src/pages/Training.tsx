
import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import { PageTitle } from "@/components/ui/PageTitle";
import TrainingStatusCards from "@/components/training/TrainingStatusCards";
import UpcomingTraining from "@/components/training/UpcomingTraining";
import RecentlyCompleted from "@/components/training/RecentlyCompleted";
import TrainingTabs from "@/components/training/TrainingTabs";

const Training = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <PageTitle title="Training & Certifications" />
          <p className="text-muted-foreground">
            Manage your training requirements, track completion status, and view upcoming certifications.
          </p>
        </div>

        <TrainingStatusCards />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UpcomingTraining />
          <RecentlyCompleted />
        </div>

        <TrainingTabs />
      </div>
    </PageContainer>
  );
};

export default Training;
