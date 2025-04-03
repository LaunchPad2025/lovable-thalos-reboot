
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
          <p><strong>Basic Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=basic&redirect_url=https://lovable.ai/dashboard</Code></p>
          <p><strong>Pro Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=pro&redirect_url=https://lovable.ai/dashboard</Code></p>
          <p><strong>Premium Plan:</strong> <Code>https://thalostech.io/lovable-signup?plan=premium&redirect_url=https://lovable.ai/dashboard</Code></p>
          <p><strong>Enterprise Plan:</strong> <Code>https://thalostech.io/contact?plan=enterprise&redirect_url=https://lovable.ai/dashboard</Code></p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionLinks;
