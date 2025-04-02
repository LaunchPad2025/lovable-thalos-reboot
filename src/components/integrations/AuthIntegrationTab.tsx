
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useIsProduction } from '@/hooks/useIsProduction';

const AuthIntegrationTab = () => {
  const navigate = useNavigate();
  const isProduction = useIsProduction();

  // Function to generate SSO URL for Lovable
  const generateSsoUrl = async (email: string, redirectUrl: string) => {
    try {
      // This would call the real API in production
      const response = await fetch('https://thalos-safety.replit.app/api/lovable/generate-sso-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isProduction && {'Authorization': `Bearer lovable_integration_org_123`})
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

  // Function to lookup user by email
  const lookupUserByEmail = async (email: string) => {
    try {
      // This would call the real API in production
      const response = await fetch('https://thalos-safety.replit.app/api/lovable/find-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isProduction && {'Authorization': `Bearer lovable_integration_org_123`})
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      if (data.user) {
        toast.success('User found successfully');
        return data.user;
      } else {
        toast.error('User not found');
        return null;
      }
    } catch (error) {
      console.error('User lookup error:', error);
      toast.error('Error looking up user');
      return null;
    }
  };

  // Mock function to redirect to Replit auth
  const redirectToReplitAuth = (isSignup = false) => {
    const returnUrl = window.location.origin + '/dashboard';
    navigate(`/auth?signup=${isSignup}&return_url=${encodeURIComponent(returnUrl)}`);
  };

  return (
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
                  onClick={() => lookupUserByEmail('demo@example.com')}
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
          <p className="mb-4">Your integration token should be used to authenticate API requests in production:</p>
          <div className="p-4 bg-[#1a1f29] rounded-md">
            <Code className="block w-full break-all">lovable_integration_org_123</Code>
            <p className="text-xs text-gray-400 mt-2">
              This token should be included in the Authorization header for all API requests when in production mode.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthIntegrationTab;
