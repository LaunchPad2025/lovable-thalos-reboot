import { useState, useEffect } from "react";
import { useMLModels } from "@/hooks/ml-models";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { TestResult } from "@/hooks/model-testing/types";

export function useViolationsPage() {
  const { data: models = [], isLoading: modelsLoading, error, refetch } = useMLModels();
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [analysisResults, setAnalysisResults] = useState<TestResult | null>(null);
  const [isLoadingOverride, setIsLoadingOverride] = useState<boolean>(false);
  const { user } = useAuth();
  const [modelInitError, setModelInitError] = useState<string | null>(null);
  
  const userIndustry = user?.user_metadata?.industries?.[0] || "Construction";
  
  useEffect(() => {
    // Initialize the storage bucket when the component mounts
    const initBucket = async () => {
      try {
        await fetch('/api/supabase/functions/v1/create-storage-buckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (error) {
        console.error("Error initializing storage bucket:", error);
      }
    };
    
    initBucket();
  }, []);
  
  useEffect(() => {
    if (error) {
      setModelInitError(error.message || "Could not connect to AI models. Using fallback detection.");
      
      const retryTimer = setTimeout(() => {
        console.log("Retrying model fetch...");
        refetch();
      }, 3000);
      
      return () => clearTimeout(retryTimer);
    } else {
      setModelInitError(null);
    }
  }, [error, refetch]);
  
  const handleUploadComplete = (results: TestResult) => {
    console.log("Upload complete with results:", results);
    setAnalysisResults(results);
    setActiveTab("results");
    
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
  
  const isLoading = modelsLoading && isLoadingOverride;
  const hasWorkingModels = Array.isArray(models) && models.length > 0 && !error;
  
  return {
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
  };
}
