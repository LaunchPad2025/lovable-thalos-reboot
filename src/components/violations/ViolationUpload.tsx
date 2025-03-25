
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useModelTest } from '@/hooks/useModelTest';
import { useMLModels } from '@/hooks/useMLModels';
import { toast } from 'sonner';
import ImageUploader from './upload/ImageUploader';
import ImagePreview from './upload/ImagePreview';
import ViolationForm from './upload/ViolationForm';
import AnalysisButtons from './upload/AnalysisButtons';
import { Loader2 } from 'lucide-react';

interface ViolationUploadProps {
  onUploadComplete: (results: any) => void;
  userIndustry?: string;
  hideModelSelection?: boolean;
}

const ViolationUpload = ({ 
  onUploadComplete, 
  userIndustry = 'Construction', 
  hideModelSelection = false 
}: ViolationUploadProps) => {
  const { data: models = [], isLoading: modelsLoading, error: modelsError } = useMLModels();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [industry, setIndustry] = useState<string>(userIndustry);
  const [violationText, setViolationText] = useState<string>('');
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
    }
  }, [models, selectedModelId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For multimodal models, text only is OK
    const selectedModel = models.find(m => m.id === selectedModelId);
    const isMultimodal = selectedModel?.model_type === 'Multimodal (Image + Text)';
    
    if (!imagePreview && !violationText && !isMultimodal) {
      toast.error('Please upload an image or provide a text description to analyze');
      return;
    }
    
    // If no model is explicitly selected, use the first one in the list
    const modelToUse = selectedModelId || (models.length > 0 ? models[0].id : '');
    if (!modelToUse) {
      toast.error('No models available for analysis. Please try again later.');
      return;
    }
    
    const values = {
      model_id: modelToUse,
      violation_text: violationText,
      industry: industry,
    };
    
    try {
      const results = await submitModelTest(values, selectedModel);
      if (results) {
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
            <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading AI models...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-dashed border-gray-700 bg-transparent">
      <CardContent className="p-6">
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            {!imagePreview ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-400 mb-6">
                    Upload an image from your worksite to analyze for safety violations. Our AI will detect potential safety issues and regulatory non-compliance.
                  </p>
                  
                  {modelsError && (
                    <div className="bg-red-900/30 text-red-200 p-3 rounded-md mb-4 border border-red-800">
                      Error loading models: {modelsError.message || "Please try again later. Using default model settings."}
                    </div>
                  )}
                  
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
