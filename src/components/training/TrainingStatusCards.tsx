
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, CalendarClock } from "lucide-react";
import { trainingStatistics } from "./mockData";

const TrainingStatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4 flex items-start">
          <div className="flex-1">
            <p className="text-lg font-semibold">{trainingStatistics.completed}</p>
            <p className="text-sm text-muted-foreground">
              Training modules completed
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4 flex items-start">
          <div className="flex-1">
            <p className="text-lg font-semibold">{trainingStatistics.upcoming}</p>
            <p className="text-sm text-muted-foreground">
              Training sessions scheduled
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4 flex items-start">
          <div className="flex-1">
            <p className="text-lg font-semibold">{trainingStatistics.overdue}</p>
            <p className="text-sm text-muted-foreground">
              Missed or overdue training
            </p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-4 flex items-start">
          <div className="flex-1">
            <p className="text-lg font-semibold">{trainingStatistics.expiring}</p>
            <p className="text-sm text-muted-foreground">
              Expiring within 30 days
            </p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full">
            <CalendarClock className="h-5 w-5 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingStatusCards;
