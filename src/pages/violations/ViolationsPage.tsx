
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViolationAnalysisProvider } from "@/components/violations/ViolationAnalysisProvider";

import ChatAssistantCard from "./components/ChatAssistantCard";
import ViolationUploadSection from "./components/ViolationUploadSection";
import ViolationResultsSection from "./components/ViolationResultsSection";
import ErrorAlert from "./components/ErrorAlert";
import { useViolationsPage } from "./hooks/useViolationsPage";

const ViolationsPage = () => {
  const {
    activeTab,
    setActiveTab,
    analysisResults,
    isLoading,
    isLoadingOverride,
    setIsLoadingOverride,
    modelInitError,
    userIndustry,
    hasWorkingModels,
    handleUploadComplete,
    handleReset,
    error
  } = useViolationsPage();

  return (
    <PageContainer
      title="Safety Violations"
      subtitle="Upload images or describe safety violations to detect and analyze them using AI."
    >
      <div className="grid gap-4 pb-16">
        {error && <ErrorAlert message={error.message} />}
        
        <ChatAssistantCard />
        
        <Card>
          <CardHeader>
            <CardTitle>Violation Detection</CardTitle>
            <CardDescription>
              Upload images or describe potential safety violations to analyze them using our AI models.
              {!hasWorkingModels && !isLoading && (
                <span className="text-yellow-500 ml-1">Using fallback detection.</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full grid grid-cols-2">
                <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
                <TabsTrigger value="results" className="flex-1" disabled={!analysisResults}>Results</TabsTrigger>
              </TabsList>
              
              <ViolationUploadSection 
                onUploadComplete={handleUploadComplete}
                userIndustry={userIndustry}
                isLoading={isLoading}
                isLoadingOverride={isLoadingOverride}
                setIsLoadingOverride={setIsLoadingOverride}
                modelInitError={modelInitError}
              />
              
              <ViolationResultsSection 
                analysisResults={analysisResults}
                onReset={handleReset}
                setActiveTab={setActiveTab}
              />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ViolationsPage;
