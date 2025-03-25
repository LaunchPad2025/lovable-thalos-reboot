
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IndustrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  industries: string[];
}

const IndustrySelector = ({ value, onChange, industries }: IndustrySelectorProps) => {
  return (
    <div>
      <Label htmlFor="industry" className="mb-2 block text-sm font-medium">Industry</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
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
  );
};

export default IndustrySelector;
