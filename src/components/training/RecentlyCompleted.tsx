
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trainingCourses } from "./mockData";
import { CheckCircle } from "lucide-react";

const RecentlyCompleted: React.FC = () => {
  const completedCourses = trainingCourses.filter(
    (course) => course.status === "completed"
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Recently Completed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {completedCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-start gap-3 bg-card rounded-md border p-4"
          >
            <div className="rounded-md bg-green-100 dark:bg-green-900/30 p-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium">{course.title}</p>
              <p className="text-xs text-muted-foreground">
                Completed on {course.completedOn}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                • Certified until {course.certificateExpires}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentlyCompleted;
