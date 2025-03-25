
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { TestModelFormValues } from '@/hooks/model-testing/types';
import { MLModel } from '@/hooks/ml-models';

interface IndustrySelectorProps {
  control: Control<TestModelFormValues>;
  selectedModel: MLModel | undefined;
}

const IndustrySelector = ({ control, selectedModel }: IndustrySelectorProps) => {
  const industries = ['Construction', 'Manufacturing', 'Warehouse', 'Oil & Gas', 'Healthcare', 'Transportation'];
  
  // If model is industry-specific, only show that industry
  const displayedIndustries = selectedModel?.industry !== 'All' 
    ? [selectedModel?.industry || 'Construction'] 
    : industries;

  return (
    <FormField
      control={control}
      name="industry"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Industry</FormLabel>
          <Select 
            onValueChange={field.onChange}
            value={field.value}
            disabled={selectedModel?.industry !== 'All'}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {displayedIndustries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IndustrySelector;
