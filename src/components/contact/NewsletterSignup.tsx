
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSignup = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter to receive the latest updates, industry news, and safety compliance tips.
      </p>
      <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
        <Input placeholder="Enter your email" className="flex-grow" />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
};

export default NewsletterSignup;
