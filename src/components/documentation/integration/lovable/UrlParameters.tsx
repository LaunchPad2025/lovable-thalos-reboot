
import React from 'react';

const UrlParameters = () => {
  return (
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
  );
};

export default UrlParameters;
