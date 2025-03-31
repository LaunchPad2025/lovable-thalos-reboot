
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface PricingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onChange: (value: 'monthly' | 'annual') => void;
}

const PricingToggle = ({ billingCycle, onChange }: PricingToggleProps) => {
  return (
    <div className="flex justify-center items-center mb-8 gap-3">
      <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>Monthly</span>
      <Switch 
        checked={billingCycle === 'annual'} 
        onCheckedChange={(checked) => onChange(checked ? 'annual' : 'monthly')} 
      />
      <span className={billingCycle === 'annual' ? 'font-medium' : 'text-muted-foreground'}>Annual</span>
      {billingCycle === 'annual' && (
        <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
          Save 15%
        </Badge>
      )}
    </div>
  );
};

export default PricingToggle;
