
import React from 'react';
import IndustrySelector from './IndustrySelector';
import ModelSelector from './ModelSelector';
import ViolationTextInput from './ViolationTextInput';
import { MLModel } from '@/hooks/useMLModels';

interface ViolationFormProps {
  industry: string;
  setIndustry: (value: string) => void;
  selectedModelId: string;
  setSelectedModelId: (value: string) => void;
  violationText: string;
  setViolationText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  models: MLModel[];
  hasImage: boolean;
  hideModelSelection: boolean;
}

const ViolationForm = ({
  industry,
  setIndustry,
  selectedModelId,
  setSelectedModelId,
  violationText,
  setViolationText,
  models,
  hasImage,
  hideModelSelection
}: ViolationFormProps) => {
  const industries = [
    'Construction',
    'Manufacturing', 
    'Healthcare', 
    'Warehouse', 
    'Oil & Gas',
    'Mining',
    'Transportation',
    'Food Service',
    'Agriculture',
    'Other'
  ];

  return (
    <div className={`grid grid-cols-1 ${!hideModelSelection ? 'md:grid-cols-2' : ''} gap-4 ${hasImage ? 'mt-4' : 'mb-4'} text-left`}>
      <IndustrySelector 
        value={industry} 
        onChange={setIndustry} 
        industries={industries} 
      />
      
      {!hideModelSelection && (
        <ModelSelector 
          value={selectedModelId} 
          onChange={setSelectedModelId} 
          models={models}
          hidden={hideModelSelection}
        />
      )}
      
      <div className="col-span-full">
        <ViolationTextInput 
          value={violationText}
          onChange={setViolationText}
          hasImage={hasImage}
        />
      </div>
    </div>
  );
};

export default ViolationForm;
