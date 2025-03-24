
import { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { TestModelFormValues } from '@/hooks/useModelTest';
import { MLModel } from '@/hooks/useMLModels';

interface ModelSelectorProps {
  control: Control<TestModelFormValues>;
  models: MLModel[];
  onModelChange: (modelId: string) => void;
  selectedModel: MLModel | undefined;
}

const ModelSelector = ({ control, models, onModelChange, selectedModel }: ModelSelectorProps) => {
  const activeModels = models.filter(m => m.active);
  
  const getModelTypeDescription = (type: string) => {
    if (!type) return '';
    
    if (type.includes('Object Detection')) 
      return 'This model detects objects like missing PPE or safety equipment.';
    if (type.includes('Pose Estimation')) 
      return 'This model analyzes worker posture to identify unsafe positions.';
    if (type.includes('Semantic Segmentation')) 
      return 'This model identifies hazardous areas in the environment.';
    if (type.includes('Multimodal')) 
      return 'This model understands both images and text to provide comprehensive analysis.';
    
    return '';
  };

  return (
    <>
      <FormField
        control={control}
        name="model_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Model</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                onModelChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {activeModels.length === 0 ? (
                  <SelectItem value="none" disabled>No active models available</SelectItem>
                ) : (
                  activeModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} ({model.model_type})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {selectedModel && (
        <div className="text-sm text-muted-foreground mb-4">
          <p>{selectedModel.description}</p>
          <p className="mt-2">{getModelTypeDescription(selectedModel.model_type)}</p>
          {selectedModel.model_url && (
            <a 
              href={selectedModel.model_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-thalos-blue hover:underline mt-2 inline-block"
            >
              View on HuggingFace
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default ModelSelector;
