
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { statisticsData } from './mockData';

const AuditReports: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Audit Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileSpreadsheet className="w-4 h-4 mr-1" />
            Export to Excel
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="w-4 h-4 mr-1" />
            Export to PDF
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compliance Trend</CardTitle>
            <Tabs defaultValue="monthly">
              <TabsList className="h-8">
                <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly" className="text-xs">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly" className="text-xs">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] flex items-center justify-center bg-gray-900/50 rounded-md p-4 text-muted-foreground">
              <div className="h-full w-full relative">
                {/* Placeholder for chart */}
                <div className="h-full w-full flex flex-col justify-between">
                  <div className="grid grid-cols-12 gap-0 h-full relative">
                    {/* Grid lines */}
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="col-span-12 border-t border-dashed border-gray-700 absolute w-full" style={{ top: `${i * 25}%` }} />
                    ))}
                    
                    {/* Months */}
                    <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                        <div key={month}>{month}</div>
                      ))}
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
                      {['100', '75', '50', '25', '0'].map((value) => (
                        <div key={value}>{value}</div>
                      ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-[-20px] left-0 flex space-x-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                        <span>Compliance</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical Findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
                  {statisticsData.complianceScore}%
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1f2937"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="10"
                    strokeDasharray={`${statisticsData.complianceScore * 2.51} 251`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute bottom-0 w-full text-center text-sm text-muted-foreground">
                  Compliance
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mb-4">
                Your overall compliance score based on completed audits
              </p>
              
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'Monthly Safety Summary', date: 'November 2023' },
              { name: 'Fire Safety Inspection', date: 'October 2023' },
              { name: 'Quarterly Compliance Report', date: 'Q3 2023' }
            ].map((report, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-800 rounded-md">
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-muted-foreground">{report.date}</div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditReports;
