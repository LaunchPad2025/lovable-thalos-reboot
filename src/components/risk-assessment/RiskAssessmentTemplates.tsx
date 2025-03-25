
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Construction, Beaker, Briefcase, Factory, Truck } from 'lucide-react';

// Mock template data
const mockTemplates = [
  {
    id: '1',
    title: 'General Workplace Assessment',
    description: 'A comprehensive template for assessing general workplace safety risks and hazards.',
    icon: Building,
    categories: ['3 categories'],
    factors: ['11 risk factors'],
    hazards: ['Physical Hazards', 'Chemical Hazards', 'Ergonomic Hazards', 'Biological']
  },
  {
    id: '2',
    title: 'Construction Site Assessment',
    description: 'Specialized template for assessing hazards on construction sites.',
    icon: Construction,
    categories: ['4 categories'],
    factors: ['16 risk factors'],
    hazards: ['Physical Hazards', 'Chemical Hazards', 'Ergonomic Hazards', 'Electrical']
  },
  {
    id: '3',
    title: 'Office Environment Assessment',
    description: 'Template focused on hazards in office settings.',
    icon: Briefcase,
    categories: ['2 categories'],
    factors: ['8 risk factors'],
    hazards: ['Physical Hazards', 'Ergonomic Hazards', 'Electrical Hazards']
  },
  {
    id: '4',
    title: 'Manufacturing Facility Assessment',
    description: 'Comprehensive template for manufacturing environments with heavy machinery.',
    icon: Factory,
    categories: ['5 categories'],
    factors: ['14 risk factors'],
    hazards: ['Physical Hazards', 'Chemical Hazards', 'Ergonomic Hazards', 'Biological']
  },
  {
    id: '5',
    title: 'Laboratory Safety Assessment',
    description: 'Specialized for laboratory and research environments.',
    icon: Beaker,
    categories: ['4 categories'],
    factors: ['12 risk factors'],
    hazards: ['Chemical Hazards', 'Ergonomic Hazards', 'Environmental Hazards', 'Biological']
  },
  {
    id: '6',
    title: 'Transportation Safety Assessment',
    description: 'Template for assessing vehicle safety in transportation and logistics.',
    icon: Truck,
    categories: ['3 categories'],
    factors: ['10 risk factors'],
    hazards: ['Physical Hazards', 'Chemical Hazards', 'Ergonomic Hazards']
  }
];

const RiskAssessmentTemplates = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Assessment Templates</h2>
        <Button className="bg-thalos-blue hover:bg-blue-600">
          Create Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="bg-[#0f1419] border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-center items-center mb-4 bg-[#1a1f29] w-12 h-12 rounded-lg">
                  <template.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-white font-medium mb-2">{template.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                <div className="text-gray-500 text-xs space-y-1 mt-2">
                  {template.categories.map((category, idx) => (
                    <div key={idx}>{category}</div>
                  ))}
                  {template.factors.map((factor, idx) => (
                    <div key={idx}>{factor}</div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.hazards.map((hazard, idx) => (
                    <span key={idx} className="inline-flex items-center text-xs bg-[#1a1f29] text-gray-300 px-2 py-1 rounded">
                      {hazard}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                    View
                  </Button>
                  <Button size="sm" className="bg-thalos-blue hover:bg-blue-600">
                    Use
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RiskAssessmentTemplates;
