
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { trainingStatus } from './mockData';

const TrainingStatusCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-green-600/30 bg-green-900/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-200">Completed</h3>
              <p className="text-3xl font-bold mt-2">{trainingStatus.completed}</p>
              <p className="text-sm mt-1 text-gray-400">Training modules completed</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-600/30 bg-blue-900/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-200">Upcoming</h3>
              <p className="text-3xl font-bold mt-2">{trainingStatus.upcoming}</p>
              <p className="text-sm mt-1 text-gray-400">Training sessions scheduled</p>
            </div>
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-600/30 bg-red-900/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-200">Overdue</h3>
              <p className="text-3xl font-bold mt-2">{trainingStatus.overdue}</p>
              <p className="text-sm mt-1 text-gray-400">Missed or overdue training</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-600/30 bg-amber-900/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-200">Certifications Expiring</h3>
              <p className="text-3xl font-bold mt-2">{trainingStatus.expiring}</p>
              <p className="text-sm mt-1 text-gray-400">Expiring within 30 days</p>
            </div>
            <Clock className="h-6 w-6 text-amber-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingStatusCards;
