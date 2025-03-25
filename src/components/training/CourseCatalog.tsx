
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trainingCourses } from "./mockData";

const CourseCatalog: React.FC = () => {
  // Group courses by category
  const coursesByCategory = trainingCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    // Only add each course once (by title)
    if (!acc[course.category].some(c => c.title === course.title)) {
      acc[course.category].push(course);
    }
    return acc;
  }, {} as Record<string, typeof trainingCourses>);

  const categories = Object.keys(coursesByCategory);

  return (
    <div className="space-y-8">
      <div className="text-sm text-muted-foreground mb-4">
        Browse available training courses by category, industry, and role requirements
      </div>
      
      <div className="text-sm mb-4">
        The course catalog component would go here, showing available courses filtered by industry and role.
      </div>

      {categories.map(category => (
        <Card key={category} className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>{category}</CardTitle>
            <CardDescription>{coursesByCategory[category].length} courses available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursesByCategory[category].map(course => (
                <div key={course.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{course.duration}</span>
                        {course.required && (
                          <Badge variant="outline" className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseCatalog;
