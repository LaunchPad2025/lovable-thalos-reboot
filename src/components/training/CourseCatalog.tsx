
import React from 'react';
import { courseCategories } from './mockData';
import { Button } from '@/components/ui/button';
import { Circle, CheckCircle, PlayCircle } from 'lucide-react';

const CourseCatalog = () => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Browse available training courses by category, industry, and role requirements.
      </p>
      
      <p className="text-sm text-muted-foreground mb-8">
        The course catalog component would go here, showing available courses filtered by industry and role.
      </p>

      {courseCategories.map((category) => (
        <div key={category.id} className="mb-8">
          <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
          <div className="space-y-3">
            {category.courses.map((course) => (
              <div key={course.id} className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">
                      {course.title}
                    </h4>
                    {course.required && (
                      <span className="inline-flex items-center rounded-md bg-red-900/50 px-2 py-1 text-xs font-medium text-red-300 border border-red-800">
                        Required
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    {course.completed ? (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" /> Completed
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-1 h-4 w-4" /> Start
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{course.duration}</span>
                  {course.dueDate && !course.completed && (
                    <span>Due: {course.dueDate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCatalog;
