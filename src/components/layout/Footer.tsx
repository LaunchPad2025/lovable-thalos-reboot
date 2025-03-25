
import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0d1117] border-t border-gray-800 py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-white">
                Thalos<span className="text-primary text-opacity-80">.</span>
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                AI-powered workplace safety platform automating violation detection, compliance, and task management.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-white text-sm">Features</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white text-sm">Security</Link></li>
              <li><Link to="/compliance" className="text-gray-400 hover:text-white text-sm">Compliance</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
              <li><Link to="/api" className="text-gray-400 hover:text-white text-sm">API Reference</Link></li>
              <li><Link to="/tutorials" className="text-gray-400 hover:text-white text-sm">Tutorials</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/legal" className="text-gray-400 hover:text-white text-sm">Privacy</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-white text-sm">Terms</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-white text-sm">Security</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-white text-sm">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Thalos. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">Powered by Steel Toe</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
