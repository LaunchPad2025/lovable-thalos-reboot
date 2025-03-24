
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { MLModel } from '@/hooks/useMLModels';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testModelSchema = z.object({
  model_id: z.string().min(1, 'Model is required'),
  violation_text: z.string().min(1, 'Violation description is required').or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
});

type TestModelFormValues = z.infer<typeof testModelSchema>;

interface TestModelFormProps {
  models: MLModel[];
}

interface TestResult {
  regulationIds: string[];
  relevanceScores: number[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in-progress' | 'resolved';
  description: string;
  detections?: any[];
}

const TestModelForm = ({ models }: TestModelFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const activeModels = models.filter(m => m.active);
  
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (values: TestModelFormValues) => {
    if (!values.violation_text && !image && selectedModel?.model_type !== 'Multimodal (Image + Text)') {
      toast.error('Please provide either text or an image');
      return;
    }
    
    setIsSubmitting(true);
    setTestResult(null);
    
    try {
      // Prepare the request payload
      const requestData: any = {
        violationText: values.violation_text || undefined,
        industry: values.industry,
        modelId: selectedModel?.name.toLowerCase().split(' ')[0].replace(/\+/g, '') || 'yolov8'
      };
      
      // If there's an image, we'd handle it here
      if (image) {
        // In a production app, you would upload the image to storage first
        // For now, we'll just simulate with the image name
        requestData.violationImageUrl = `mock_url_for_${image.name}`;
      }
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-violation', {
        body: requestData
      });
      
      if (error) throw error;
      
      setTestResult(data);
      toast.success('Model analysis completed successfully');
    } catch (error: any) {
      console.error('Error testing model:', error);
      toast.error(error.message || 'Failed to test model');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
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
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
          
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!!selectedModel && selectedModel.industry !== 'All'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Food Processing">Food Processing</SelectItem>
                    <SelectItem value="Mining">Mining</SelectItem>
                    <SelectItem value="Warehousing">Warehousing</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {(selectedModel?.model_type.includes('Text') || selectedModel?.model_type.includes('Multimodal')) && (
            <FormField
              control={form.control}
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
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
              />
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
      
      {testResult && (
        <Card className="mt-6 p-4">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Confidence:</span>
              <span className="text-sm">{(testResult.confidence * 100).toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Severity:</span>
              <Badge className={renderSeverityClass(testResult.severity)}>
                {testResult.severity.charAt(0).toUpperCase() + testResult.severity.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Description:</p>
              <p className="text-sm text-muted-foreground">{testResult.description}</p>
            </div>
            
            {testResult.detections && testResult.detections.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Detections:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {testResult.detections.map((detection, idx) => (
                    <li key={idx} className="text-sm">
                      {detection.label ? (
                        <>
                          <span className="font-medium">{detection.label.replace('_', ' ')}</span>
                          {detection.confidence && (
                            <span className="text-muted-foreground"> (Confidence: {(detection.confidence * 100).toFixed(1)}%)</span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">See analysis in description</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Related Regulations:</p>
              {testResult.regulationIds && testResult.regulationIds.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {testResult.regulationIds.map((id, index) => (
                    <li key={id} className="text-sm">
                      Regulation ID: {id.substring(0, 8)}... 
                      (Relevance: {(testResult.relevanceScores[index] * 100).toFixed(1)}%)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No regulations matched</p>
              )}
            </div>
            
            <div className="pt-3 border-t flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle size={16} className="text-yellow-500" />
                <span className="text-muted-foreground">AI model results are approximations and should be reviewed by safety experts.</span>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setTestResult(null)}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TestModelForm;
