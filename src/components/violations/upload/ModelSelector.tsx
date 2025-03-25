
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MLModel } from '@/hooks/useMLModels';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  models: MLModel[];
  hidden?: boolean;
}

const ModelSelector = ({ value, onChange, models, hidden = false }: ModelSelectorProps) => {
  if (hidden) return null;
  
  return (
    <div>
      <Label htmlFor="model" className="mb-2 block text-sm font-medium">AI Model</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger className="bg-gray-800 border-gray-700 w-full">
          <SelectValue placeholder="Auto-select best model" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {models.map(model => (
            <SelectItem key={model.id} value={model.id}>
              {model.name} ({model.model_type})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
