
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ChevronRight,
  BarChart3,
  Link2,
  HardHat
} from 'lucide-react';
import ChatPopup from '@/components/chatbot/ChatPopup';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
            <a href="/subscription" className="text-gray-300 hover:text-white">Pricing</a>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-white bg-transparent">Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/50 to-blue-900/60 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <Shield className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Industry-Specific Safety
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore safety solutions tailored to your industry needs and regulatory requirements.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <IndustryItem href="#" title="Construction" description="OSHA compliance and hazard prevention for construction sites" />
                      <IndustryItem href="#" title="Manufacturing" description="Machine safety, PPE requirements, and chemical handling" />
                      <IndustryItem href="#" title="Healthcare" description="Infection control, patient handling, and biohazard management" />
                      <IndustryItem href="#" title="Logistics" description="Transportation safety, materials handling, and warehouse compliance" />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
                  <HardHat className="w-6 h-6 text-blue-500" />
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
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3 font-medium"
                onClick={() => navigate('/dashboard')}
              >
                Try Demo <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-[#111724] border border-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center border-b border-gray-800 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9] flex items-center justify-center mr-3">
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
      <footer className="bg-[#080B11] border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <div>
                  <span className="text-xl font-bold">Thalos</span>
                  <span className="text-xs text-gray-400 block">powered by Steel Toe</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Streamlined safety management powered by AI to keep your workplace 
                compliant and your workers safe.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/subscription" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/legal" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Steel Toe Technologies. All rights reserved.
            </div>
            
            <div className="flex flex-wrap space-x-6">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat popup */}
      <ChatPopup />
    </div>
  );
};

// Helper component for industry menu items
const IndustryItem = ({ title, description, href }: { title: string; description: string; href: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/20 hover:text-white focus:bg-blue-900/20 focus:text-white"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default Index;
