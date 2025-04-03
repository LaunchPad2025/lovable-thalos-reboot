
import React from 'react';

const PlanInformation = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Plan Information</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 text-left border border-gray-700">Plan</th>
              <th className="p-2 text-left border border-gray-700">Monthly Price</th>
              <th className="p-2 text-left border border-gray-700">Annual Price</th>
              <th className="p-2 text-left border border-gray-700">Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-700">Basic</td>
              <td className="p-2 border border-gray-700">$49</td>
              <td className="p-2 border border-gray-700">$499</td>
              <td className="p-2 border border-gray-700">50 safety checks/month</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Pro</td>
              <td className="p-2 border border-gray-700">$149</td>
              <td className="p-2 border border-gray-700">$1499</td>
              <td className="p-2 border border-gray-700">100 safety checks/month</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Premium</td>
              <td className="p-2 border border-gray-700">$249</td>
              <td className="p-2 border border-gray-700">$2499</td>
              <td className="p-2 border border-gray-700">250 safety checks/month</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Enterprise</td>
              <td className="p-2 border border-gray-700" colSpan={2}>Custom pricing</td>
              <td className="p-2 border border-gray-700">500+ safety checks/month</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanInformation;
