
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, Info } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  features: string[];
  content: React.ReactNode;
}

interface FeatureInfoProps {
  featureInfo: Feature;
}

const FeatureInfo = ({ featureInfo }: FeatureInfoProps) => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20 mt-8">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Info className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{featureInfo.title}</h3>
          <p className="text-gray-300 mb-6">{featureInfo.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {featureInfo.features.map((feature, index) => (
              <Card key={index} className="bg-[#1a1f29] border-gray-800">
                <CardContent className="p-4 flex items-start">
                  <div className="mr-3 bg-blue-500/20 p-1 rounded-full mt-0.5">
                    <CheckSquare className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-200">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureInfo;
