
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, BarChart2, Shield, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RecommendedFeatures = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 p-6">
      <h3 className="text-lg font-medium text-white mb-4">Recommended Features</h3>
      <p className="text-gray-400 text-sm mb-6">Upgrade to access these powerful safety compliance tools</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="Risk Assessment"
          tier="Pro"
          icon={<Shield className="h-8 w-8 text-blue-500 mb-2" />}
          description="Comprehensive risk assessment tools for your entire organization"
        />
        
        <FeatureCard 
          title="Advanced Analytics"
          tier="Pro"
          icon={<BarChart2 className="h-8 w-8 text-blue-500 mb-2" />}
          description="Detailed compliance analytics and reporting capabilities"
        />
        
        <FeatureCard 
          title="AI Remediation"
          tier="Enterprise"
          icon={<Brain className="h-8 w-8 text-blue-500 mb-2" />}
          description="Automated AI-powered compliance remediation suggestions"
        />
      </div>
      
      <Button 
        onClick={() => navigate('/subscription')}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
      >
        Upgrade Your Plan
      </Button>
    </Card>
  );
};

interface FeatureCardProps {
  title: string;
  tier: 'Pro' | 'Enterprise';
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, tier, description, icon }) => {
  return (
    <div className="bg-[#111823] p-4 rounded-lg border border-gray-800">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs py-0.5 px-2 bg-blue-900/30 text-blue-400 rounded-full">
            {tier}
          </span>
        </div>
        <div className="mt-2">
          {icon}
          <h4 className="font-medium text-white mb-1">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedFeatures;
