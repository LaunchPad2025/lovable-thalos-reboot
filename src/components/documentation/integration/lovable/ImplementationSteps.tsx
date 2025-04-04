
import React from 'react';

const ImplementationSteps = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Implementation Steps</h3>
      <ol className="space-y-2 list-decimal ml-6 text-gray-300">
        <li>
          <strong>Update Purchase Flow:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Add Thalos subscription buttons to your marketing pages</li>
            <li>Implement a form to collect user information (email, name)</li>
            <li>Add subscription plan selection</li>
          </ul>
        </li>
        <li>
          <strong>Update API Integration:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Redirect users to the Replit subscription endpoint</li>
            <li>Pass required parameters (email, name, planId)</li>
            <li>Let Replit handle all account and payment processing</li>
          </ul>
        </li>
        <li>
          <strong>Example Implementation:</strong>
          <pre className="bg-[#131720] p-3 rounded my-2 overflow-x-auto">
            {`// Function to handle subscription creation
function redirectToSubscription(userData) {
  // Build the URL with query parameters
  const baseUrl = 'https://thalostech.replit.app/api/subscribe';
  const params = new URLSearchParams({
    email: userData.email,
    name: userData.name,
    planId: \`\${userData.plan}_\${userData.interval}\`  // e.g., "pro_monthly"
  });
  
  // Redirect the user
  window.location.href = \`\${baseUrl}?\${params.toString()}\`;
}`}
          </pre>
        </li>
        <li>
          <strong>Supported Plan Types:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Plans: basic, pro, premium</li>
            <li>Intervals: monthly, annual</li>
            <li>Note: All account creation and payment processing is now handled by Replit</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default ImplementationSteps;
