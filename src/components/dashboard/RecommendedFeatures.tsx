
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecommendedFeatures = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <h3 className="font-medium mb-1">Recommended Features</h3>
        <p className="text-gray-400 text-sm mb-4">Contact our sales team to access these powerful safety compliance tools</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 opacity-75">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-900/30 text-blue-300 border border-blue-800 px-2 py-0.5 rounded text-xs">Pro</span>
              <span className="text-sm font-medium">Risk Assessment</span>
            </div>
            <p className="text-gray-400 text-sm">Comprehensive risk assessment tools for your entire organization</p>
          </div>
          
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 opacity-75">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-900/30 text-blue-300 border border-blue-800 px-2 py-0.5 rounded text-xs">Pro</span>
              <span className="text-sm font-medium">Advanced Analytics</span>
            </div>
            <p className="text-gray-400 text-sm">Detailed compliance analytics and reporting capabilities</p>
          </div>
          
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 opacity-75">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-purple-900/30 text-purple-300 border border-purple-800 px-2 py-0.5 rounded text-xs">Enterprise</span>
              <span className="text-sm font-medium">AI Remediation</span>
            </div>
            <p className="text-gray-400 text-sm">Automated AI-powered compliance remediation suggestions</p>
          </div>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = "https://cal.com/thalos-sales/30min"}>
          Contact Sales
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedFeatures;
