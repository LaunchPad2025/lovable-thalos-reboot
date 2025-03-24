
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';

const featureInfo = {
  analytics: {
    title: 'Advanced Analytics',
    description: 'Comprehensive safety performance metrics and reporting tools are coming soon.',
    details: 'Track trends, visualize data, and generate custom reports to improve your safety program.'
  },
  help: {
    title: 'Help Center',
    description: 'Our comprehensive knowledge base and support resources will be available soon.',
    details: 'Find tutorials, FAQs, and best practices to maximize your Thalos experience.'
  },
  default: {
    title: 'Coming Soon',
    description: 'This feature is currently under development.',
    details: 'We're working hard to bring you new capabilities. Check back soon!'
  }
};

const ComingSoon = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const feature = params.get('feature') || 'default';
  
  const { title, description, details } = 
    feature === 'analytics' ? featureInfo.analytics :
    feature === 'help' ? featureInfo.help :
    featureInfo.default;
  
  return (
    <PageContainer>
      <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="text-center max-w-xl p-8">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex justify-center items-center mx-auto mb-6">
            <Clock size={40} className="text-thalos-blue" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-lg text-gray-600 mb-4">{description}</p>
          <p className="text-gray-500 mb-8">{details}</p>
          
          <Link to="/">
            <Button className="bg-thalos-blue hover:bg-blue-600">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default ComingSoon;
