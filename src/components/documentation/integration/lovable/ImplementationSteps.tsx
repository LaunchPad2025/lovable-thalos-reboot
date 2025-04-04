
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
      name: userData.name,
      plan: userData.plan,  // e.g., "basic"
      interval: userData.interval  // e.g., "monthly"
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
          <strong>Supported Plan Types:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Plans: basic, pro, premium, enterprise</li>
            <li>Intervals: monthly, yearly</li>
            <li>Note: Enterprise plan will redirect to contact page</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default ImplementationSteps;
