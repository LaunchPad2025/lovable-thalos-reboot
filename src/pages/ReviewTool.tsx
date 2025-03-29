import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";

const ReviewTool = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle title="Review Tool" />
        <p className="text-muted-foreground">
          Use the review tool to analyze and provide feedback on training datasets.
        </p>
        {/* Add review tool functionality here */}
      </div>
    </PageContainer>
  );
};

export default ReviewTool;
