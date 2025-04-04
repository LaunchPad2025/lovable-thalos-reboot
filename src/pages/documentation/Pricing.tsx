
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { plans } from '@/data/subscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import PricingToggle from '@/components/pricing/PricingToggle';
import PricingCard from '@/components/pricing/PricingCard';
import PricingFaq from '@/components/pricing/PricingFaq';
import PricingDiscounts from '@/components/pricing/PricingDiscounts';
import PricingCta from '@/components/pricing/PricingCta';

const Pricing = () => {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');
  
  const handleContactSales = () => {
    toast({
      title: "Opening scheduling page",
      description: "You're being redirected to our calendar booking system...",
      duration: 3000,
    });
    
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Flexible Pricing for Every Business" 
          subtitle="Book a 30-minute setup call with our team to get started with a plan that suits your organization's needs"
          className="mb-8 text-center"
        />

        <PricingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <PricingCard 
            plan={plans[0]} 
            billingCycle={billingCycle}
            onSubscribe={handleContactSales}
          />
          <PricingCard 
            plan={plans[1]} 
            billingCycle={billingCycle}
            isPopular
            onSubscribe={handleContactSales}
          />
          <PricingCard 
            plan={plans[2]} 
            billingCycle={billingCycle}
            onSubscribe={handleContactSales}
          />
          <PricingCard 
            plan={plans[3]} 
            billingCycle={billingCycle}
            onSubscribe={handleContactSales}
          />
        </div>
        
        <PricingDiscounts onContactSales={handleContactSales} />
        
        <PricingFaq />
        
        <PricingCta onContactSales={handleContactSales} />
      </div>
    </PageContainer>
  );
};

export default Pricing;
