
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useIsProduction } from '@/hooks/useIsProduction';

const PaymentIntegrationTab = () => {
  const navigate = useNavigate();
  const isProduction = useIsProduction();

  // Function to redirect to plan selection
  const redirectToPlanSelection = (plan: string) => {
    // Example API call - would be replaced with real implementation
    const returnUrl = window.location.origin + '/dashboard';
    
    try {
      window.location.href = `https://thalos-safety.replit.app/api/lovable/select-plan?plan=${plan}&interval=monthly&returnUrl=${encodeURIComponent(returnUrl)}`;
    } catch (error) {
      console.error('Redirect error:', error);
      toast.error('Error redirecting to plan selection');
    }
  };

  // Mock function to get pricing information
  const getPricingData = async () => {
    try {
      // This would call the real API in production
      const response = await fetch('https://thalos-safety.replit.app/api/lovable/pricing', {
        headers: {
          'Authorization': `Bearer lovable_integration_org_123`
        }
      });
      
      const data = await response.json();
      toast.success('Retrieved pricing information');
      return data;
    } catch (error) {
      console.error('Pricing data error:', error);
      toast.error('Error retrieving pricing information');
      return null;
    }
  };

  // Function to handle subscription webhook
  const handleSubscriptionUpdated = async (subscriptionData: any) => {
    try {
      // This would call the real API in production
      await fetch('https://thalos-safety.replit.app/api/lovable/subscription-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer lovable_integration_org_123`
        },
        body: JSON.stringify(subscriptionData)
      });
      
      toast.success('Subscription information synced with Lovable');
    } catch (error) {
      console.error('Subscription sync error:', error);
      toast.error('Error syncing subscription data');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Payment & Subscription Integration</CardTitle>
        <CardDescription>
          Connect your Lovable app with Thalos payment processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Payment Options</h3>
          <p className="mb-4">Implement payment processing for your Lovable application:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#1a1f29] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Plan Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  Redirect users to our plan selection system for subscription setup.
                </p>
                <Button 
                  onClick={() => redirectToPlanSelection('pro')}
                  className="w-full"
                >
                  Test Plan Selection
                </Button>
                <div className="mt-3 text-xs text-blue-400">
                  <p className="font-medium">Example API Code:</p>
                  <pre className="mt-1 p-2 bg-gray-800 rounded text-gray-300 overflow-x-auto">
{`fetch('https://thalos-safety.replit.app/api/lovable/select-plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    plan: 'pro',           // 'basic', 'pro', 'premium'
    interval: 'monthly',   // 'monthly' or 'annual'
    email: 'user@example.com',  // Optional
    returnUrl: 'https://yourdomain.com/success'  // Required
  })
})`}
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1a1f29] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pricing API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  Fetch subscription pricing information for your app.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => getPricingData()}
                  className="w-full"
                >
                  Get Pricing Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Subscription Management</h3>
          <p className="mb-4">Tools to manage user subscriptions:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#1a1f29] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subscription Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  Check the status of a user's subscription.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => toast.success('Subscription status API is ready')}
                  className="w-full"
                >
                  Check Status API
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1a1f29] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Test Webhook</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  Test the subscription update webhook.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => handleSubscriptionUpdated({
                    user_id: 'test-user',
                    plan: 'premium',
                    status: 'active'
                  })}
                  className="w-full"
                >
                  Send Test Webhook
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-md">
          <h3 className="text-xl font-semibold mb-3">Important Integration Notes</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>The <strong>returnUrl</strong> parameter is required for all plan selection requests</li>
            <li>Use <strong>'monthly'</strong> or <strong>'annual'</strong> for billing intervals (not 'month' or 'year')</li>
            <li>Requests must come from allowed domains (<code>thalostech.io</code>, <code>www.thalostech.io</code>, or <code>localhost:3000</code>)</li>
            <li>For user lookup, the token is optional in development but required in production</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Implementation Guide</h3>
          <p className="mb-4">Follow these steps to implement the payment integration:</p>
          
          <ol className="space-y-2 list-decimal ml-6">
            <li>Configure your Lovable app to use our payment endpoints</li>
            <li>Implement the subscription webhook endpoint in your app</li>
            <li>Test the plan selection flow with different subscription plans</li>
            <li>Use the pricing API to display current subscription options</li>
          </ol>
          
          <div className="mt-4">
            <Button onClick={() => navigate('/documentation/pricing')}>
              View Pricing Plans
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegrationTab;
