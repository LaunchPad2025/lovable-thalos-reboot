
import React from 'react';
import { HardHat, Factory, Stethoscope, Truck } from 'lucide-react';
import IndustryGuideCard from './IndustryGuideCard';

const IndustryGuides = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Industry-Specific Guides</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <IndustryGuideCard 
          title="Construction"
          description="Safety compliance guides specific to construction sites and OSHA regulations."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<HardHat className="h-6 w-6 text-orange-500" />}
        />
        
        <IndustryGuideCard 
          title="Manufacturing"
          description="Guides for factory and production environment safety standards."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Factory className="h-6 w-6 text-blue-500" />}
        />
        
        <IndustryGuideCard 
          title="Healthcare"
          description="Safety protocols for medical facilities, staff, and patient safety."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Stethoscope className="h-6 w-6 text-green-500" />}
        />
        
        <IndustryGuideCard 
          title="Logistics"
          description="Safety guides for warehousing, transportation, and supply chain operations."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Truck className="h-6 w-6 text-purple-500" />}
        />
      </div>
    </div>
  );
};

export default IndustryGuides;
