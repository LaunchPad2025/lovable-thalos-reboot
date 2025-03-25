import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MLModel } from '@/hooks/ml-models';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  models: MLModel[];
  hidden?: boolean;
}

const ModelSelector = ({ value, onChange, models, hidden = false }: ModelSelectorProps) => {
  if (hidden) return null;
  
  // Ensure there are models available
  const hasModels = models && models.length > 0;
  
  return (
    <div>
      <Label htmlFor="model" className="mb-2 block text-sm font-medium">AI Model</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={!hasModels}
      >
        <SelectTrigger className="bg-gray-800 border-gray-700 w-full">
          <SelectValue placeholder={hasModels ? "Auto-select best model" : "No models available"} />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {!hasModels ? (
            <SelectItem value="none" disabled>No active models available</SelectItem>
          ) : (
            models.map(model => (
              <SelectItem key={model.id} value={model.id}>
                {model.name} ({model.model_type})
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {!hasModels && (
        <p className="text-xs text-amber-400 mt-1">
          No models available. Default model will be used.
        </p>
      )}
    </div>
  );
};

export default ModelSelector;
