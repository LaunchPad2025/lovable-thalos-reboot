
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLinkIcon } from "lucide-react";

const LovableIntegrationDoc = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Lovable Integration</CardTitle>
        <CardDescription>
          Complete integration guide for connecting Lovable with Thalos subscription services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">URL Parameters for Linking</h3>
          <p className="mb-2 text-gray-300">
            When creating "Subscribe Now" or "Get Started" buttons on Lovable that direct users to Thalos, 
            use the following URL format:
          </p>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <Code className="text-sm text-gray-300 overflow-x-auto">
              https://your-thalos-domain.com/lovable-signup?plan=PLAN_ID&return_url=RETURN_URL&email=USER_EMAIL
            </Code>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Required Parameters</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>
              <strong>plan</strong> - The subscription plan ID (required)
              <ul className="ml-6 mt-1 list-disc">
                <li>Valid values: basic, pro, premium, or enterprise</li>
                <li>Example: <Code className="text-xs">plan=pro</Code></li>
              </ul>
            </li>
            <li>
              <strong>return_url</strong> - The URL to return to after signup (optional)
              <ul className="ml-6 mt-1 list-disc">
                <li>This should be a URL on the Lovable domain</li>
                <li>Example: <Code className="text-xs">return_url=https://lovable-website.com/thank-you</Code></li>
              </ul>
            </li>
            <li>
              <strong>email</strong> - Pre-fill the user's email (optional)
              <ul className="ml-6 mt-1 list-disc">
                <li>If you have the user's email, include it to pre-populate the form</li>
                <li>Example: <Code className="text-xs">email=user@example.com</Code></li>
              </ul>
            </li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Example Links</h3>
          <div className="space-y-2">
            <p className="font-medium text-gray-300">For Basic Plan:</p>
            <div className="bg-[#1a1f29] p-3 rounded-md">
              <Code className="text-sm text-gray-300 overflow-x-auto">
                https://your-thalos-domain.com/lovable-signup?plan=basic&return_url=https://lovable-website.com/thank-you
              </Code>
            </div>
            
            <p className="font-medium text-gray-300 mt-4">For Pro Plan with email:</p>
            <div className="bg-[#1a1f29] p-3 rounded-md">
              <Code className="text-sm text-gray-300 overflow-x-auto">
                https://your-thalos-domain.com/lovable-signup?plan=pro&email=user@example.com&return_url=https://lovable-website.com/thank-you
              </Code>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Authentication Token Return</h3>
          <p className="text-gray-300">
            If you include a return_url, Thalos will append an auth_token parameter when redirecting back to Lovable:
          </p>
          <div className="bg-[#1a1f29] p-3 rounded-md mt-2">
            <Code className="text-sm text-gray-300 overflow-x-auto">
              https://lovable-website.com/thank-you?auth_token=TOKEN_VALUE
            </Code>
          </div>
          <p className="text-gray-300 mt-2">
            You can use this token for SSO authentication with Thalos APIs.
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">API Verification Endpoint</h3>
          <p className="text-gray-300 mb-2">
            To verify a token or find a user by email, use the following endpoint:
          </p>
          <div className="bg-[#1a1f29] p-3 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`POST /api/lovable/find-user
{
  "token": "lovable_integration_token",
  "email": "user@example.com"
}`}
            </pre>
          </div>
          <p className="text-gray-300 mt-2">
            The response will include user information if the user exists, or a 404 if not found.
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Security Notes</h3>
          <ul className="space-y-1 list-disc ml-6 text-gray-300">
            <li>Thalos validates return URLs against an allowlist of domains:
              <ul className="ml-6 mt-1 list-disc">
                <li>'localhost'</li>
                <li>'thalos-safety.com'</li>
                <li>'lovable-website.com'</li>
                <li>'thalostech.io'</li>
              </ul>
            </li>
            <li>Token validation requires a valid integration token for production environments</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Plan Features</h3>
          <p className="text-gray-300 mb-2">
            The LovableSignup page will display different features based on the plan parameter:
          </p>
          <ul className="space-y-1 list-disc ml-6 text-gray-300">
            <li><strong>Basic Plan:</strong> 10 AI Safety Checks/month, Basic compliance reports, 1 industry profile</li>
            <li><strong>Pro Plan:</strong> 50 AI Safety Checks/month, Advanced reports, 2 industry profiles, Task management</li>
            <li><strong>Premium Plan:</strong> 250 AI Safety Checks/month, Advanced reports, All industry profiles, API access</li>
            <li><strong>Enterprise Plan:</strong> Unlimited AI Safety Checks, Custom reports, All features, Dedicated support</li>
          </ul>
        </div>

        <Alert className="bg-amber-500/10 border-amber-500/20 mt-6">
          <ExternalLinkIcon className="h-5 w-5 text-amber-500" />
          <AlertDescription className="text-amber-100">
            For implementation assistance or integration issues, please contact our developer support at 
            <a href="mailto:dev-support@thalostech.io" className="underline ml-1 text-amber-300">dev-support@thalostech.io</a>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default LovableIntegrationDoc;
