
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMLModels } from "@/hooks/useMLModels";
import ViolationUpload from "@/components/violations/ViolationUpload";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { TestResult } from "@/hooks/useModelTest";
import ViolationResults from "@/components/violations/ViolationResults";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ChatPopup from "@/components/chatbot/ChatPopup";

const Violations = () => {
  const { data: models = [], isLoading, error } = useMLModels();
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [analysisResults, setAnalysisResults] = useState<TestResult | null>(null);
  
  const handleUploadComplete = (results: TestResult) => {
    setAnalysisResults(results);
    setActiveTab("results");
  };
  
  const handleReset = () => {
    setAnalysisResults(null);
    setActiveTab("upload");
  };
  
  // Mock data for models if they're still loading
  useEffect(() => {
    if (isLoading && models.length === 0) {
      // If models are taking too long to load, provide mock data
      const mockModels = [
        {
          id: "model1",
          name: "Safety Violation Detector",
          description: "Detects common safety violations in workplaces",
          model_type: "Object Detection",
          industry: "Construction"
        }
      ];
      
      // This is just a temporary solution to show something instead of the loading state
      console.log("Using mock models data for display");
    }
  }, [isLoading, models]);
  
  return (
    <PageContainer
      title="Safety Violations"
      subtitle="Upload images or describe safety violations to detect and analyze them using AI."
    >
      <div className="grid gap-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading models: {error.message || "Please try again later."}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Violation Detection</CardTitle>
                <CardDescription>
                  Upload images or describe potential safety violations to analyze them using our AI models.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="results" disabled={!analysisResults}>Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0EA5E9] mb-2" />
                        <span>Loading models...</span>
                        <p className="mt-4 text-muted-foreground text-sm max-w-md text-center">
                          You can proceed with the upload. Our system will automatically select the best model for your analysis.
                        </p>
                        <Button 
                          onClick={() => setIsLoading(false)} 
                          variant="outline" 
                          className="mt-4"
                        >
                          Continue anyway
                        </Button>
                      </div>
                    ) : (
                      <ViolationUpload onUploadComplete={handleUploadComplete} />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="results">
                    {analysisResults && (
                      <ViolationResults results={analysisResults} onSave={handleReset} />
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Safety Assistant</CardTitle>
                <CardDescription>
                  Ask questions about safety regulations, compliance, and violations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <ChatInterface />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Global chat popup that will be available on all pages */}
      <ChatPopup />
    </PageContainer>
  );
};

export default Violations;
