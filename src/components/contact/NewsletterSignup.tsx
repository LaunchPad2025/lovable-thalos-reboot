
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewsletterSignup = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Stay Updated</Badge>
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the latest updates on product features, safety regulations, and industry best practices
        </p>
      </div>
      
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-8">
          <div className="max-w-lg mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email address" 
                type="email" 
                className="flex-grow"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterSignup;
