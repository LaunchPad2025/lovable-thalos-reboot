
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMLModels } from "@/hooks/useMLModels";
import ViolationUpload from "@/components/violations/ViolationUpload";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { TestResult } from "@/hooks/model-testing";
import ViolationResults, { ViolationResult } from "@/components/violations/ViolationResults";
import { Loader2, AlertCircle, HardHat } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Violations = () => {
  const { data: models = [], isLoading: modelsLoading, error, refetch } = useMLModels();
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [analysisResults, setAnalysisResults] = useState<TestResult | null>(null);
  const [isLoadingOverride, setIsLoadingOverride] = useState<boolean>(true);
  const { user } = useAuth();
  const [modelInitError, setModelInitError] = useState<string | null>(null);
  
  // Get user's preferred industry from user metadata
  const userIndustry = user?.user_metadata?.industries?.[0] || "Construction";
  
  const handleUploadComplete = (results: TestResult) => {
    setAnalysisResults(results);
    setActiveTab("results");
    
    // Show success toast
    if (results.detections && results.detections.length > 0) {
      toast.success(`Detected ${results.detections.length} safety violation(s)`, {
        description: "The analysis has completed successfully"
      });
    } else {
      toast.info("No violations detected", {
        description: "The analysis completed but no safety violations were identified"
      });
    }
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
  
  // Attempt to retry loading models if there's an error
  useEffect(() => {
    if (error) {
      setModelInitError(error.message || "Could not connect to AI models. Using fallback detection.");
      
      // Try to refetch models after a delay
      const retryTimer = setTimeout(() => {
        console.log("Retrying model fetch...");
        refetch();
      }, 5000);
      
      return () => clearTimeout(retryTimer);
    } else {
      setModelInitError(null);
    }
  }, [error, refetch]);
  
  // Combine the real loading state with our override
  const isLoading = modelsLoading && isLoadingOverride;
  
  // Check if we have valid working models
  const hasWorkingModels = models.length > 0 && !error;
  
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
        
        {/* Safety Assistant - Ensure proper height to see full chatbot interface */}
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
            <div className="h-[400px]"> {/* Increased height from 200px to 400px to show full chatbot */}
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
              {!hasWorkingModels && !isLoading && <span className="text-yellow-500 ml-1">Using fallback detection.</span>}
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
                    modelInitError={modelInitError}
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
