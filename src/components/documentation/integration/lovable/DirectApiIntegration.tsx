
import React from 'react';
import { Code } from "@/components/ui/code";

const DirectApiIntegration = () => {
  return (
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
              <p><strong>URL:</strong> <Code>https://thalostech.replit.app/api/subscribe</Code></p>
              <p><strong>Method:</strong> <Code>GET</Code> or <Code>POST</Code></p>
              <p><strong>Parameters:</strong></p>
              <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                {`{
  "email": "user@example.com",
  "name": "John Doe",
  "planId": "pro_monthly"  // See plan mapping below
}`}
              </pre>
              <p><strong>Plan Mapping:</strong></p>
              <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
                {`- Basic (annual): basic_annual
- Basic (monthly): basic_monthly
- Pro (annual): pro_annual
- Pro (monthly): pro_monthly
- Premium (annual): premium_annual
- Premium (monthly): premium_monthly`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2">Post-Subscription Flow</h4>
          <div className="bg-[#1a1f29] p-4 rounded-md">
            <div className="text-sm text-gray-300 overflow-x-auto">
              <p><strong>Description:</strong> After redirecting to our endpoint, the system will:</p>
              <ul className="list-disc ml-6 mt-1">
                <li>Check for an existing account (or create one if needed)</li>
                <li>Generate a Stripe Checkout session</li>
                <li>Redirect the user to Stripe for payment</li>
                <li>After successful payment, provision the user's environment</li>
                <li>Automatically log in the user and redirect to the dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectApiIntegration;
