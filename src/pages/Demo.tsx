
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import ChatAssistantCard from '@/pages/violations/components/ChatAssistantCard';
import ViolationUpload from '@/components/violations/ViolationUpload';
import ViolationResults from '@/components/violations/ViolationResults';
import { ViolationAnalysisProvider } from '@/components/violations/ViolationAnalysisProvider';

const DemoPage = () => {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUploadComplete = (results: { imagePreview: string | null }) => {
    setUploadComplete(true);
    setImagePreview(results.imagePreview);
  };

  return (
    <PageContainer>
      <div className="fixed top-0 left-0 w-full bg-yellow-500 text-center py-1 z-50">
        <p className="text-black font-medium text-sm">Demo Mode - Explore Our Safety Platform</p>
      </div>
      
      <div className="pt-8 pb-12">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Thalos Safety Platform Demo</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Welcome to the Thalos Demo</h2>
            <p className="text-gray-300">
              This demo showcases two key features of our safety platform:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-gray-300">
              <li>
                <strong>AI Assistant "Paulie"</strong> - Ask questions about workplace safety regulations, including OSHA standards, EPA guidelines, and industry best practices.
              </li>
              <li>
                <strong>Safety Violation Detection</strong> - Upload images to detect safety violations using our AI models trained on construction, manufacturing, and general workplace safety.
              </li>
            </ul>
            <p className="text-gray-300">
              Try both features below to experience how Thalos can improve safety compliance at your workplace.
            </p>
            <div className="pt-2">
              <Button 
                onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Schedule a Full Demo
              </Button>
            </div>
          </div>
          
          <ChatAssistantCard />
        </div>

        <ViolationAnalysisProvider>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Safety Violation Detection</h2>
            
            {!uploadComplete ? (
              <ViolationUpload 
                onUploadComplete={handleUploadComplete} 
                userIndustry="Construction" 
                hideModelSelection={true}
              />
            ) : (
              <ViolationResults imagePreview={imagePreview} onReset={() => setUploadComplete(false)} />
            )}
          </div>
        </ViolationAnalysisProvider>
      </div>
    </PageContainer>
  );
};

export default DemoPage;
