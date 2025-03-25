
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default HeroSection;
