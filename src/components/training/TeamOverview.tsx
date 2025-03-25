
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { teamMembers, trainingStatistics } from "./mockData";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const TeamOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Training completion status for your team members
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{trainingStatistics.teamCompliance}%</CardTitle>
          <p className="text-sm text-muted-foreground">Overall Compliance</p>
        </CardHeader>
        <CardContent>
          <Progress value={trainingStatistics.teamCompliance} className="h-2" />
          
          <div className="grid grid-cols-3 mt-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs font-medium">Fully Compliant</p>
              <p className="text-lg font-semibold">1</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-center">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xs font-medium">Need Attention</p>
              <p className="text-lg font-semibold">2</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs font-medium">Non-Compliant</p>
              <p className="text-lg font-semibold">1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Team Member</th>
                  <th className="text-left py-3 font-medium">Role</th>
                  <th className="text-left py-3 font-medium">Course ID</th>
                  <th className="text-left py-3 font-medium">Compliance</th>
                  <th className="text-left py-3 font-medium">Next Due</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="py-3">{member.name}</td>
                    <td className="py-3">{member.role}</td>
                    <td className="py-3">{member.courseId}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={member.compliance} 
                          className="h-2 w-24" 
                          indicatorClassName={
                            member.compliance >= 90 ? "bg-green-500" :
                            member.compliance >= 70 ? "bg-yellow-500" : 
                            "bg-red-500"
                          }
                        />
                        <span className="text-xs">{member.compliance}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      {member.status ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {member.status}
                        </span>
                      ) : (
                        member.nextDue
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button className="text-xs text-primary hover:underline">View Detailed Report →</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamOverview;
