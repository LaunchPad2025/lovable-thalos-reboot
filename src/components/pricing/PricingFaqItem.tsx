
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PricingFaqItemProps {
  question: string;
  answer: React.ReactNode;
}

const PricingFaqItem = ({ question, answer }: PricingFaqItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {answer}
        </p>
      </CardContent>
    </Card>
  );
};

export default PricingFaqItem;
