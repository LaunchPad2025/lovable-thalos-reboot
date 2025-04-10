
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const RecommendedFeatures = () => {
  const handleUpgrade = () => {
    window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
  };
  
  const handleContactSales = () => {
    window.location.href = "https://cal.com/annieeser/30min";
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <h3 className="font-medium mb-1">Recommended Features</h3>
        <p className="text-gray-400 text-sm mb-4">Upgrade your plan to access these powerful safety compliance tools</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="simulation">Pro</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Available with Pro Plan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm font-medium">Risk Assessment</span>
            </div>
            <p className="text-gray-400 text-sm">Comprehensive risk assessment tools for your entire organization</p>
          </div>
          
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="simulation">Pro</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Available with Pro Plan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm font-medium">Advanced Analytics</span>
            </div>
            <p className="text-gray-400 text-sm">Detailed compliance analytics and reporting capabilities</p>
          </div>
          
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="simulation" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      Premium
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Available with Premium Plan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm font-medium">AI Remediation</span>
            </div>
            <p className="text-gray-400 text-sm">Automated AI-powered compliance remediation suggestions</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpgrade}>
            Upgrade Your Plan
          </Button>
          <Button className="w-full bg-transparent border border-gray-700 hover:bg-gray-800 text-white" onClick={handleContactSales}>
            Contact Sales
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedFeatures;
