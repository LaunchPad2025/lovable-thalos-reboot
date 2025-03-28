
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import TrainingTabs from '@/components/training/TrainingTabs';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, Calendar, Book, Dashboard, Training } from 'lucide-react';

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-card p-6">
          <h3 className="text-lg font-medium mb-2">Training Progress</h3>
          <div className="flex items-center space-x-2">
            <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-sm">65%</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">5 of 8 modules completed</p>
        </Card>
        
        <Card className="bg-card p-6">
          <h3 className="text-lg font-medium mb-2">Next Session</h3>
          <div className="flex items-center text-primary mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">Today at 2:00 PM</span>
          </div>
          <p className="text-sm text-muted-foreground">Fall Protection Training - Module 3</p>
        </Card>
        
        <Card className="bg-card p-6">
          <h3 className="text-lg font-medium mb-2">Resources</h3>
          <div className="flex items-center text-primary mb-2">
            <Book className="h-4 w-4 mr-2" />
            <span className="text-sm">Safety Documentation</span>
          </div>
          <p className="text-sm text-muted-foreground">Access training materials and guides</p>
        </Card>
      </div>
      
      <Card className="bg-card">
        <TrainingTabs />
      </Card>
    </PageContainer>
  );
};

export default TrainingPage;
