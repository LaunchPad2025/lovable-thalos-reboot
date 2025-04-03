
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
          <h3 className="text-xl font-semibold mb-3">Direct API Integration (New)</h3>
          <p className="mb-2 text-gray-300">
            Alternatively, you can use our direct API endpoints for a more customized integration:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">Direct Subscription Endpoint</h4>
              <div className="bg-[#1a1f29] p-4 rounded-md">
                <div className="text-sm text-gray-300 overflow-x-auto">
                  <p><strong>URL:</strong> <Code>https://2251c125-3707-4acd-b4ff-f15472580dbb-00-27u5i9s18md93.picard.replit.dev/api/lovable/simplified-direct-subscription</Code></p>
                  <p><strong>Method:</strong> <Code>POST</Code></p>
                  <p><strong>Headers:</strong> <Code>Content-Type: application/json</Code></p>
                  <p><strong>Body:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "email": "[customer_email]",
  "name": "[customer_name]",
  "company": "[company_name]",
  "plan": "[basic|pro|premium|enterprise]",
  "billingCycle": "[monthly|annual]"
}`}
                  </pre>
                  <p><strong>Success Response:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "success": true,
  "url": "[stripe_checkout_url]"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Direct Login Endpoint</h4>
              <div className="bg-[#1a1f29] p-4 rounded-md">
                <div className="text-sm text-gray-300 overflow-x-auto">
                  <p><strong>URL:</strong> <Code>https://2251c125-3707-4acd-b4ff-f15472580dbb-00-27u5i9s18md93.picard.replit.dev/api/auth/simplified-direct-login</Code></p>
                  <p><strong>Method:</strong> <Code>POST</Code></p>
                  <p><strong>Headers:</strong> <Code>Content-Type: application/json</Code></p>
                  <p><strong>Body:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "email": "[customer_email]",
  "token": "[token_from_subscription_response]"
}`}
                  </pre>
                  <p><strong>Success Response:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "success": true,
  "token": "[jwt_token]"
}`}
                  </pre>
                </div>
              </div>
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
          <h3 className="text-xl font-semibold mb-3">Customer Flow</h3>
          <ol className="space-y-2 list-decimal ml-6 text-gray-300">
            <li>Lovable should collect customer information (email, name, company)</li>
            <li>Customer selects a plan (basic, pro, premium, enterprise) and billing cycle (monthly, annual)</li>
            <li>Call the direct subscription endpoint to get a Stripe checkout URL</li>
            <li>Redirect the customer to the Stripe checkout URL</li>
            <li>After payment, Stripe will redirect the customer back to your success page</li>
            <li>The success page will automatically log the customer in and redirect to their dashboard</li>
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
              <p><strong>Events:</strong> checkout.session.completed, customer.subscription.updated, customer.subscription.deleted</p>
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
            <li>You can test the integration flow with Stripe's test cards</li>
            <li>For successful payments: Card number <Code>4242 4242 4242 4242</Code>, any future expiration date, any CVC, any postal code</li>
            <li>For failed payments: Card number <Code>4000 0000 0000 0002</Code></li>
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
