import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  Play,
  BarChart3,
  Link2
} from 'lucide-react';
import ChatPopup from '@/components/chatbot/ChatPopup';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0C1117] text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <div>
              <span className="text-xl font-bold">Thalos</span>
              <span className="text-xs text-gray-400 block">powered by Steel Toe</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white">Home</a>
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center">
                Industries
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center">
                Solutions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/auth')} className="text-gray-300 hover:text-white">
              Sign In
            </button>
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center items-center mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-300">AI-Powered Workplace Safety</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Safe Workplaces,<br />
          Smarter Compliance
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Thalos uses AI to detect safety violations, automate compliance, and
          streamline task management so you can focus on your business.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md flex items-center justify-center text-lg"
          >
            Try Demo <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="border border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 px-8 py-6 rounded-md flex items-center justify-center text-lg"
          >
            <Play className="mr-2 h-5 w-5" /> Watch Video
          </Button>
        </div>
        
        {/* Trusted by section */}
        <div className="mt-24 mb-20">
          <p className="text-gray-400 mb-8">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            <span className="text-xl font-bold text-gray-500">ACME</span>
            <span className="text-xl font-bold text-gray-500">Globex</span>
            <span className="text-xl font-bold text-gray-500">Soylent</span>
            <span className="text-xl font-bold text-gray-500">Hooli</span>
            <span className="text-xl font-bold text-gray-500">Initech</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
              <a href="#" className="text-blue-500 flex items-center font-medium">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </a>
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
              <a href="#" className="text-green-500 flex items-center font-medium">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </a>
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
              <a href="#" className="text-red-500 flex items-center font-medium">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
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

      {/* Paulie Section */}
      <div className="py-24 bg-[#090D13]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-blue-900/30 p-2 rounded-md">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">Meet <span className="text-blue-500">Paulie</span></h2>
              </div>
              
              <h3 className="text-2xl text-blue-500 font-bold mb-6">Your AI Safety Assistant</h3>
              
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
              
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3 font-medium">
                Chat with Paulie <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-[#111724] border border-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center border-b border-gray-800 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
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
                  className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 px-4 pr-10 text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-900/30 rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve workplace safety?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
            </p>
            <Button 
              onClick={() => navigate('/auth?signup=true')} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#080B11] border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">Thalos</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white mb-2">Home</a>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Features</a>
              <a href="#" className="text-gray-400 hover:text-white mb-2">How It Works</a>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Pricing</a>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Industries</a>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2023 Thalos Safety Platform. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Keep the ChatPopup component */}
      <ChatPopup />
    </div>
  );
};

export default Index;
