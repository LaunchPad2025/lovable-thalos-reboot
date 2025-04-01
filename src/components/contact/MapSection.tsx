
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const MapSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Visit Us</Badge>
        <h2 className="text-3xl font-bold mb-4">Our Location</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find us at our headquarters in Tech Valley, California
        </p>
      </div>
      
      <Card className="overflow-hidden border border-border">
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0457450396085!2d-122.40055002391653!3d37.78792771587067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085d33d5c3f%3A0x4e5f012b0b7ee55e!2sSan%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1689288648538!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default MapSection;
