
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useModelTest } from '@/hooks/useModelTest';
import { useMLModels } from '@/hooks/useMLModels';
import { toast } from 'sonner';
import ImageUploader from './upload/ImageUploader';
import ImagePreview from './upload/ImagePreview';
import ViolationForm from './upload/ViolationForm';
import AnalysisButtons from './upload/AnalysisButtons';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ViolationUploadProps {
  onUploadComplete: (results: any) => void;
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
  const { data: models = [], isLoading: modelsLoading, error: modelsError } = useMLModels();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [industry, setIndustry] = useState<string>(userIndustry);
  const [violationText, setViolationText] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const { 
    isSubmitting, 
    imagePreview, 
    handleImageChange, 
    submitModelTest,
    resetTest 
  } = useModelTest();
  
  // Auto-select first model if none selected and models are available
  useEffect(() => {
    if (models?.length > 0 && !selectedModelId) {
      // Find the YOLOv8 model or default to the first one
      const yoloModel = models.find(m => m.name.toLowerCase().includes('yolo'));
      setSelectedModelId(yoloModel?.id || models[0].id);
      
      // Update connection status
      setConnectionStatus('connected');
      console.log("Models loaded successfully, using: ", yoloModel?.name || models[0].name);
    }
  }, [models, selectedModelId]);

  // Check model connection
  useEffect(() => {
    if (modelsError || modelInitError) {
      setConnectionStatus('error');
      console.error("Model connection error:", modelsError || modelInitError);
    } else if (!modelsLoading && models.length > 0) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('connecting');
    }
  }, [models, modelsLoading, modelsError, modelInitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For multimodal models, text only is OK
    const selectedModel = models.find(m => m.id === selectedModelId);
    const isMultimodal = selectedModel?.model_type === 'Multimodal (Image + Text)';
    
    if (!imagePreview && !violationText) {
      toast.error('Please upload an image or provide a text description to analyze');
      return;
    }
    
    // If no model is explicitly selected, use the first one in the list
    const modelToUse = selectedModelId || (models.length > 0 ? models[0].id : '');
    
    // Always allow analysis even if no models are available - backend will use fallback detection
    try {
      console.log("Submitting analysis with image:", imagePreview ? "Image present" : "No image");
      
      // If we have connection issues, let the user know we're using fallback detection
      if (connectionStatus === 'error' || !modelToUse) {
        toast.info("Using fallback detection system", {
          description: "Some AI models couldn't be loaded. We'll use our basic detection system instead."
        });
      }
      
      const values = {
        model_id: modelToUse || 'default',  // Use default if no model available
        violation_text: violationText,
        industry: industry,
      };
      
      const results = await submitModelTest(values, selectedModel);
      if (results) {
        console.log("Analysis complete, results:", results);
        onUploadComplete(results);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Failed to analyze image. Please try again.');
    }
  };
  
  if (modelsLoading) {
    return (
      <Card className="border border-dashed border-gray-700 bg-transparent">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading AI models...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-dashed border-gray-700 bg-transparent">
      <CardContent className="p-6">
        {(modelInitError || modelsError) && (
          <Alert variant="warning" className="mb-4 bg-yellow-900/30 border border-yellow-800 text-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              {modelInitError || modelsError?.message || "Model connection issue. Using fallback detection."}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            {!imagePreview ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-400 mb-6">
                    Upload an image from your worksite to analyze for safety violations. Our AI will detect potential safety issues and regulatory non-compliance.
                  </p>
                  
                  <ViolationForm
                    industry={industry}
                    setIndustry={setIndustry}
                    selectedModelId={selectedModelId}
                    setSelectedModelId={setSelectedModelId}
                    violationText={violationText}
                    setViolationText={(e) => setViolationText(e.target.value)}
                    models={models}
                    hasImage={false}
                    hideModelSelection={hideModelSelection}
                  />
                </div>
                
                <ImageUploader onImageChange={handleImageChange} />
                
                {violationText && (
                  <AnalysisButtons
                    isSubmitting={isSubmitting}
                    hasImage={false}
                    onReset={resetTest}
                    hasText={!!violationText}
                  />
                )}
              </>
            ) : (
              <>
                <ImagePreview 
                  imageUrl={imagePreview} 
                  onRemove={() => {
                    resetTest();
                  }} 
                />
                
                <ViolationForm
                  industry={industry}
                  setIndustry={setIndustry}
                  selectedModelId={selectedModelId}
                  setSelectedModelId={setSelectedModelId}
                  violationText={violationText}
                  setViolationText={(e) => setViolationText(e.target.value)}
                  models={models}
                  hasImage={true}
                  hideModelSelection={hideModelSelection}
                />
                
                <AnalysisButtons
                  isSubmitting={isSubmitting}
                  hasImage={true}
                  onReset={resetTest}
                  hasText={!!violationText}
                />
              </>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationUpload;
