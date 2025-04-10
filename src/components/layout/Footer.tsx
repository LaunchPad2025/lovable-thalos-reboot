
import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleStartFree = () => {
    window.open("https://thalostech.replit.app/", "_blank", "noopener");
  };
  
  const handleTalkToSales = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <footer className="bg-[#0d1117] border-t border-gray-800 py-8 md:py-12 text-gray-400 mt-auto relative z-10">
      <div className="container mx-auto px-6">
        {/* CTA section */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex justify-center items-center mb-4">
              <div className="p-2 bg-blue-600/20 rounded-full mr-3">
                <HardHat className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Start Free Today</h3>
            </div>
            <p className="text-gray-300 mb-4">Run 15 AI-powered safety analyses, no credit card required.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button 
                onClick={handleStartFree} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Free Trial
              </Button>
              <Button 
                onClick={handleTalkToSales} 
                variant="outline"
                className="border-blue-600/50 text-gray-200 hover:bg-blue-900/20"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                <span className="text-xl font-semibold text-white">
                  Thalos<span className="text-blue-500">.</span>
                </span>
                <HardHat className="h-5 w-5 text-blue-500 ml-1" />
              </div>
            </div>
            <p className="text-sm mb-6">
              AI-powered safety management to keep your workplace compliant and your workers safe.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/documentation/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/documentation/integration" className="hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/documentation/guides" className="hover:text-white transition-colors">Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              <li><Link to="/documentation/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Thalos Technologies Inc. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/legal?tab=privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal?tab=terms" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
