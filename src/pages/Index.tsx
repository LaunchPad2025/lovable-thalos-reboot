
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-blue-500">Thalos</span> Safety Management Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Streamline workplace safety compliance and risk management with our AI-powered solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/auth')} 
              variant="outline" 
              size="lg"
              className="border-gray-500 text-gray-300 hover:bg-gray-800"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Assessment</h3>
              <p className="text-gray-400">Identify and mitigate workplace hazards with AI-assisted risk assessments</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Violation Detection</h3>
              <p className="text-gray-400">Detect safety violations through visual analysis and get instant recommendations</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Management</h3>
              <p className="text-gray-400">Assign, track, and complete safety tasks across your organization</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentation</h3>
              <p className="text-gray-400">Centralize all safety documentation and stay audit-ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve workplace safety?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
          </p>
          <Button 
            onClick={() => navigate('/auth?signup=true')} 
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100 px-8"
          >
            Start Free Trial
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">© 2023 Thalos Safety Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
