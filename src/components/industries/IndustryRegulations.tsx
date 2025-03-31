
import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { Industry } from './types';

interface IndustryRegulationsProps {
  industry: Industry;
}

const IndustryRegulations: React.FC<IndustryRegulationsProps> = ({ industry }) => {
  return (
    <section id="regulations" className="pt-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Key Regulations for {industry.name}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Thalos helps you navigate these critical regulations with smart monitoring and compliance tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {industry.regulations.map((regulation, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{regulation.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{regulation.description}</p>
                <div className="flex flex-wrap gap-2">
                  {regulation.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-medium mb-2">
              Automated Compliance Tracking
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Thalos continuously monitors regulation changes relevant to the {industry.name.toLowerCase()} industry. 
              Our system automatically updates your compliance dashboard when new regulations are introduced or 
              existing ones are modified, ensuring you're always up to date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryRegulations;
