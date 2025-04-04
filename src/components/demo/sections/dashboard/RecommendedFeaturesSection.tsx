
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecommendedFeaturesSection = () => {
  const handleUpgrade = () => {
    window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 mb-6">
      <CardContent className="p-6">
        <h3 className="font-medium text-white mb-2">Recommended Features</h3>
        <p className="text-gray-400 text-sm mb-6">Upgrade to access these powerful safety compliance tools</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#131820] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-900/30 text-blue-400 border border-blue-800/30 px-2 py-1 rounded-sm text-xs">Pro</span>
              <span className="text-sm font-medium text-white">Risk Assessment</span>
            </div>
            <p className="text-gray-400 text-sm">Comprehensive risk assessment tools for your entire organization</p>
          </div>
          
          <div className="bg-[#131820] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-900/30 text-blue-400 border border-blue-800/30 px-2 py-1 rounded-sm text-xs">Pro</span>
              <span className="text-sm font-medium text-white">Advanced Analytics</span>
            </div>
            <p className="text-gray-400 text-sm">Detailed compliance analytics and reporting capabilities</p>
          </div>
          
          <div className="bg-[#131820] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-purple-900/30 text-purple-400 border border-purple-800/30 px-2 py-1 rounded-sm text-xs">Enterprise</span>
              <span className="text-sm font-medium text-white">AI Remediation</span>
            </div>
            <p className="text-gray-400 text-sm">Automated AI-powered compliance remediation suggestions</p>
          </div>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpgrade}>
          Upgrade Your Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedFeaturesSection;
