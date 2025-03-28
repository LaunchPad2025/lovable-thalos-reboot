
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, HardHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full bg-[#0C1117] text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="w-full border-b border-blue-900/20 bg-[#0C1117] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center group transition-all duration-300">
                <span className="text-2xl font-bold text-white mr-0 group-hover:text-blue-400 transition-colors">Thalos<span className="text-blue-500">.</span></span>
                <HardHat size={20} className="text-blue-500 ml-1" aria-hidden="true" />
              </a>
              
              <nav className="hidden md:flex ml-8">
                <ul className="flex space-x-6">
                  <li><a href="#industries" className="text-gray-300 hover:text-white">Industries</a></li>
                  <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                  <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-gray-300 hover:text-white hidden md:flex"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth?signup=true')} 
                className="bg-blue-600 hover:bg-blue-700 hidden md:flex items-center"
              >
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-20 text-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex justify-center items-center mb-3 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800/30">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-blue-300 font-medium">AI-Powered Workplace Safety</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Safe Workplaces,<br />
            Smarter Compliance
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Thalos uses AI to detect safety violations, automate compliance, and
            streamline task management so you can focus on your business.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button 
              onClick={() => navigate('/demo')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md flex items-center justify-center text-lg shadow-lg shadow-blue-900/30 group transition-all duration-300"
            >
              Try Demo <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')}
              variant="outline" 
              className="border-blue-700/50 text-white hover:bg-blue-900/30 px-8 py-6 rounded-md flex items-center justify-center text-lg"
            >
              <Shield className="mr-2 h-5 w-5" /> Get Started
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>OSHA Compliant</span>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Data</span>
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
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-yellow-600 hover:bg-yellow-700 rounded-md px-6 py-3 font-medium"
                  onClick={() => navigate('/demo')}
                >
                  Try Demo <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3 font-medium"
                  onClick={() => navigate('/chatbot')}
                >
                  Chat with Paulie
                </Button>
              </div>
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

      {/* CTA Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-900/30 rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve workplace safety?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
            </p>
            <Button 
              onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
