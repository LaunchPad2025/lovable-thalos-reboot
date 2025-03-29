import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";

const TrainingDatasetExport = () => {
  const handleExport = () => {
    // Mock data for approved Paulie responses
    const approvedResponses = [
      { industry: "Finance", citation: "Regulation A1", response: "Response 1" },
      { industry: "Healthcare", citation: "Regulation B2", response: "Response 2" },
      { industry: "Finance", citation: "Regulation A1", response: "Response 3" },
      { industry: "Healthcare", citation: "Regulation C3", response: "Response 4" },
    ];

    // Group responses by industry and regulation citation
    const groupedResponses = approvedResponses.reduce((acc, item) => {
      const { industry, citation, response } = item;
      if (!acc[industry]) acc[industry] = {};
      if (!acc[industry][citation]) acc[industry][citation] = [];
      acc[industry][citation].push(response);
      return acc;
    }, {});

    // Create a JSON blob and trigger download
    const blob = new Blob([JSON.stringify(groupedResponses, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "approved_responses.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle title="Export Training Dataset" />
        <p className="text-muted-foreground">
          Export the training dataset for analysis or backup purposes.
        </p>
        <button className="btn btn-primary" onClick={handleExport}>
          Export Dataset
        </button>
      </div>
    </PageContainer>
  );
};

export default TrainingDatasetExport;
