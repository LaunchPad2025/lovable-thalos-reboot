
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { plans, formatPrice } from '@/data/subscriptionPlans';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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

        <div className="flex justify-center items-center mb-8 gap-3">
          <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>Monthly</span>
          <Switch 
            checked={billingCycle === 'annual'} 
            onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')} 
          />
          <span className={billingCycle === 'annual' ? 'font-medium' : 'text-muted-foreground'}>Annual</span>
          {billingCycle === 'annual' && (
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              Save 15%
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Basic Plan */}
          <Card className="border-border">
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>
                For teams getting started with safety management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(plans[0].pricing[billingCycle])}</span>
                <span className="text-muted-foreground ml-2">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>50 safety analyses per month</PricingFeature>
                <PricingFeature>Full access to Paulie AI assistant</PricingFeature>
                <PricingFeature>Comprehensive violation detection</PricingFeature>
                <PricingFeature>Task tracking and management</PricingFeature>
                <PricingFeature>Dashboard with analytics</PricingFeature>
                <PricingFeature>Remediation plan generation</PricingFeature>
                <PricingFeature>Access to all regulation information</PricingFeature>
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
          <Card className="border-blue-600 dark:border-blue-500 shadow-lg relative md:scale-105 z-10">
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
                <span className="text-4xl font-bold">{formatPrice(plans[1].pricing[billingCycle])}</span>
                <span className="text-muted-foreground ml-2">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>100 safety analyses per month</PricingFeature>
                <PricingFeature>All Basic plan features</PricingFeature>
                <PricingFeature>Multi-modal analysis (image, text, audio)</PricingFeature>
                <PricingFeature>Enhanced detection with AI insights</PricingFeature>
                <PricingFeature>Advanced reporting capabilities</PricingFeature>
                <PricingFeature>Risk level assessment</PricingFeature>
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
                For organizations requiring comprehensive safety solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(plans[2].pricing[billingCycle])}</span>
                <span className="text-muted-foreground ml-2">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>250 safety analyses per month</PricingFeature>
                <PricingFeature>All Pro plan features</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
                <PricingFeature>Custom industry profiles</PricingFeature>
                <PricingFeature>Advanced analytics dashboard</PricingFeature>
                <PricingFeature>Comprehensive audit trails</PricingFeature>
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
                <PricingFeature>Custom integration</PricingFeature>
                <PricingFeature>Multiple user accounts</PricingFeature>
                <PricingFeature>Custom reporting</PricingFeature>
                <PricingFeature>All Premium plan features</PricingFeature>
                <PricingFeature>Custom deployment options</PricingFeature>
                <PricingFeature>Dedicated account manager</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactSales} variant="outline" className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Analysis Volume Discounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="font-bold text-xl mb-2">More Analyses Needed?</div>
              <div className="text-muted-foreground mb-4">Need more than your plan's monthly analyses?</div>
              <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Additional Packs Available</div>
              <div className="text-muted-foreground">Contact sales for custom volume pricing</div>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg bg-blue-50 dark:bg-blue-900/10">
              <div className="font-bold text-xl mb-2">Annual Billing</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15%</div>
              <div className="text-muted-foreground">discount with annual billing</div>
              <div className="text-sm text-muted-foreground mt-2">Pay once and save</div>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="font-bold text-xl mb-2">Multiple Sites?</div>
              <div className="text-muted-foreground mb-4">Managing safety across multiple locations?</div>
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-900/20"
                onClick={handleContactSales}
              >
                Get Multi-Site Discount
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How many safety analyses can I run?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each plan includes a set number of monthly analyses: Basic (50), Pro (100), and Premium (250). 
                  Need more? Contact our sales team for additional analysis packs or custom volume pricing.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What is the advantage of annual billing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With annual billing, you save 15% compared to monthly billing. It's a great option if you're committed to 
                  improving safety compliance over the long term while also saving on your subscription costs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Can I upgrade my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade your plan at any time. When you upgrade, you'll be prorated for the remainder of your billing cycle.
                  Your new features will be available immediately after upgrading.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What is multi-modal analysis?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Multi-modal analysis allows you to analyze safety conditions using different input types: 
                  images (photos of work sites), text (written descriptions), and audio (verbal reports). This 
                  feature is available in Pro and Premium plans.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What support options are available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All plans include email support. Premium plans include priority support with faster response times.
                  Enterprise customers receive a dedicated account manager for personalized assistance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Do you offer discounts for multiple sites?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer volume discounts for businesses managing safety across multiple locations.
                  Contact our sales team to discuss your specific needs and we'll create a custom pricing package.
                </p>
              </CardContent>
            </Card>
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
            <ArrowRight className="mr-2 h-4 w-4" />
            Schedule a Consultation
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
