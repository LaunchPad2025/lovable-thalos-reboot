
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, FileText, HelpCircle } from 'lucide-react';
import DemoCard from '../DemoCard';
import { Link } from 'react-router-dom';

interface DashboardSectionProps {
  onShowFeatureInfo: () => void;
}

const DashboardSection = ({ onShowFeatureInfo }: DashboardSectionProps) => {
  // Get current year for due dates
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-400 text-sm">Overview of your safety compliance status</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upgrade Plan
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 flex items-center" 
            size="icon"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Start Tour</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="my-dashboard" className="mb-6">
        <TabsList className="bg-[#0d1117] border border-gray-800 rounded-md">
          <TabsTrigger value="my-dashboard" className="data-[state=active]:bg-[#1a1f29]">
            My Dashboard
          </TabsTrigger>
          <TabsTrigger value="organization" className="data-[state=active]:bg-[#1a1f29]">
            Organization
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Free Trial Banner */}
      <Card className="bg-[#0d1117] border-gray-800 mb-6">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h3 className="font-medium text-white">Free Trial Mode</h3>
            <p className="text-gray-400 text-sm">Unlock all safety compliance features by upgrading to a paid plan</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-3 sm:mt-0">
            View Plans & Upgrade
          </Button>
        </CardContent>
      </Card>
      
      {/* Welcome Section */}
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Welcome back, Hal Spencer!</h2>
        <p className="text-gray-400">Here's an overview of your safety compliance status and tasks</p>
      </div>
      
      {/* Stats Cards - 3 column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#0d1117] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium text-gray-300">Compliance Score</h3>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-green-500 text-sm">+5% from last month</div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Your compliance score is good. Keep up the good work!
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0d1117] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-medium text-gray-300">Upcoming Tasks</h3>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-yellow-500 text-sm">2 due soon</div>
            </div>
            <div className="mt-4">
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
                View all tasks
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0d1117] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium text-gray-300">Recent Incidents</h3>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-red-500 text-sm">This month</div>
            </div>
            <div className="mt-4">
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
                View incident reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#0d1117] border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Priority Tasks</h3>
              <div className="text-xs text-gray-400">Limited to 3 <span className="bg-gray-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-sm text-xs ml-1">Free</span></div>
            </div>
            
            <div className="space-y-3">
              <div className="border-b border-gray-800 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white">Update emergency evacuation plan</p>
                    <p className="text-gray-400 text-sm mt-1">Due: 12/19/{currentYear}</p>
                  </div>
                  <span className="bg-red-900/30 text-red-400 border border-red-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                    High
                  </span>
                </div>
              </div>
              
              <div className="border-b border-gray-800 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white">Complete monthly safety inspection</p>
                    <p className="text-gray-400 text-sm mt-1">Due: 12/14/{currentYear}</p>
                  </div>
                  <span className="bg-yellow-900/30 text-yellow-400 border border-yellow-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                    Medium
                  </span>
                </div>
              </div>
              
              <div className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white">Address hazardous materials storage violation</p>
                    <p className="text-gray-400 text-sm mt-1">Due: 12/17/{currentYear}</p>
                  </div>
                  <span className="bg-red-900/30 text-red-400 border border-red-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                    Critical
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0d1117] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-gray-400" />
              <h3 className="font-medium text-white">Recent Documents</h3>
              <span className="bg-purple-900/30 text-purple-400 border border-purple-800/30 px-2 py-0.5 rounded-sm text-xs ml-1">Pro+</span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-gray-400 text-sm mb-4">Document management is available on Professional and Enterprise plans</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommended Features */}
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
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Upgrade Your Plan
          </Button>
        </CardContent>
      </Card>
      
      <DemoCard message="You're viewing simulated data for demonstration purposes" />
    </>
  );
};

export default DashboardSection;
