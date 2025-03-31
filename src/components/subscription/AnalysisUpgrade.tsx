
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AnalysisUpgrade = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Need More Analyses?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          If you're running low on analyses for this billing period, you have several options:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
            <span>Upgrade to a higher plan with more monthly analyses</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
            <span>Purchase additional analysis packs (contact sales)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
            <span>Wait until your next billing cycle when analyses reset</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto" onClick={() => window.location.href = "/subscription"}>
          Explore Upgrade Options
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisUpgrade;
