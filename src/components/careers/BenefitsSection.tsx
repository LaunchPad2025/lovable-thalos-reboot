
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck } from 'lucide-react';
import BenefitItem from './BenefitItem';

const BenefitsSection = () => {
  return (
    <div className="mb-16 relative z-10">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Benefits</Badge>
        <h2 className="text-3xl font-bold mb-4">What we offer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive benefits designed to support you and your family
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Competitive Compensation"
            description="Salary packages that recognize your skills and experience"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Health & Wellness"
            description="Comprehensive medical, dental, and vision coverage for you and your dependents"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Retirement Planning"
            description="401(k) plan with company matching to help you save for the future"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Generous PTO"
            description="Flexible vacation policy plus paid holidays and sick leave"
          />
        </div>
        
        <div className="space-y-4">
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Remote-Friendly"
            description="Work from home options with periodic team gatherings"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Professional Development"
            description="Learning stipend and dedicated time for skill development"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Parental Leave"
            description="Paid leave for all new parents to bond with their children"
          />
          
          <BenefitItem
            icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
            title="Company Equity"
            description="Stock options so you can share in our success"
          />
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
