
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useModelTest } from '@/hooks/useModelTest';
import { useMLModels } from '@/hooks/useMLModels';
import { Loader2 } from 'lucide-react';

interface ViolationUploadProps {
  onUploadComplete: (results: any) => void;
}

const ViolationUpload = ({ onUploadComplete }: ViolationUploadProps) => {
  const { data: models = [] } = useMLModels();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Construction');
  const { 
    isSubmitting, 
    imagePreview, 
    handleImageChange, 
    submitModelTest,
    resetTest 
  } = useModelTest();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please upload an image');
      return;
    }
    
    const selectedModel = models.find(m => m.id === selectedModelId);
    
    const values = {
      model_id: selectedModelId || (models[0]?.id || ''),
      violation_text: '',
      industry: industry,
    };
    
    try {
      const results = await submitModelTest(values, selectedModel);
      onUploadComplete(results);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };
  
  return (
    <Card className="border border-dashed border-gray-300">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Upload an image from your worksite to analyze for safety violations
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Select Industry</option>
                <option value="Construction">Construction</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Oil & Gas">Oil & Gas</option>
                <option value="Energy">Energy</option>
                <option value="Warehousing">Warehousing</option>
              </select>
            </div>
            
            <div className="mb-4">
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Recommended Model</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.model_type}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center">
              <div className="mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Upload images or videos to analyze for safety violations
              </p>
              
              <div className="flex items-center gap-2">
                <label
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
                >
                  <span>Select Files</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: JPEG, PNG, GIF, MP4, MOV
              </p>
            </div>
            
            {imagePreview && (
              <div className="mt-5">
                <h4 className="text-sm font-medium mb-2">Preview:</h4>
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="max-h-[300px] rounded border border-gray-200 mx-auto"
                />
                
                <button
                  type="submit"
                  className="mt-4 bg-thalos-blue hover:bg-blue-600 text-white px-6 py-2 rounded w-full flex items-center justify-center"
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
                </button>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationUpload;
