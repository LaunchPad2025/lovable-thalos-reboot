
import React from 'react';
import { MLModel } from '@/hooks/useMLModels';
import ViolationForm from './ViolationForm';
import ImageUploader from './ImageUploader';
import AnalysisButtons from './AnalysisButtons';
import ImagePreview from './ImagePreview';

interface UploadFormLayoutProps {
  imagePreview: string | null;
  models: MLModel[];
  industry: string;
  setIndustry: (industry: string) => void;
  selectedModelId: string;
  setSelectedModelId: (modelId: string) => void;
  violationText: string;
  setViolationText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  resetTest: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  hideModelSelection: boolean;
}

const UploadFormLayout = ({
  imagePreview,
  models,
  industry,
  setIndustry,
  selectedModelId,
  setSelectedModelId,
  violationText,
  setViolationText,
  handleImageChange,
  isSubmitting,
  resetTest,
  handleSubmit,
  hideModelSelection
}: UploadFormLayoutProps) => {
  return (
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
              setViolationText={(e) => setViolationText(e)}
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
            onRemove={resetTest} 
          />
          
          <ViolationForm
            industry={industry}
            setIndustry={setIndustry}
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
            violationText={violationText}
            setViolationText={(e) => setViolationText(e)}
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
  );
};

export default UploadFormLayout;
