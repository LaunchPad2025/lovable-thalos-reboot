
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UrgencyRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
}

const UrgencyRadioGroup = ({ value, onChange }: UrgencyRadioGroupProps) => {
  return (
    <div className="space-y-3">
      <Label>Urgency Level</Label>
      <RadioGroup 
        value={value}
        onValueChange={onChange}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="urgency-low" />
          <Label htmlFor="urgency-low" className="font-normal">Low - Not blocking work</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="urgency-medium" />
          <Label htmlFor="urgency-medium" className="font-normal">Medium - Partially blocking work</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="urgency-high" />
          <Label htmlFor="urgency-high" className="font-normal">High - Blocking critical work</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="critical" id="urgency-critical" />
          <Label htmlFor="urgency-critical" className="font-normal">Critical - System outage or security issue</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default UrgencyRadioGroup;
