
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/landing/LandingNavbar';
import { Footer } from '@/components/layout/Footer';
import { industryData } from '@/components/industries/industryData';
import { Search } from 'lucide-react';

const Industries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredIndustries = industryData.filter(industry => 
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0C1117]">
      <LandingNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Industry-Specific Safety Solutions</h1>
          <p className="text-xl text-gray-400">
            Thalos offers specialized safety compliance solutions tailored to the unique challenges of your industry.
          </p>
          
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search industries..."
              className="pl-10 pr-4 py-3 w-full bg-[#1a1f29] text-gray-200 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIndustries.map((industry) => (
            <Card 
              key={industry.id}
              className="border border-gray-800 bg-[#1a1f29] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${industry.heroImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f29] to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-900/50 text-white">
                      {industry.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{industry.name}</h2>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-300 mb-6">
                  {industry.description}
                </p>
                <Button asChild className="w-full">
                  <Link to={`/industries/${industry.slug}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 bg-blue-900 bg-opacity-10 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Not seeing your industry?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Our safety compliance platform is highly adaptable to various industries and regulatory environments.
              Contact us to discuss your specific industry needs.
            </p>
            <Button size="lg" asChild>
              <a href="https://cal.com/company/thalos/demo" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Industries;
