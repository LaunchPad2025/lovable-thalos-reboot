
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0d1117] border-t border-gray-800 py-12 text-gray-400 mt-auto relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <span className="text-xl font-semibold text-white">Thalos<span className="text-blue-500">.</span></span>
              </div>
            </div>
            <p className="text-sm mb-6">
              Streamlined safety management powered by AI to keep your workplace compliant and your workers safe.
            </p>
            {/* Social icons hidden for now */}
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/documentation/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/documentation/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link to="/documentation/updates" className="hover:text-white transition-colors">Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {/* Blog link removed */}
              <li><Link to="/documentation/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/documentation/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link to="/documentation/api-docs" className="hover:text-white transition-colors">API Docs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/documentation/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              <li><Link to="/documentation/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            © {new Date().getFullYear()} Thalos Technologies Inc. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/legal?tab=privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal?tab=terms" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal?tab=cookies" className="text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
