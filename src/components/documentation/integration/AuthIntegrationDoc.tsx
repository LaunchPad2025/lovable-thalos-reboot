
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
            <li><strong>Generate Login Link:</strong> POST /api/auth/generate-login-link</li>
            <li><strong>Token validation:</strong> GET /api/validate-token</li>
            <li><strong>Direct login:</strong> GET /api/direct-login?token=xxx</li>
            <li><strong>User lookup by email:</strong> POST /api/lovable/find-user</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Direct Login Authentication Flow</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>Step 1:</strong> Generate a direct login link by sending user information to /api/auth/generate-login-link</li>
            <li><strong>Step 2:</strong> Redirect users to the returned loginUrl</li>
            <li><strong>Step 3:</strong> Upon successful authentication, users will be redirected to the specified returnUrl</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Required Parameters</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "userId": 123,
  "username": "user_from_lovable",
  "email": "user@example.com", 
  "subscriptionPlan": "basic",  // or the selected plan
  "returnUrl": "https://thalos-safety.com/dashboard"  // optional redirect path
}`}
            </pre>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Response Data</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "loginUrl": "https://thalos-safety.com/direct-login?token=xxx&redirect=/dashboard",
  "token": "jwt_token_string",
  "expiresIn": "24 hours"
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
