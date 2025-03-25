
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth/AuthProvider';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // If user is logged in, update their profile with newsletter preference
      if (user) {
        await updateUserProfile({ 
          newsletterOptIn: true,
          newsletterOptInDate: new Date().toISOString()
        });
        toast.success("You've been subscribed to our newsletter!");
      } else {
        // For non-logged in users, just store their email - in a real implementation
        // this would need to be connected to a newsletter service
        // This is just a placeholder
        toast.success("You've been subscribed to our newsletter!");
      }
      setEmail('');
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter to receive the latest updates, industry news, and safety compliance tips.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
        <Input 
          placeholder="Enter your email" 
          className="flex-grow" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
