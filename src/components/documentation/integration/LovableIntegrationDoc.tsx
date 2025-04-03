
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLinkIcon, InfoIcon } from "lucide-react";

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
          <h3 className="text-xl font-semibold mb-3">Direct Subscription API</h3>
          <p className="mb-2 text-gray-300">
            Use the direct subscription API endpoint to integrate Lovable with Thalos subscription services:
          </p>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <Code className="text-sm text-gray-300 overflow-x-auto">
              POST https://thalostech.io/api/direct-subscription
            </Code>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Request Format</h3>
          <p className="mb-2 text-gray-300">
            Here's an example of how to call the API:
          </p>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`const response = await fetch('https://thalostech.io/api/direct-subscription', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    name: 'Customer Name',
    plan: 'pro',  // 'basic', 'pro', 'premium', or 'enterprise'
    interval: 'month'  // 'month' or 'year'
  })
});

const data = await response.json();

if (data.success) {
  // For regular plans (basic, pro, premium)
  if (data.checkoutUrl) {
    window.location.href = data.checkoutUrl;
  }
  // For enterprise plan
  else if (data.contactUrl) {
    window.location.href = data.contactUrl;
  }
} else {
  // Handle error
  console.error(data.message);
}`}
            </pre>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Plan Information</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left border border-gray-700">Plan</th>
                  <th className="p-2 text-left border border-gray-700">Monthly Price</th>
                  <th className="p-2 text-left border border-gray-700">Annual Price</th>
                  <th className="p-2 text-left border border-gray-700">Features</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-700">Basic</td>
                  <td className="p-2 border border-gray-700">$49</td>
                  <td className="p-2 border border-gray-700">$499</td>
                  <td className="p-2 border border-gray-700">50 safety checks/month</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-700">Pro</td>
                  <td className="p-2 border border-gray-700">$149</td>
                  <td className="p-2 border border-gray-700">$1499</td>
                  <td className="p-2 border border-gray-700">100 safety checks/month</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-700">Premium</td>
                  <td className="p-2 border border-gray-700">$249</td>
                  <td className="p-2 border border-gray-700">$2499</td>
                  <td className="p-2 border border-gray-700">250 safety checks/month</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-700">Enterprise</td>
                  <td className="p-2 border border-gray-700" colSpan={2}>Custom pricing</td>
                  <td className="p-2 border border-gray-700">500+ safety checks/month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Post-Checkout Flow</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>After successful payment, Stripe will automatically redirect to the success URL</li>
            <li>The user will be automatically logged in to Thalos (no additional authentication needed)</li>
            <li>No action required from Lovable for post-checkout handling</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Testing</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>Use <Code className="text-xs">test@example.com</Code> as a test email</li>
            <li>In development, mock checkout is available by setting <Code className="text-xs">USE_MOCK_CHECKOUT=true</Code></li>
            <li>Use the provided JavaScript test script in <Code className="text-xs">docs/lovable-integration-test.js</Code></li>
            <li>For Stripe test payments, use card <Code className="text-xs">4242 4242 4242 4242</Code></li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Error Handling</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>Check for <Code className="text-xs">success: false</Code> in the API response</li>
            <li>Display error messages from <Code className="text-xs">message</Code> field</li>
            <li>For network errors, provide a fallback contact form</li>
          </ul>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/20 mt-6">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertDescription className="text-blue-100">
            Security is handled via Stripe checkout verification. No separate API key is needed as the Thalos API handles user creation, authentication, and subscription management.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default LovableIntegrationDoc;
