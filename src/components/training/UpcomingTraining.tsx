
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trainingCourses } from "./mockData";
import { Clock } from "lucide-react";

const UpcomingTraining: React.FC = () => {
  const upcomingCourses = trainingCourses.filter(
    (course) => course.status === "upcoming"
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Training</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between bg-card rounded-md border p-4"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-indigo-100 dark:bg-indigo-900/30 p-2">
                <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-xs text-muted-foreground">
                  {course.duration} • {course.timeRemaining}
                </p>
              </div>
            </div>
            <Button size="sm" className="h-8">Start</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingTraining;
