
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMLModels } from "@/hooks/useMLModels";
import ViolationUpload from "@/components/violations/ViolationUpload";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { TestResult } from "@/hooks/useModelTest";
import ViolationResults, { ViolationResult } from "@/components/violations/ViolationResults";
import { Loader2, AlertCircle, HardHat } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

const Violations = () => {
  const { data: models = [], isLoading: modelsLoading, error } = useMLModels();
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [analysisResults, setAnalysisResults] = useState<TestResult | null>(null);
  const [isLoadingOverride, setIsLoadingOverride] = useState<boolean>(true);
  const { user } = useAuth();
  
  // Get user's preferred industry from user metadata
  const userIndustry = user?.user_metadata?.industries?.[0] || "Construction";
  
  const handleUploadComplete = (results: TestResult) => {
    setAnalysisResults(results);
    setActiveTab("results");
  };
  
  const handleReset = () => {
    setAnalysisResults(null);
    setActiveTab("upload");
  };
  
  // Auto-continue after 3 seconds if models are still loading
  useEffect(() => {
    if (modelsLoading) {
      const timer = setTimeout(() => {
        setIsLoadingOverride(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoadingOverride(false);
    }
  }, [modelsLoading]);
  
  // Combine the real loading state with our override
  const isLoading = modelsLoading && isLoadingOverride;
  
  // Convert single TestResult to array for ViolationResults component
  const formattedResults: ViolationResult[] = analysisResults ? [
    {
      id: analysisResults.id || '1',
      test_name: 'Safety Violation Analysis',
      result: 'Violation Detected',
      severity: analysisResults.severity || 'medium',
      location: analysisResults.industry || 'Unknown',
      timestamp: new Date().toISOString(),
      image_url: analysisResults.imagePreview || undefined,
      description: analysisResults.description,
      detections: analysisResults.detections,
      regulationIds: analysisResults.regulationIds,
      industry: analysisResults.industry
    }
  ] : [];
  
  return (
    <PageContainer
      title="Safety Violations"
      subtitle="Upload images or describe safety violations to detect and analyze them using AI."
    >
      <div className="grid gap-4 pb-16">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading models: {error.message || "Please try again later."}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Safety Assistant - Repositioned above the main content */}
        <Card className="border border-gray-700 bg-gray-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <span className="bg-yellow-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                <HardHat className="h-4 w-4" />
              </span>
              Safety Assistant "Paulie"
            </CardTitle>
            <CardDescription>
              Ask me anything about workplace safety regulations and compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ChatInterface />
            </div>
          </CardContent>
        </Card>
        
        {/* Main violation detection content */}
        <Card>
          <CardHeader>
            <CardTitle>Violation Detection</CardTitle>
            <CardDescription>
              Upload images or describe potential safety violations to analyze them using our AI models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
                <TabsTrigger value="results" className="flex-1" disabled={!analysisResults}>Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#f59e0b] mb-2" />
                    <span>Preparing safety models...</span>
                    <p className="mt-4 text-muted-foreground text-sm max-w-md text-center">
                      Our AI safety inspection tools are being calibrated. You can proceed with your upload and we'll automatically select the most appropriate safety standards and compliance guidelines for your analysis.
                    </p>
                    <Button 
                      onClick={() => setIsLoadingOverride(false)} 
                      variant="outline" 
                      className="mt-4"
                    >
                      Continue to safety analysis
                    </Button>
                  </div>
                ) : (
                  <ViolationUpload 
                    onUploadComplete={handleUploadComplete} 
                    userIndustry={userIndustry}
                    hideModelSelection={true}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="results">
                {analysisResults && (
                  <ViolationResults 
                    results={formattedResults} 
                    onSave={handleReset} 
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Violations;
