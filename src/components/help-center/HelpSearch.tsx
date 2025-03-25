
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HelpSearch = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-center mb-6">How can we help you?</h2>
      <div className="flex items-center max-w-xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            type="text" 
            placeholder="Search for help topics..." 
            className="pl-10"
          />
        </div>
        <Button className="ml-4">Search</Button>
      </div>
    </div>
  );
};

export default HelpSearch;
