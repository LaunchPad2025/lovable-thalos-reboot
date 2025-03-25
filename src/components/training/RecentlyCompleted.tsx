
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { completedTrainings } from './mockData';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';

const RecentlyCompleted = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recently Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {completedTrainings.map((training) => (
            <div key={training.id} className="border border-gray-800 rounded-md p-3 bg-gray-900/50">
              <div className="flex justify-between mb-2">
                <div className="flex gap-2">
                  <div className="bg-green-900/40 text-green-400 rounded-md w-8 h-8 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{training.title}</p>
                    <p className="text-xs text-gray-400">
                      Completed on {format(new Date(training.completedDate), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-xs text-gray-400">
                      • Certificate until {format(new Date(training.certificateExpires), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyCompleted;
