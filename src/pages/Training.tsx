import React from "react";
import { useRouter } from "next/router";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import TrainingStatusCards from "@/components/training/TrainingStatusCards";
import UpcomingTraining from "@/components/training/UpcomingTraining";
import RecentlyCompleted from "@/components/training/RecentlyCompleted";
import TrainingTabs from "@/components/training/TrainingTabs";
import ComingSoonOverlay from "@/components/admin/ComingSoonOverlay";
import MockDataAlert from "@/components/ui/MockDataAlert";

const Training = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="relative space-y-6">
        <MockDataAlert featureName="Training & Certifications" />
        
        {/* Main content that will be behind the overlay */}
        <div>
          <PageTitle title="Training & Certifications" />
          <p className="text-muted-foreground">
            Manage your training requirements, track completion status, and view upcoming certifications.
          </p>
          {/* Button to navigate to TrainingDatasetExport */}
          <button
            className="btn btn-primary mt-4"
            onClick={() => router.push("/training-dataset-export")}
          >
            Export Training Dataset
          </button>
        </div>

        <TrainingStatusCards />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UpcomingTraining />
          <RecentlyCompleted />
        </div>

        <TrainingTabs />
        
        {/* Overlay for "Coming Soon" - since this is a future feature */}
        <ComingSoonOverlay />
      </div>
    </PageContainer>
  );
};

export default Training;
