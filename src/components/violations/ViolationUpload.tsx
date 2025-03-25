
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useModelTest } from '@/hooks/useModelTest';
import { useMLModels } from '@/hooks/useMLModels';
import { Loader2, Upload, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ViolationUploadProps {
  onUploadComplete: (results: any) => void;
}

const ViolationUpload = ({ onUploadComplete }: ViolationUploadProps) => {
  const { data: models = [] } = useMLModels();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Construction');
  const [violationText, setViolationText] = useState<string>('');
  const { 
    isSubmitting, 
    imagePreview, 
    handleImageChange, 
    submitModelTest,
    resetTest 
  } = useModelTest();
  
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
      toast.error('No models available. Please contact support.');
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-left">
                    <div>
                      <Label htmlFor="industry" className="mb-2 block text-sm font-medium">Industry</Label>
                      <Select 
                        value={industry} 
                        onValueChange={setIndustry}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 w-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {industries.map(ind => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="model" className="mb-2 block text-sm font-medium">AI Model</Label>
                      <Select 
                        value={selectedModelId} 
                        onValueChange={setSelectedModelId}
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
                  </div>
                  
                  <div className="mb-4 text-left">
                    <Label htmlFor="violationText" className="mb-2 block text-sm font-medium">Violation Description (Optional)</Label>
                    <Textarea
                      id="violationText"
                      placeholder="Describe the potential violation if you're not uploading an image..."
                      className="bg-gray-800 border-gray-700 min-h-[80px]"
                      value={violationText}
                      onChange={(e) => setViolationText(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
                  <div className="mb-6 bg-gray-800 p-3 rounded-full">
                    <Upload className="h-6 w-6 text-blue-400" />
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-6">
                    Upload images to analyze for safety violations
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <label className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
                      <span>Select Files</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, GIF
                  </p>
                </div>
                
                {violationText && (
                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center"
                    >
                      Analyze Text Description
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5">
                <h4 className="text-sm font-medium mb-2 text-left">Preview:</h4>
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="max-h-[300px] rounded border border-gray-700 mx-auto"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
                  <div>
                    <Label htmlFor="industry" className="mb-2 block text-sm font-medium">Industry</Label>
                    <Select 
                      value={industry} 
                      onValueChange={setIndustry}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {industries.map(ind => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="model" className="mb-2 block text-sm font-medium">AI Model</Label>
                    <Select 
                      value={selectedModelId} 
                      onValueChange={setSelectedModelId}
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
                </div>
                
                <div className="mb-4 text-left mt-4">
                  <Label htmlFor="violationText" className="mb-2 block text-sm font-medium">Additional Context (Optional)</Label>
                  <Textarea
                    id="violationText"
                    placeholder="Add any additional context about the image..."
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                    value={violationText}
                    onChange={(e) => setViolationText(e.target.value)}
                  />
                </div>
                
                <div className="mt-4 flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                    onClick={() => resetTest()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze for Violations'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationUpload;
