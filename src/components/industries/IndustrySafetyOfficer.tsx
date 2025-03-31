
import React from 'react';
import { HardHat, CheckCircle } from 'lucide-react';
import { Industry } from './types';
import { Card, CardContent } from '@/components/ui/card';

interface IndustrySafetyOfficerProps {
  industry: Industry;
}

const IndustrySafetyOfficer: React.FC<IndustrySafetyOfficerProps> = ({ industry }) => {
  return (
    <section id="safety-officer" className="pt-8">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
              <HardHat className="mr-2 h-4 w-4" />
              For Safety Officers
            </div>
            <h2 className="text-3xl font-bold mb-4">How Thalos Empowers {industry.name} Safety Officers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Safety professionals in the {industry.name.toLowerCase()} industry face unique challenges. 
              See how Thalos transforms your daily operations.
            </p>
          </div>

          <div className="space-y-4">
            {industry.safetyOfficerBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <Card className="border border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">A Day in the Life: {industry.name} Safety Officer</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  See how Thalos transforms the workday for safety professionals in {industry.name.toLowerCase()}.
                </p>
              </div>

              <div className="space-y-6">
                {industry.dayInLife.map((item, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4 ml-2">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{item.time}</div>
                    <h4 className="font-medium mb-1">{item.activity}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium text-blue-600 dark:text-blue-400">With Thalos:</span> {item.withThalos}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IndustrySafetyOfficer;
