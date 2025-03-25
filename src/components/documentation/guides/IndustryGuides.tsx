
import React from 'react';
import { HardHat, Factory, Stethoscope, Truck, ShieldCheck, Tool, Building, Briefcase } from 'lucide-react';
import IndustryGuideCard from './IndustryGuideCard';

const IndustryGuides = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Industry-Specific Guides</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <IndustryGuideCard 
          title="Construction"
          description="Comprehensive safety compliance guides covering OSHA regulations, fall protection, equipment safety, and hazard communication for construction sites."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<HardHat className="h-6 w-6 text-orange-500" />}
        />
        
        <IndustryGuideCard 
          title="Manufacturing"
          description="Detailed guides for machine safety, lockout/tagout procedures, industrial hygiene, and ergonomics in factory and production environments."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Factory className="h-6 w-6 text-blue-500" />}
        />
        
        <IndustryGuideCard 
          title="Healthcare"
          description="Essential safety protocols for infection control, biohazard management, radiation safety, and patient handling in medical facilities."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Stethoscope className="h-6 w-6 text-green-500" />}
        />
        
        <IndustryGuideCard 
          title="Logistics"
          description="Safety guides for material handling, forklift operation, warehouse safety, transportation regulations, and supply chain risk management."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Truck className="h-6 w-6 text-purple-500" />}
        />

        <IndustryGuideCard 
          title="Energy"
          description="Safety protocols for power generation, electrical hazards, renewable energy systems, and compliance with energy sector regulations."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<ShieldCheck className="h-6 w-6 text-yellow-500" />}
        />
        
        <IndustryGuideCard 
          title="Mining"
          description="Comprehensive guides for underground safety, ventilation systems, equipment operation, and emergency response in mining operations."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Tool className="h-6 w-6 text-slate-500" />}
        />
        
        <IndustryGuideCard 
          title="Commercial"
          description="Office safety guidelines, fire safety, emergency evacuation, ADA compliance, and general workplace safety for commercial buildings."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Building className="h-6 w-6 text-teal-500" />}
        />
        
        <IndustryGuideCard 
          title="Finance"
          description="Data security, physical security measures, regulatory compliance, and crisis management for financial institutions and services."
          imageUrl="/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png"
          icon={<Briefcase className="h-6 w-6 text-indigo-500" />}
        />
      </div>
    </div>
  );
};

export default IndustryGuides;
