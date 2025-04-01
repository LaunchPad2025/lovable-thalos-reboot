
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PricingCtaProps {
  onContactSales: () => void;
}

const PricingCta = ({ onContactSales }: PricingCtaProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Our team can create a tailored package to meet your specific safety compliance requirements for construction, oil & gas, or utilities & energy sectors.
      </p>
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90"
        onClick={() => window.location.href = "https://cal.com/annieeser/30min"}
      >
        <ArrowRight className="mr-2 h-4 w-4" />
        Schedule a Consultation
      </Button>
    </div>
  );
};

export default PricingCta;
