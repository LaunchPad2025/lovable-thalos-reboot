
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import IndustryHero from './IndustryHero';
import IndustryUseCases from './IndustryUseCases';
import IndustryRegulations from './IndustryRegulations';
import IndustrySafetyOfficer from './IndustrySafetyOfficer';
import { industryData } from './industryData';

const IndustryLayout = () => {
  const { industry } = useParams<{ industry: string }>();
  const currentIndustry = industryData.find(
    ind => ind.slug === industry
  );

  if (!currentIndustry) {
    return (
      <PageContainer title="Industry Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Industry Not Found</h1>
          <p className="text-gray-500 mb-6">The industry you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/industries">View All Industries</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${currentIndustry.name} Safety Compliance`}>
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/industries" className="hover:text-blue-500">Industries</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700">{currentIndustry.name}</span>
        </div>
      </div>

      <IndustryHero industry={currentIndustry} />
      
      <div className="mt-16 space-y-24">
        <IndustryUseCases industry={currentIndustry} />
        <IndustryRegulations industry={currentIndustry} />
        <IndustrySafetyOfficer industry={currentIndustry} />
        
        <div className="bg-blue-900 bg-opacity-10 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform safety compliance in your {currentIndustry.name.toLowerCase()} operations?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join leading {currentIndustry.name.toLowerCase()} companies already using Thalos to simplify compliance and improve safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://cal.com/company/thalos/demo" target="_blank" rel="noopener noreferrer">Schedule a Demo</a>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/documentation/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default IndustryLayout;
