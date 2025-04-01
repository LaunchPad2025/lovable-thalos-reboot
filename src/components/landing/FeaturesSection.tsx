
import React from 'react';
import { Shield, AlertTriangle, CheckSquare, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <div id="features" className="py-24 bg-[#090D13]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Intelligent Safety Management
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Our AI-powered platform transforms how you approach workplace
          safety and compliance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#0D1424] border border-blue-900/30 rounded-xl p-8 transition-all hover:border-blue-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-950 mb-6 border border-blue-800">
              <AlertTriangle className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Safety Checks</h3>
            <p className="text-gray-400 mb-6">
              Our multi-modal AI system automatically identifies safety
              violations in images, video, and audio feeds.
            </p>
            <Button 
              variant="link" 
              className="text-blue-400 p-0 hover:text-blue-300"
              onClick={() => navigate('/documentation/features')}
            >
              Learn more →
            </Button>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#0D1E18] border border-green-900/30 rounded-xl p-8 transition-all hover:border-green-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-green-950 mb-6 border border-green-800">
              <CheckSquare className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Compliance</h3>
            <p className="text-gray-400 mb-6">
              Stay ahead of OSHA regulations with automated compliance tracking and
              intelligent remediation suggestions.
            </p>
            <Button 
              variant="link" 
              className="text-green-400 p-0 hover:text-green-300"
              onClick={() => navigate('/documentation/features')}
            >
              Learn more →
            </Button>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#1B0D13] border border-red-900/30 rounded-xl p-8 transition-all hover:border-red-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-red-950 mb-6 border border-red-800">
              <BarChart2 className="h-7 w-7 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Proactive Risk Management</h3>
            <p className="text-gray-400 mb-6">
              Identify and address potential hazards with industry-specific risk assessment
              tools for construction, oil & gas, and utilities sectors.
            </p>
            <Button 
              variant="link" 
              className="text-red-400 p-0 hover:text-red-300"
              onClick={() => navigate('/documentation/features')}
            >
              Learn more →
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            variant="outline"
            className="border-blue-700/50 text-white hover:bg-blue-900/30"
            onClick={() => navigate('/documentation/features')}
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
