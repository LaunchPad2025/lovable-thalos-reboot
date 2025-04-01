
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, HardHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaulieSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-24 bg-[#090D13]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-yellow-900/30 p-2 rounded-md">
                <HardHat className="w-6 h-6 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold">Meet <span className="text-yellow-500">Paulie</span></h2>
            </div>
            
            <h3 className="text-2xl text-yellow-500 font-bold mb-6">Your AI Safety Assistant</h3>
            
            <p className="text-gray-300 mb-8">
              Paulie provides step-by-step guidance on safety regulations, 
              compliance questions, and workplace hazards. Get instant answers 
              and personalized recommendations for all your safety concerns.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✦</span>
                <span>Answers complex safety regulation questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✦</span>
                <span>Provides step-by-step remediation guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✦</span>
                <span>Explains industry-specific compliance requirements</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✦</span>
                <span>Offers real-time support for safety incidents</span>
              </li>
            </ul>
            
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700 rounded-md px-6 py-3 font-medium"
              onClick={() => window.location.href = "https://cal.com/annieeser/30min"}
            >
              Schedule a Consultation <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="bg-[#111724] border border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center border-b border-gray-800 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center mr-3">
                <HardHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold">Paulie</h4>
                <p className="text-sm text-gray-400">AI Safety Assistant</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0 mr-3 mt-1"></div>
                <div className="bg-gray-800 rounded-lg p-3 text-sm max-w-[80%]">
                  <p>Hi there! I'm Paulie, your AI safety assistant. How can I help you today?</p>
                </div>
              </div>
              
              <div className="flex items-start justify-end">
                <div className="bg-blue-900/30 rounded-lg p-3 text-sm max-w-[80%]">
                  <p>What PPE is required for working with chemicals in a laboratory?</p>
                </div>
                <div className="ml-3 mt-1 text-xs bg-gray-800 rounded-full px-2 py-1">You</div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0 mr-3 mt-1"></div>
                <div className="bg-gray-800 rounded-lg p-3 text-sm max-w-[80%]">
                  <p>When working with chemicals in a laboratory, you'll need:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Chemical-resistant gloves appropriate for the specific chemicals</li>
                    <li>Safety goggles or face shield</li>
                    <li>Lab coat or chemical-resistant apron</li>
                    <li>Closed-toe shoes</li>
                    <li>Respiratory protection if working with volatile substances</li>
                  </ul>
                  <p className="mt-2">Would you like me to explain the specific requirements for particular chemicals or procedures?</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask Paulie about safety regulations..."
                className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 px-4 pr-10 text-sm focus:outline-none focus:border-yellow-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaulieSection;
