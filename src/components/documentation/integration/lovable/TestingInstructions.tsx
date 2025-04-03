
import React from 'react';
import { Code } from "@/components/ui/code";

const TestingInstructions = () => {
  return (
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
  );
};

export default TestingInstructions;
