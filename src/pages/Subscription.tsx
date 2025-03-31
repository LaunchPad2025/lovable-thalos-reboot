
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';

const Subscription = () => {
  const handleContactSales = () => {
    window.location.href = "https://cal.com/annieeser/30min";
  };

  return (
    <PageContainer>
      <div className="w-full max-w-7xl mx-auto">
        <PageTitle 
          title="Talk to Our Sales Team"
          subtitle="Let us help you find the perfect safety compliance solution for your business."
          className="text-center mb-12"
        />
        
        <div className="mb-8 text-center">
          <div className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium">
            Thalos - The most comprehensive safety compliance platform
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-900/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground">Worksite-Based Pricing</h3>
              <p className="text-muted-foreground mt-1">
                Our pricing is based on physical locations, not the number of users. Pay only for each worksite that needs safety compliance monitoring.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-4 ml-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Per-location pricing</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Unlimited users per location</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Volume discounts available</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to learn more about Thalos?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our sales team is ready to answer your questions and provide a personalized demo
            of our safety compliance platform.
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 px-8 py-2 text-lg"
            onClick={handleContactSales}
          >
            Schedule a Call with Sales
          </Button>
        </div>
        
        <div className="mt-16 bg-card border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-teal-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M10 7h7" />
                <path d="M7 11h.01" />
                <path d="M10 11h7" />
                <path d="M7 15h.01" />
                <path d="M10 15h7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Multi-Location Management</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Organizations with multiple locations can benefit from our Corporate plan with tiered volume discounts:
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-muted-foreground">5-10 locations: 10% discount on per-location pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-muted-foreground">11-25 locations: 15% discount on per-location pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-muted-foreground">26+ locations: 20% discount on per-location pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-muted-foreground">Enterprise API access: Higher rate limits for large-scale operations</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="text-teal-500 border-teal-500 hover:bg-teal-500/10" onClick={handleContactSales}>
                  Contact Sales for Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Start your safety compliance journey today.</p>
          <p>Our team is ready to help you find the perfect solution.</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Subscription;
