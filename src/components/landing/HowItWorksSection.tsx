
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
          Explore the solutions that can elevate your business processes to new heights
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-950 mr-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Safety Monitoring</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Optimize your workplace safety with real-time monitoring and instant violation
              detection.
            </p>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Risk Assessment Completion</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div>
                <span className="block text-white">Current Status</span>
                <span>Satisfactory</span>
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
              <h3 className="text-2xl font-bold">Intuitive Analytics</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Visualize safety metrics and gain insights to make data-driven decisions for your
              operations.
            </p>
            
            <div>
              <div className="text-sm mb-2">Traffic by Device</div>
              <div className="flex items-end h-24 space-x-2">
                <div className="w-1/6 h-[60%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[80%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[50%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[70%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[40%] bg-blue-600 rounded-t-md"></div>
                <div className="w-1/6 h-[90%] bg-blue-600 rounded-t-md"></div>
              </div>
              <div className="flex text-xs text-gray-500 mt-2 justify-between">
                <span>Safety</span>
                <span>PPE</span>
                <span>Incidents</span>
                <span>Hazards</span>
                <span>Training</span>
                <span>Other</span>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#0D1424] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-950 mr-4">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">Improved Safety</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Trust us to safeguard your information with security that exceeds industry
              standards.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Design Phase</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Build Wireframe</span>
              </div>
              <div className="flex justify-between items-center">
                <span>User Interface Design</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Information Architecture</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
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
              <h3 className="text-2xl font-bold">Seamless Integration</h3>
            </div>
            
            <p className="text-gray-400 mb-8">
              Streamline your workflow by integrating our tools with the platforms you already
              use.
            </p>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Safety Protocol Review</span>
                <span>7/10</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>24 Aug 2023</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  </svg>
                  7
                  <span className="mx-2">•</span>
                  2
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
