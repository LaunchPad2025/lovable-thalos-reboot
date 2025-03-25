
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ViolationTextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hasImage: boolean;
}

const ViolationTextInput = ({ value, onChange, hasImage }: ViolationTextInputProps) => {
  return (
    <div>
      <label htmlFor="violation-text" className="block text-sm font-medium text-gray-200 mb-1 text-left">
        {hasImage ? 'Additional Context' : 'Describe the Safety Concern'}
      </label>
      <Textarea
        id="violation-text"
        placeholder={
          hasImage
            ? "Provide additional context to help our AI (e.g., 'Check if workers are wearing proper PPE')"
            : "Describe the safety violation or concern (e.g., 'Workers not wearing hard hats at construction site')"
        }
        className="bg-gray-800 text-gray-100 border-gray-700 min-h-[80px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ViolationTextInput;
