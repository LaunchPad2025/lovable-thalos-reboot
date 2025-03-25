
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
  const handleContactSales = () => {
    window.location.href = "https://cal.com/thalos-sales/30min";
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Flexible Pricing for Every Business" 
          subtitle="Choose the plan that suits your organization's safety management needs"
          className="mb-12 text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Standard Plan */}
          <Card className="border-border">
            <CardHeader>
              <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Standard</CardTitle>
              <CardDescription>
                For small businesses with basic safety needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">$249</span>
                <span className="text-muted-foreground ml-2">/ month per site</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Up to 25 users</PricingFeature>
                <PricingFeature>AI violation detection</PricingFeature>
                <PricingFeature>Basic task management</PricingFeature>
                <PricingFeature>Standard risk assessment templates</PricingFeature>
                <PricingFeature>Limited analytics</PricingFeature>
                <PricingFeature>Email support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactSales} className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
          
          {/* Professional Plan */}
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
                <span className="text-4xl font-bold">$499</span>
                <span className="text-muted-foreground ml-2">/ month per site</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Unlimited users</PricingFeature>
                <PricingFeature>Advanced AI violation detection</PricingFeature>
                <PricingFeature>Comprehensive task management</PricingFeature>
                <PricingFeature>Custom risk assessment templates</PricingFeature>
                <PricingFeature>Full analytics suite</PricingFeature>
                <PricingFeature>Paulie AI assistant</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactSales} className="w-full bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
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
                For organizations with complex compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-muted-foreground ml-2">pricing</span>
              </div>
              
              <ul className="space-y-3">
                <PricingFeature>Everything in Professional</PricingFeature>
                <PricingFeature>Multi-site management</PricingFeature>
                <PricingFeature>Custom AI model training</PricingFeature>
                <PricingFeature>API access</PricingFeature>
                <PricingFeature>SSO authentication</PricingFeature>
                <PricingFeature>Dedicated customer success manager</PricingFeature>
                <PricingFeature>SLA guarantees</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactSales} variant="outline" className="w-full">Contact Sales</Button>
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
