
import React from 'react';
import { Code } from "@/components/ui/code";

const SubscriptionLinks = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Subscription Links</h3>
      <p className="mb-2 text-gray-300">
        Use these direct subscription links to connect Lovable users with Thalos subscription services:
      </p>
      <div className="bg-[#1a1f29] p-4 rounded-md mb-4">
        <div className="text-sm text-gray-300 overflow-x-auto">
          <p><strong>Basic Plan (Monthly):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=basic_monthly</Code></p>
          <p><strong>Basic Plan (Annual):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=basic_annual</Code></p>
          <p><strong>Pro Plan (Monthly):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=pro_monthly</Code></p>
          <p><strong>Pro Plan (Annual):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=pro_annual</Code></p>
          <p><strong>Premium Plan (Monthly):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=premium_monthly</Code></p>
          <p><strong>Premium Plan (Annual):</strong> <Code>https://thalostech.replit.app/api/subscribe?planId=premium_annual</Code></p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionLinks;
