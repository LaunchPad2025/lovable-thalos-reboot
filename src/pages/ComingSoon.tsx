
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ComingSoon = () => {
  const location = useLocation();
  
  // Determine the feature name based on the current route
  const getFeatureName = () => {
    const path = location.pathname.split('/')[1];
    
    switch (path) {
      case 'audits':
        return {
          name: 'Audits',
          icon: <Calendar className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'Schedule, conduct, and manage workplace safety audits'
        };
      case 'reports':
        return {
          name: 'Reports',
          icon: <Clock className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'Generate and analyze comprehensive safety reports'
        };
      case 'training':
        return {
          name: 'Training',
          icon: <Clock className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'Manage and track safety training and certifications'
        };
      case 'admin':
        return {
          name: 'Admin',
          icon: <Clock className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'Configure system settings and manage users'
        };
      case 'help':
        return {
          name: 'Help & Tour',
          icon: <Clock className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'Get assistance and learn how to use the platform'
        };
      default:
        return {
          name: 'This Feature',
          icon: <AlertTriangle className="h-12 w-12 mb-4 text-blue-400" />,
          description: 'This feature is coming soon to the Thalos Safety Assistant'
        };
    }
  };

  const feature = getFeatureName();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {feature.icon}
        <h1 className="text-2xl font-bold mb-2">
          {feature.name} <Badge variant="simulation" className="ml-2">Coming Soon</Badge>
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          {feature.description}
        </p>
        <p className="text-blue-400 text-sm mb-6">
          This feature is currently in simulation mode. Full functionality will be available in a future release.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ComingSoon;
