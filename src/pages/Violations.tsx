
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
                    <TabsTrigger value="results" className="flex-1" disabled={!analysisResults}>Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0EA5E9] mb-2" />
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
