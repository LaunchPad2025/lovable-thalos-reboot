import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import ConnectionStatus from './upload/ConnectionStatus';
import UploadFormLayout from './upload/UploadFormLayout';
import { useViolationAnalysisContext } from './ViolationAnalysisProvider';
import { useMLModelsByIndustry } from '@/hooks/ml-models/useModelQueries';

interface ViolationUploadProps {
  onUploadComplete: (results: { imagePreview: string | null }) => void;
  userIndustry?: string;
  hideModelSelection?: boolean;
  modelInitError?: string | null;
}

const ViolationUpload = ({ 
  onUploadComplete, 
  userIndustry = 'Construction', 
  hideModelSelection = false,
  modelInitError = null
}: ViolationUploadProps) => {
  const [industry, setIndustry] = useState<string>(userIndustry);
  const [violationText, setViolationText] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  
  const { data: models = [], isLoading: modelsLoading, error: modelsError } = useMLModelsByIndustry(industry);
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  
  // Use the context instead of the direct hook
  const { isAnalyzing, analyzeImage } = useViolationAnalysisContext();

  // Initialize and select the best model for the user's industry
  useEffect(() => {
    if (models?.length > 0 && !selectedModelId) {
      const bestModel = models.find(m => 
        m.industry === userIndustry && 
        m.model_type.includes('Object Detection')
      ) || models.find(m => m.name.toLowerCase().includes('yolo'));
      
      setSelectedModelId(bestModel?.id || models[0].id);
      setConnectionStatus('connected');
      console.log("Selected model for analysis:", bestModel?.name);
    }
  }, [models, selectedModelId, userIndustry]);

  // Monitor connection status and handle reconnection attempts
  useEffect(() => {
    if (modelsError || modelInitError) {
      setConnectionStatus('error');
      console.error("Model connection error:", modelsError || modelInitError);
    } else if (!modelsLoading && Array.isArray(models) && models.length > 0) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('connecting');
    }
  }, [models, modelsLoading, modelsError, modelInitError]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetTest = () => {
    setImagePreview(null);
    setImage(null);
    setViolationText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image && !violationText) {
      toast.error('Please upload an image or provide a text description to analyze');
      return;
    }
    
    try {
      if (image) {
        // Initialize storage bucket first to ensure permissions are set
        await fetch('/api/supabase/functions/v1/create-storage-buckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        await analyzeImage(image, industry);
        // The Provider will handle showing success/error toasts
        onUploadComplete({ imagePreview: imagePreview });
      } else if (violationText) {
        // Implement text-based analysis if needed
        toast.info("Text analysis not yet implemented", {
          description: "Please upload an image for analysis."
        });
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Analysis failed', {
        description: 'Please try again or contact support if the issue persists.'
      });
    }
  };
  
  if (modelsLoading) {
    return (
      <Card className="border border-dashed border-gray-700 bg-transparent">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <ConnectionStatus status="connecting" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-dashed border-gray-700 bg-transparent">
      <CardContent className="p-6">
        <ConnectionStatus 
          status={connectionStatus} 
          errorMessage={modelInitError || modelsError?.message} 
        />
        
        <div className="text-center">
          <UploadFormLayout
            imagePreview={imagePreview}
            models={models}
            industry={industry}
            setIndustry={setIndustry}
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
            violationText={violationText}
            setViolationText={(e) => setViolationText(e.target.value)}
            handleImageChange={handleImageChange}
            isSubmitting={isAnalyzing}
            resetTest={resetTest}
            handleSubmit={handleSubmit}
            hideModelSelection={hideModelSelection}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationUpload;
