
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-[#0d1117] border-b border-gray-800 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm">Overview of your safety compliance status</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Upgrade Plan
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Start Tour</span>
              </Button>
            </div>
          </div>
          
          <div className="flex mt-4">
            <Tabs defaultValue="personal" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2 bg-[#161b22]">
                <TabsTrigger value="personal" className="data-[state=active]:bg-[#1f2937]">
                  My Dashboard
                </TabsTrigger>
                <TabsTrigger value="organization" className="data-[state=active]:bg-[#1f2937]">
                  Organization
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
