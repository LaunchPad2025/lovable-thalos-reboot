
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { MLModel } from '@/hooks/useMLModels';
import { useModelTest, testModelSchema, TestModelFormValues } from '@/hooks/model-testing';
import ModelSelector from './ModelSelector';
import IndustrySelector from './IndustrySelector';
import ModelTestInputs from './ModelTestInputs';
import ModelTestResults from './ModelTestResults';

interface TestModelFormProps {
  models: MLModel[];
}

const TestModelForm = ({ models }: TestModelFormProps) => {
  const { 
    isSubmitting, 
    imagePreview, 
    testResult, 
    handleImageChange, 
    submitModelTest, 
    resetTest 
  } = useModelTest();
  
  const form = useForm<TestModelFormValues>({
    resolver: zodResolver(testModelSchema),
    defaultValues: {
      model_id: '',
      violation_text: '',
      industry: '',
    },
  });
  
  const selectedModelId = form.watch('model_id');
  const selectedModel = models.find(m => m.id === selectedModelId);
  
  // When model is selected, auto-fill industry
  const onModelChange = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model) {
      form.setValue('industry', model.industry === 'All' ? 'Construction' : model.industry);
    }
  };
  
  const onSubmit = async (values: TestModelFormValues) => {
    await submitModelTest(values, selectedModel);
  };
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ModelSelector 
            control={form.control} 
            models={models} 
            onModelChange={onModelChange} 
            selectedModel={selectedModel}
          />
          
          <IndustrySelector 
            control={form.control} 
            selectedModel={selectedModel}
          />
          
          <ModelTestInputs 
            control={form.control} 
            selectedModel={selectedModel} 
            handleImageChange={handleImageChange} 
            imagePreview={imagePreview}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !selectedModel}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Analyze Violation'
            )}
          </Button>
        </form>
      </Form>
      
      <ModelTestResults 
        testResult={testResult} 
        onReset={resetTest} 
        imagePreview={imagePreview}
      />
    </div>
  );
};

export default TestModelForm;
