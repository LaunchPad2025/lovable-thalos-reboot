
import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Industry } from './types';
import { Card, CardContent } from '@/components/ui/card';

interface IndustryUseCasesProps {
  industry: Industry;
}

const IndustryUseCases: React.FC<IndustryUseCasesProps> = ({ industry }) => {
  return (
    <section id="use-cases">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Use Cases for {industry.name}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how Thalos helps safety professionals in the {industry.name.toLowerCase()} sector 
          manage compliance and reduce risks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industry.useCases.map((useCase, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mb-4">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default IndustryUseCases;
