
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ViolationTextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hasImage: boolean;
}

const ViolationTextInput = ({ value, onChange, hasImage }: ViolationTextInputProps) => {
  const label = hasImage ? "Additional Context (Optional)" : "Violation Description (Optional)";
  const placeholder = hasImage
    ? "Add any additional context about the image..."
    : "Describe the potential violation if you're not uploading an image...";

  return (
    <div className="mb-4 text-left">
      <Label htmlFor="violationText" className="mb-2 block text-sm font-medium">{label}</Label>
      <Textarea
        id="violationText"
        placeholder={placeholder}
        className="bg-gray-800 border-gray-700 min-h-[80px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ViolationTextInput;
