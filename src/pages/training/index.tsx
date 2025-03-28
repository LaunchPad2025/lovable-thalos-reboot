
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import TrainingTabs from '@/components/training/TrainingTabs';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare } from 'lucide-react';

const TrainingPage = () => {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Training</h1>
          <p className="text-gray-400">Manage and track safety training for your team</p>
        </div>
        
        <div className="flex space-x-3">
          <Button asChild variant="outline">
            <Link to="/training/review">
              <MessageSquare className="mr-2 h-4 w-4" />
              Training Review
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/training/media-violations">
              <Camera className="mr-2 h-4 w-4" />
              Media Violations
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="bg-card">
        <TrainingTabs />
      </Card>
    </PageContainer>
  );
};

export default TrainingPage;
