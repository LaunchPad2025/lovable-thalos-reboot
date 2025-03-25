
import React from 'react';
import { Shield } from 'lucide-react';

const FeaturesSection = () => {
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
              <Shield className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Violation Detection</h3>
            <p className="text-gray-400 mb-6">
              Our computer vision technology automatically identifies safety
              violations in images and video feeds.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#0D1E18] border border-green-900/30 rounded-xl p-8 transition-all hover:border-green-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-green-950 mb-6 border border-green-800">
              <Shield className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Compliance</h3>
            <p className="text-gray-400 mb-6">
              Stay ahead of regulations with automated compliance tracking and
              intelligent suggestions.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#1B0D13] border border-red-900/30 rounded-xl p-8 transition-all hover:border-red-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-red-950 mb-6 border border-red-800">
              <Shield className="h-7 w-7 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Proactive Risk Management</h3>
            <p className="text-gray-400 mb-6">
              Identify and address potential hazards before they lead to incidents or
              violations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
