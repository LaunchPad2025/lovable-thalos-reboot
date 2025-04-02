
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupportInfoFieldsProps {
  formData: {
    supportTier: string;
    issueType: string;
  };
  handleSelectChange: (field: string, value: string) => void;
}

const SupportInfoFields = ({ formData, handleSelectChange }: SupportInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="supportTier">Support Tier</Label>
        <Select 
          value={formData.supportTier} 
          onValueChange={(value) => handleSelectChange('supportTier', value)}
        >
          <SelectTrigger id="supportTier">
            <SelectValue placeholder="Select your support tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="trial">Free Trial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="issueType">Issue Type</Label>
        <Select 
          value={formData.issueType} 
          onValueChange={(value) => handleSelectChange('issueType', value)}
        >
          <SelectTrigger id="issueType">
            <SelectValue placeholder="Select issue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical Issue</SelectItem>
            <SelectItem value="billing">Billing Question</SelectItem>
            <SelectItem value="account">Account Management</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SupportInfoFields;
