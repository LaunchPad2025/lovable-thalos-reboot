
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PaymentIntegrationDoc = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Payment Processing Integration</CardTitle>
        <CardDescription>
          Payment and subscription management between Thalos and Lovable
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Endpoints</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>Create payment intent:</strong> POST /api/create-payment-intent</li>
            <li><strong>Select plan:</strong> POST /api/lovable/select-plan</li>
            <li><strong>Pricing information:</strong> GET /api/lovable/pricing</li>
            <li><strong>Subscription management:</strong> POST /api/update-subscription</li>
            <li><strong>Cancel subscription:</strong> POST /api/cancel-subscription</li>
            <li><strong>Subscription status:</strong> GET /api/subscription-status</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Plan Selection Flow</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li>Lovable redirects users to our plan selection endpoint</li>
            <li>Our system handles payment processing through our backend</li>
            <li>After successful payment, user is redirected back to Lovable</li>
          </ul>
          <div className="mt-4 p-4 bg-[#1a1f29] rounded-md">
            <p className="text-sm font-medium mb-2">Example API call:</p>
            <pre className="text-xs text-gray-300 overflow-x-auto">
{`fetch('https://thalos-safety.replit.app/api/lovable/select-plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    plan: 'pro',           // 'basic', 'pro', 'premium', or 'enterprise'
    interval: 'monthly',   // 'monthly' or 'annual' (not 'month' or 'year')
    email: 'customer@example.com',  // Optional
    returnUrl: 'https://thalostech.io/success'  // Required
  })
})`}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800 rounded-md">
            <p className="text-sm font-medium mb-2 text-blue-400">Important Note:</p>
            <p className="text-sm text-gray-300">Requests must come from an allowed domain:</p>
            <ul className="list-disc ml-6 text-sm text-gray-300">
              <li>https://www.thalostech.io</li>
              <li>https://thalostech.io</li>
              <li>http://localhost:3000</li>
            </ul>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Webhooks</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li><strong>Payment success:</strong> POST /api/webhooks/stripe (Stripe sends events here)</li>
            <li><strong>Subscription updated:</strong> POST /api/lovable/subscription-webhook (We notify Lovable)</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Subscription Management</h3>
          <ul className="space-y-2 list-disc ml-6">
            <li>Users can upgrade/downgrade plans through our interface</li>
            <li>Cancellations require contacting support or using the dashboard</li>
            <li>Subscription updates are effective immediately with prorated billing</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3">Pricing Plans Response Example</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "free": {
    "name": "Free",
    "priceMonthly": 0,
    "priceAnnual": 0,
    "features": ["5 safety checks per month", "Basic violation detection", "Email support"]
  },
  "basic": {
    "name": "Basic",
    "priceMonthly": 49,
    "priceAnnual": 499,
    "features": ["50 safety checks per month", "Advanced violation detection", "Industry-specific regulations"]
  },
  "premium": {
    "name": "Premium",
    "priceMonthly": 149,
    "priceAnnual": 1499,
    "features": ["500 safety checks per month", "Advanced violation detection with ML", "Custom regulation profiles"]
  },
  "enterprise": {
    "name": "Enterprise",
    "priceMonthly": 499,
    "priceAnnual": 4999,
    "features": ["Unlimited safety checks", "Custom ML model training", "Dedicated account manager"]
  }
}`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegrationDoc;
