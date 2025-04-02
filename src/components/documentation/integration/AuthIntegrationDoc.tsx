
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";

const AuthIntegrationDoc = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Authentication Integration</CardTitle>
        <CardDescription>
          Secure authentication methods for integrating Thalos with Lovable services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Endpoints</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>Login:</strong> POST /api/login</li>
            <li><strong>Signup:</strong> POST /api/signup</li>
            <li><strong>Token validation:</strong> GET /api/validate-token</li>
            <li><strong>SSO redirect:</strong> GET /api/lovable/sso</li>
            <li><strong>SSO URL generation:</strong> POST /api/lovable/generate-sso-url</li>
            <li><strong>User lookup by email:</strong> POST /api/lovable/find-user</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Authentication Flow</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>Direct login/signup:</strong> Submit credentials to /api/login or /api/signup with a return_url parameter to receive an auth_token for redirection.</li>
            <li><strong>SSO flow:</strong> Generate an SSO URL with /api/lovable/generate-sso-url and redirect users there.</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Required Parameters</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>For login:</strong> username, password, optional return_url</li>
            <li><strong>For signup:</strong> username, email, password, optional return_url</li>
            <li><strong>For SSO URL generation:</strong> email, redirectUrl, token (Lovable integration token)</li>
            <li><strong>For user lookup:</strong> email, token (token is optional in development but required in production)</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Response Data After Authentication</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "user": {
    "id": 123,
    "username": "user123",
    "email": "user@example.com",
    "subscriptionPlan": "basic",
    "analysesRemaining": 50,
    "fullName": "John Doe",
    "organizationId": 1
  },
  "token": "jwt_token_here",
  "message": "Login successful"
}`}
            </pre>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Integration Token</h3>
          <p className="text-gray-300">
            For secured endpoints, Lovable must provide a valid integration token in the format 
            <Code className="mx-2">lovable_integration_org_{'{organizationId}'}</Code>. 
            This token verifies that requests are coming from authorized Lovable services.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthIntegrationDoc;
