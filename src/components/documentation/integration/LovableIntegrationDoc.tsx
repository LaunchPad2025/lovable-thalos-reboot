
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
          <h3 className="text-xl font-semibold mb-3">Subscription Links</h3>
          <p className="mb-2 text-gray-300">
            Use these direct subscription links to connect Lovable users with Thalos subscription services:
          </p>
          <div className="bg-[#1a1f29] p-4 rounded-md mb-4">
            <div className="text-sm text-gray-300 overflow-x-auto">
              <p><strong>Basic Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=basic&redirect_url=https://lovable.ai/dashboard</Code></p>
              <p><strong>Pro Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=pro&redirect_url=https://lovable.ai/dashboard</Code></p>
              <p><strong>Premium Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=premium&redirect_url=https://lovable.ai/dashboard</Code></p>
              <p><strong>Enterprise Plan:</strong> <Code>https://thalostech.io/contact?plan=enterprise&redirect_url=https://lovable.ai/dashboard</Code></p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">URL Parameters</h3>
          <p className="mb-2 text-gray-300">
            The following URL parameters can be included when redirecting users:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left border border-gray-700">Parameter</th>
                  <th className="p-2 text-left border border-gray-700">Required</th>
                  <th className="p-2 text-left border border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-700">plan</td>
                  <td className="p-2 border border-gray-700">Yes</td>
                  <td className="p-2 border border-gray-700">One of: "basic", "pro", "premium", "enterprise"</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-700">redirect_url</td>
                  <td className="p-2 border border-gray-700">No</td>
                  <td className="p-2 border border-gray-700">URL where users will be redirected after successful signup/payment</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-700">user_email</td>
                  <td className="p-2 border border-gray-700">No</td>
                  <td className="p-2 border border-gray-700">Pre-fill the email field if you already have the user's email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/20 mt-6 mb-6">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertDescription className="text-blue-100">
            <strong>Important:</strong> Users do NOT need to create a Thalos account before subscribing. The API handles account creation automatically during checkout.
          </AlertDescription>
        </Alert>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Authentication Flow</h3>
          <ol className="space-y-2 list-decimal ml-6 text-gray-300">
            <li>Users will be directed to our custom signup page where they can create an account</li>
            <li>They'll proceed to Stripe checkout to complete payment</li>
            <li>After successful payment, they'll be redirected back to the URL specified in <Code className="text-xs">redirect_url</Code></li>
            <li>A secure token is generated and passed via the redirect: <Code className="text-xs">https://lovable.ai/dashboard?token=[secure_token]</Code></li>
            <li>This token can be used to automatically authenticate the user on your side</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Webhook Notifications</h3>
          <p className="mb-2 text-gray-300">
            We'll send webhook events to your endpoint for subscription events:
          </p>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <div className="text-sm text-gray-300 overflow-x-auto">
              <p><strong>URL:</strong> <Code>https://api.lovable.ai/webhooks/thalos</Code></p>
              <p><strong>Events:</strong> subscription.created, subscription.updated, subscription.canceled</p>
              <p><strong>Format:</strong> {`{event: string, userId: number, plan: string, data: object}`}</p>
            </div>
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
          <h3 className="text-xl font-semibold mb-3">Testing</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>Use the test environment at <Code className="text-xs">https://staging.thalostech.io/lovable-signup?plan=basic&test=true</Code></li>
            <li>This allows you to test the complete flow without actual charges</li>
            <li>Stripe test cards can be used in the test environment</li>
            <li>For Stripe test payments, use card <Code className="text-xs">4242 4242 4242 4242</Code></li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>For integration issues, contact our team at: <Code className="text-xs">contact@thalostech.io</Code></li>
            <li>Please include "Lovable Integration" in the subject line for faster routing</li>
          </ul>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/20 mt-6">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertDescription className="text-blue-100">
            The Enterprise plan links redirect to a contact form instead of direct checkout, allowing for custom pricing and feature discussions.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default LovableIntegrationDoc;
