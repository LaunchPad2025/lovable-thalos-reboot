
import React from 'react';

const CustomerFlow = () => {
  return (
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
  );
};

export default CustomerFlow;
