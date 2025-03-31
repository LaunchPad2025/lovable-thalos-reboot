
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { plans, formatPrice } from '@/data/subscriptionPlans';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
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
          className="mb-12 text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Basic Plan */}
          <Card className="border-border">
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>
                For small teams getting started with safety management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(199)}</span>
                <span className="text-muted-foreground ml-2">/ month</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Up to 10 users</PricingFeature>
                <PricingFeature>Basic incident reporting</PricingFeature>
                <PricingFeature>Standard compliance checklists</PricingFeature>
                <PricingFeature>Email support</PricingFeature>
                <PricingFeature>Basic analytics</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('basic')} 
                className="w-full">
                Subscribe to Basic
              </Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-blue-600 dark:border-blue-500 shadow-lg relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
              MOST POPULAR
            </div>
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Professional</CardTitle>
              <CardDescription>
                For growing businesses with advanced safety needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(350)}</span>
                <span className="text-muted-foreground ml-2">/ month</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Up to 50 users</PricingFeature>
                <PricingFeature>Advanced incident reporting</PricingFeature>
                <PricingFeature>Custom compliance checklists</PricingFeature>
                <PricingFeature>Priority email & phone support</PricingFeature>
                <PricingFeature>Advanced analytics</PricingFeature>
                <PricingFeature>Custom workflows</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('pro')} 
                className="w-full bg-blue-600 hover:bg-blue-700">
                Subscribe to Pro
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="border-border">
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>
                For medium-sized organizations requiring full compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(750)}</span>
                <span className="text-muted-foreground ml-2">/ month</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Up to 200 users</PricingFeature>
                <PricingFeature>Premium incident reporting</PricingFeature>
                <PricingFeature>Custom compliance & auditing</PricingFeature>
                <PricingFeature>Dedicated support team</PricingFeature>
                <PricingFeature>Advanced analytics & reporting</PricingFeature>
                <PricingFeature>Custom workflows & integrations</PricingFeature>
                <PricingFeature>AI safety assistant</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('premium')} 
                className="w-full">
                Subscribe to Premium
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-border">
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>
                Custom solutions for large organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-2xl font-bold">Custom Pricing</span>
                <p className="text-muted-foreground text-sm mt-1">Tailored to your needs</p>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Unlimited users</PricingFeature>
                <PricingFeature>Enterprise incident reporting</PricingFeature>
                <PricingFeature>Custom compliance & auditing</PricingFeature>
                <PricingFeature>Dedicated support team</PricingFeature>
                <PricingFeature>Advanced analytics & reporting</PricingFeature>
                <PricingFeature>Custom workflows & integrations</PricingFeature>
                <PricingFeature>AI safety assistant</PricingFeature>
                <PricingFeature>On-premises deployment option</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactSales} variant="outline" className="w-full">Talk to Sales</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Volume Discounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="font-bold text-xl mb-2">5-10 sites</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10%</div>
              <div className="text-muted-foreground">discount on per-site pricing</div>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="font-bold text-xl mb-2">11-25 sites</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15%</div>
              <div className="text-muted-foreground">discount on per-site pricing</div>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="font-bold text-xl mb-2">26+ sites</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">20%</div>
              <div className="text-muted-foreground">discount on per-site pricing</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team can create a tailored package to meet your specific safety compliance requirements.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleContactSales}
          >
            Schedule a Consultation with Annie
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

const PricingFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

export default Pricing;
