
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { TestModelFormValues } from '@/hooks/useModelTest';
import { MLModel } from '@/hooks/useMLModels';

interface IndustrySelectorProps {
  control: Control<TestModelFormValues>;
  selectedModel: MLModel | undefined;
}

const IndustrySelector = ({ control, selectedModel }: IndustrySelectorProps) => {
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
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Ports">Ports</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IndustrySelector;
