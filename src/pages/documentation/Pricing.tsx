
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { plans } from '@/data/subscriptionPlans';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PricingToggle from '@/components/pricing/PricingToggle';
import PricingCard from '@/components/pricing/PricingCard';
import PricingFaq from '@/components/pricing/PricingFaq';
import PricingDiscounts from '@/components/pricing/PricingDiscounts';
import PricingCta from '@/components/pricing/PricingCta';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const handleSubscribe = (planId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    // Navigate to subscription page with plan pre-selected
    navigate(`/subscription?plan=${planId}`);
  };

  const handleContactSales = () => {
    window.location.href = "https://cal.com/annieeser/30min";
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Flexible Pricing for Every Business" 
          subtitle="Choose the plan that suits your organization's safety management needs"
          className="mb-8 text-center"
        />

        <PricingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <PricingCard 
            plan={plans[0]} 
            billingCycle={billingCycle}
            onSubscribe={handleSubscribe}
          />
          <PricingCard 
            plan={plans[1]} 
            billingCycle={billingCycle}
            isPopular
            onSubscribe={handleSubscribe}
          />
          <PricingCard 
            plan={plans[2]} 
            billingCycle={billingCycle}
            onSubscribe={handleSubscribe}
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
