
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { teamComplianceData } from './mockData';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const TeamOverview = () => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Training compliance status for your team members.
      </p>

      <Card className="bg-background">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold">{teamComplianceData.overallCompliance}%</h3>
              <p className="text-sm text-muted-foreground">Overall Compliance</p>
            </div>
            <Progress 
              value={teamComplianceData.overallCompliance} 
              className="h-2 w-full" 
              indicatorClassName="bg-blue-500" 
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-blue-900/20 border border-blue-900/30 rounded-md p-3">
              <p className="text-sm text-blue-400">Required</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-green-900/20 border border-green-900/30 rounded-md p-3">
              <p className="text-sm text-green-400">Fully Completed</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-amber-900/20 border border-amber-900/30 rounded-md p-3">
              <p className="text-sm text-amber-400">Need Attention</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Team Member</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Course/ID</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Compliance</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {teamComplianceData.teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-800">
                  <td className="py-3 px-2">{member.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{member.role}</td>
                  <td className="py-3 px-2">{member.courseId}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={member.compliance} 
                        className="h-2 w-16" 
                        indicatorClassName={
                          member.compliance >= 90 ? "bg-green-500" : 
                          member.compliance >= 70 ? "bg-amber-500" : 
                          "bg-red-500"
                        }
                      />
                      <span>{member.compliance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    {member.completed ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 text-xs">
                        Complete
                      </span>
                    ) : (
                      <span>{member.nextDue?.split('-')[1]}/{member.nextDue?.split('-')[2]}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="text-xs">
              View Detailed Report <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamOverview;
