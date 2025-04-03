
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
  );
};

export default DirectApiIntegration;
