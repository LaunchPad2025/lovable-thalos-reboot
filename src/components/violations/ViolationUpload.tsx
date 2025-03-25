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

  useEffect(() => {
    if (modelsError || modelInitError) {
      setConnectionStatus('error');
      console.error("Model connection error:", modelsError || modelInitError);
      
      const timer = setTimeout(() => {
        console.log("Attempting to reconnect to AI models...");
        window.location.reload();
      }, 5000);
      
      return () => clearTimeout(timer);
    } else if (!modelsLoading && models.length > 0) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('connecting');
    }
  }, [models, modelsLoading, modelsError, modelInitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedModel = models.find(m => m.id === selectedModelId);
    const isMultimodal = selectedModel?.model_type === 'Multimodal (Image + Text)';
    
    if (!imagePreview && !violationText) {
      toast.error('Please upload an image or provide a text description to analyze');
      return;
    }
    
    try {
      console.log("Starting analysis with model:", selectedModel?.name);
      
      if (connectionStatus === 'error' || !selectedModelId) {
        const fallbackModel = models.find(m => m.name.toLowerCase().includes('yolo'));
        if (fallbackModel) {
          toast.info("Using YOLOv8 for reliable detection", {
            description: "Switched to our most reliable model for analysis."
          });
          setSelectedModelId(fallbackModel.id);
        } else {
          toast.info("Using fallback detection system", {
            description: "AI models unavailable. Using basic detection system."
          });
        }
      }
      
      const values = {
        model_id: selectedModelId || 'default',
        violation_text: violationText,
        industry: industry,
      };
      
      const results = await submitModelTest(values, selectedModel);
      if (results) {
        console.log("Analysis complete:", results);
        onUploadComplete(results);
        
        if (results.detections && results.detections.length > 0) {
          toast.success(`Detected ${results.detections.length} safety violation(s)`, {
            description: "Click 'Create Task' to generate remediation steps."
          });
        } else {
          toast.info("No immediate violations detected", {
            description: "The area appears to comply with safety standards."
          });
        }
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
          <Alert variant="destructive" className="mb-4 bg-yellow-900/30 border border-yellow-800 text-yellow-200">
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
