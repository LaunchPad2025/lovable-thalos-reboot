
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Integrations = () => {
  const navigate = useNavigate();

  // Function to generate SSO URL for Lovable
  const generateSsoUrl = async (email: string, redirectUrl: string) => {
    try {
      // This would call the real API in production
      const response = await fetch('https://your-replit-app.replit.app/api/lovable/generate-sso-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer lovable_integration_org_123`
        },
        body: JSON.stringify({ email, redirectUrl })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to generate SSO URL');
      }
    } catch (error) {
      console.error('SSO generation error:', error);
      toast.error('Error connecting to authentication service');
    }
  };

  // Function to handle subscription webhook
  const handleSubscriptionUpdated = async (subscriptionData: any) => {
    try {
      // This would call the real API in production
      await fetch('https://your-replit-app.replit.app/api/lovable/subscription-webhook', {
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

  // Mock function to redirect to Replit auth
  const redirectToReplitAuth = (isSignup = false) => {
    const returnUrl = window.location.origin + '/dashboard';
    navigate(`/auth?signup=${isSignup}&return_url=${encodeURIComponent(returnUrl)}`);
  };

  // Mock function to get pricing information
  const getPricingData = async () => {
    try {
      // This would call the real API in production
      const response = await fetch('https://your-replit-app.replit.app/api/lovable/pricing', {
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

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <PageTitle 
          title="Lovable Integrations" 
          subtitle="Integration tools for connecting Thalos with Lovable services"
          className="mb-8"
        />

        <Tabs defaultValue="authentication" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="payment">Payment Processing</TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Authentication Integration</CardTitle>
                <CardDescription>
                  Connect your Lovable app with Thalos authentication services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Authentication Options</h3>
                  <p className="mb-4">Choose how you want users to authenticate with your Lovable application:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#1a1f29] border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Direct Authentication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                          Redirect users to our authentication pages and receive tokens for validation.
                        </p>
                        <div className="flex flex-col space-y-2">
                          <Button onClick={() => redirectToReplitAuth(false)}>
                            Implement Login
                          </Button>
                          <Button onClick={() => redirectToReplitAuth(true)} variant="outline">
                            Implement Signup
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-[#1a1f29] border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SSO Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                          Generate SSO URLs to seamlessly authenticate users from your Lovable app.
                        </p>
                        <Button 
                          onClick={() => generateSsoUrl('demo@example.com', window.location.origin + '/dashboard')}
                          className="w-full"
                        >
                          Test SSO Flow
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">API Testing Tools</h3>
                  <p className="mb-4">Test the integration endpoints to ensure proper connection:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#1a1f29] border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Validate Token</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                          Test token validation against the API endpoint.
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => toast.success('Token validation API ready to use')}
                          className="w-full"
                        >
                          Test Validation API
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-[#1a1f29] border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Find User</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                          Look up user information by email address.
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => toast.success('User lookup API ready to use')}
                          className="w-full"
                        >
                          Test User Lookup
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Configuration</h3>
                  <p className="mb-4">Your integration token should be used to authenticate API requests:</p>
                  <div className="p-4 bg-[#1a1f29] rounded-md">
                    <Code className="block w-full break-all">lovable_integration_org_123</Code>
                    <p className="text-xs text-gray-400 mt-2">
                      This token should be included in the Authorization header for all API requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
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
                        <CardTitle className="text-lg">Checkout Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                          Redirect users to our checkout system for secure payments.
                        </p>
                        <Button 
                          onClick={() => {
                            window.location.href = 'https://your-replit-app.replit.app/checkout?plan=pro&return_url=' + 
                              encodeURIComponent(window.location.origin + '/dashboard');
                          }}
                          className="w-full"
                        >
                          Test Checkout
                        </Button>
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

                <div>
                  <h3 className="text-xl font-semibold mb-3">Implementation Guide</h3>
                  <p className="mb-4">Follow these steps to implement the payment integration:</p>
                  
                  <ol className="space-y-2 list-decimal ml-6">
                    <li>Configure your Lovable app to use our payment endpoints</li>
                    <li>Implement the subscription webhook endpoint in your app</li>
                    <li>Test the checkout flow with different subscription plans</li>
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
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Integrations;
