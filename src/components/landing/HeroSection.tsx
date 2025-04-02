
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-20 text-center relative overflow-hidden">
      {/* Background decorative elements */}
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
            View Demo <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={() => navigate('/documentation/features')}
            variant="outline" 
            className="border-blue-700/50 text-white hover:bg-blue-900/30 px-8 py-6 rounded-md flex items-center justify-center text-lg"
          >
            <Shield className="mr-2 h-5 w-5" /> Explore Features
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
  );
};

export default HeroSection;
