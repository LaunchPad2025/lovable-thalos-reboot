
import React from 'react';
import { AlertCircle } from 'lucide-react';

const SupportMessage = () => {
  return (
    <div className="flex items-center text-sm text-muted-foreground p-3 bg-muted rounded-md">
      <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
      <p>Our support team will respond as soon as possible</p>
    </div>
  );
};

export default SupportMessage;
