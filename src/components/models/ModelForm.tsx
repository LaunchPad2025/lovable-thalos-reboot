import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/lib/supabase';

interface ModelFormProps {
  isEditing?: boolean;
  modelId?: string;
  initialData?: any;
  onSuccess: () => void;
}

const ModelForm: React.FC<ModelFormProps> = ({ isEditing = false, modelId, initialData, onSuccess }) => {
  const [modelName, setModelName] = useState(initialData?.name || '');
  const [modelDescription, setModelDescription] = useState(initialData?.description || '');
  const [industryValue, setIndustryValue] = useState(initialData?.industry || 'All');
  const [modelVersion, setModelVersion] = useState(initialData?.version || '');
  const [modelType, setModelType] = useState(initialData?.model_type || 'Image');
  const [modelAccuracy, setModelAccuracy] = useState(initialData?.accuracy?.toString() || '');
  const [modelActive, setModelActive] = useState(initialData?.active || true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Ensure industry and model_type are always provided
    const modelData = {
      name: modelName,
      description: modelDescription,
      industry: industryValue || 'All', // Provide default value
      version: modelVersion,
      model_type: modelType || 'Image', // Provide default value
      accuracy: parseFloat(modelAccuracy) || null,
      active: modelActive,
    };
    
    if (isEditing && modelId) {
      const { error } = await supabase
        .from('ml_models')
        .update(modelData)
        .eq('id', modelId);
        
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('ml_models')
        .insert(modelData);
        
      if (error) throw error;
    }
    
    toast({
      title: `Model ${isEditing ? 'updated' : 'created'} successfully`,
      description: `The model "${modelName}" has been ${isEditing ? 'updated' : 'created'}.`,
    });
    
    onSuccess();
  } catch (error) {
    console.error('Error submitting model:', error);
    toast({
      title: 'Error',
      description: `Failed to ${isEditing ? 'update' : 'create'} model. Please try again.`,
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Model Name</Label>
          <Input id="name" value={modelName} onChange={(e) => setModelName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input id="version" value={modelVersion} onChange={(e) => setModelVersion(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={modelDescription}
          onChange={(e) => setModelDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select value={industryValue} onValueChange={setIndustryValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Warehousing">Warehousing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Model Type</Label>
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Image">Image (Object Detection)</SelectItem>
              <SelectItem value="Text">Text (NLP)</SelectItem>
              <SelectItem value="Multimodal">Multimodal (Image + Text)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accuracy">Accuracy (%)</Label>
          <Input
            type="number"
            id="accuracy"
            value={modelAccuracy}
            onChange={(e) => setModelAccuracy(e.target.value)}
            placeholder="e.g., 95.5"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="active">Active</Label>
          <Switch id="active" checked={modelActive} onCheckedChange={setModelActive} />
        </div>
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : (isEditing ? 'Update model' : 'Create model')}
      </Button>
    </form>
  );
};

export default ModelForm;
