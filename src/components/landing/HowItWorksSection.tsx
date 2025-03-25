
import React from 'react';
import { Shield, BarChart3, Link2 } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <div id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          How Thalos Works
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Our AI-powered platform transforms workplace safety compliance from reactive to proactive
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-950 mr-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">AI-Powered Violation Detection</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Identify safety violations in real-time with our advanced computer vision technology that analyzes images and video feeds for compliance issues.
            </p>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Detection Accuracy</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div>
                <span className="block text-white">Regulatory Coverage</span>
                <span>OSHA, ISO, ANSI Standards</span>
              </div>
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-950 mr-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Compliance Analytics</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Transform safety data into actionable insights with comprehensive analytics dashboards that help you identify trends and prioritize resources.
            </p>
            
            <div>
              <div className="text-sm mb-2">Compliance Metrics by Category</div>
              <div className="flex items-end h-24 space-x-2">
                <div className="w-1/6 h-[85%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[70%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[90%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[60%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[75%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[80%] bg-blue-600 rounded-t-md"></div>
              </div>
              <div className="flex text-xs text-gray-500 mt-2 justify-between">
                <span>PPE</span>
                <span>Hazards</span>
                <span>Training</span>
                <span>Procedures</span>
                <span>Equipment</span>
                <span>Documentation</span>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-950 mr-4">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">Risk Assessment & Mitigation</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Proactively identify and address potential safety risks before they lead to incidents with our comprehensive risk assessment tools.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Hazard Identification</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Risk Evaluation</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Mitigation Planning</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Implementation Tracking</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-950 mr-4">
                <Link2 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Automated Compliance Workflows</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Streamline compliance management with automated task creation, assignment, and tracking that ensures nothing falls through the cracks.
            </p>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Remediation Progress</span>
                <span>8/10</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Last Updated: May 10, 2025</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  </svg>
                  <span>Connected Systems: 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
