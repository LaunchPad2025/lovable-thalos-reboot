
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { TestModelFormValues } from '@/hooks/useModelTest';
import { MLModel } from '@/hooks/useMLModels';
import { useRef, useState } from 'react';

interface ModelTestInputsProps {
  control: Control<TestModelFormValues>;
  selectedModel: MLModel | undefined;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
}

const ModelTestInputs = ({ 
  control, 
  selectedModel, 
  handleImageChange, 
  imagePreview 
}: ModelTestInputsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      {(selectedModel?.model_type.includes('Text') || selectedModel?.model_type.includes('Multimodal')) && (
        <FormField
          control={control}
          name="violation_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Violation Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the potential violation..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {(selectedModel?.model_type.includes('Image') || selectedModel?.model_type.includes('Multimodal')) && (
        <div className="space-y-2">
          <FormLabel>Upload Image</FormLabel>
          <div className="flex items-center gap-2">
            <Input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {fileInputRef.current?.files?.length > 0 && (
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    // Trigger the onChange event to clear the preview
                    const event = new Event('change', { bubbles: true });
                    fileInputRef.current.dispatchEvent(event);
                  }
                }}
              >
                Clear
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-2">
                Preview:
              </p>
              <div className="relative max-w-md mx-auto">
                <img 
                  src={imagePreview} 
                  alt="Upload preview" 
                  className="rounded-md border object-cover max-h-[300px] w-full" 
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModelTestInputs;
