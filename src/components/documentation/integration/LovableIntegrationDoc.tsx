
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
          <h3 className="text-xl font-semibold mb-3">Direct API Integration (Updated)</h3>
          <p className="mb-2 text-gray-300">
            Alternatively, you can use our direct API endpoints for a more customized integration:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">Direct Subscription Endpoint</h4>
              <div className="bg-[#1a1f29] p-4 rounded-md">
                <div className="text-sm text-gray-300 overflow-x-auto">
                  <p><strong>URL:</strong> <Code>https://[your-deployment-url]/api/lovable/direct-subscription</Code></p>
                  <p><strong>Method:</strong> <Code>POST</Code></p>
                  <p><strong>Headers:</strong> <Code>Content-Type: application/json</Code></p>
                  <p><strong>Body:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "email": "[customer_email]",
  "password": "[customer_password]",
  "firstName": "[customer_first_name]",
  "lastName": "[customer_last_name]",
  "company": "[company_name]",
  "planId": "[basic-monthly|basic-yearly|pro-monthly|pro-yearly|premium-monthly|premium-yearly|enterprise-monthly|enterprise-yearly]"
}`}
                  </pre>
                  <p><strong>Success Response:</strong></p>
                  <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                    {`{
  "success": true,
  "token": "[jwt_token]",
  "redirectUrl": "[stripe_checkout_url]"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Auto-Login Endpoint</h4>
              <div className="bg-[#1a1f29] p-4 rounded-md">
                <div className="text-sm text-gray-300 overflow-x-auto">
                  <p><strong>URL:</strong> <Code>https://[your-deployment-url]/direct-login?token=[JWT_TOKEN]</Code></p>
                  <p><strong>Method:</strong> <Code>GET (via redirect)</Code></p>
                  <p><strong>Description:</strong> This endpoint allows seamless authentication for users coming from Lovable after payment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Implementation Steps</h3>
          <ol className="space-y-2 list-decimal ml-6 text-gray-300">
            <li>
              <strong>Update Purchase Flow:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>Add Thalos subscription buttons to your marketing pages</li>
                <li>Implement a form to collect user information (email, password, first name, last name, company)</li>
                <li>Add subscription plan selection</li>
              </ul>
            </li>
            <li>
              <strong>Update API Integration:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>Modify API calls to use the direct subscription endpoint</li>
                <li>Store the returned JWT token</li>
                <li>Update redirect logic to use the auto-login URL</li>
              </ul>
            </li>
            <li>
              <strong>Example Implementation:</strong>
              <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                {`// Function to handle subscription creation
async function subscribeToPlatform(userData) {
  const response = await fetch('https://[your-deployment-url]/api/lovable/direct-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      planId: userData.planId  // e.g., "basic-monthly"
    })
  });
  const data = await response.json();
  
  if (data.success) {
    // Store token for future use
    localStorage.setItem('thalosToken', data.token);
    
    // Redirect to the auto-login URL
    window.location.href = data.redirectUrl;
  } else {
    // Handle error
    displayError(data.message);
  }
}`}
              </pre>
            </li>
            <li>
              <strong>Update Subscription Plan IDs:</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>basic-monthly</li>
                <li>basic-yearly</li>
                <li>pro-monthly</li>
                <li>pro-yearly</li>
                <li>premium-monthly</li>
                <li>premium-yearly</li>
                <li>enterprise-monthly</li>
                <li>enterprise-yearly</li>
              </ul>
            </li>
          </ol>
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
            <li>Lovable collects customer information (email, password, name, company)</li>
            <li>Customer selects a plan (basic, pro, premium, enterprise) and billing cycle (monthly, annual)</li>
            <li>Call the direct subscription endpoint to create user account and get Stripe checkout URL</li>
            <li>Redirect the customer to the Stripe checkout URL</li>
            <li>After payment, Stripe will redirect the customer back to the auto-login URL</li>
            <li>The customer will be automatically logged in and redirected to their dashboard</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Testing Before Going Live</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>Test the subscription flow with test credentials</li>
            <li>Verify automatic login functionality</li>
            <li>Confirm subscription plan creation in Stripe</li>
            <li>Test the redirect back to the dashboard</li>
            <li>For successful payments: Card number <Code>4242 4242 4242 4242</Code>, any future expiration date, any CVC, any postal code</li>
            <li>For failed payments: Card number <Code>4000 0000 0000 0002</Code></li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Documentation Updates</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>Update documentation to include the new subscription options</li>
            <li>Add information on how users can access their Thalos dashboard</li>
            <li>Include support contact information for Thalos-related inquiries</li>
          </ul>
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

        <Alert className="bg-blue-500/10 border-blue-500/20 mt-6">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertDescription className="text-blue-100">
            The Enterprise plan links redirect to a contact form instead of direct checkout, allowing for custom pricing and feature discussions.
          </AlertDescription>
        </Alert>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 list-disc ml-6 text-gray-300">
            <li>For integration issues, contact our team at: <Code className="text-xs">contact@thalostech.io</Code></li>
            <li>Please include "Lovable Integration" in the subject line for faster routing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LovableIntegrationDoc;
