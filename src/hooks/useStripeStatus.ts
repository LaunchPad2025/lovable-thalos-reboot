
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export const useStripeStatus = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const sessionId = searchParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      // Verify the session status from Stripe (optional extra security step)
      const verifySession = async () => {
        try {
          // Optional: Implement a verify-session edge function if needed
          // const { data } = await supabase.functions.invoke('verify-session', {
          //   body: { sessionId }
          // });
          
          // For now, simply assume success and refetch subscription data
          const { data: authData } = await supabase.auth.getSession();
          if (authData.session) {
            // Invalidate any cached subscription data
            // This would be used with React Query if you're using it
          }
          
          toast({
            title: "Subscription successful!",
            description: "Thank you for subscribing to Thalos. Your account has been upgraded.",
            duration: 5000,
          });
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      };
      
      verifySession();
      
      // Clean up the URL by removing query parameters
      navigate('/subscription', { replace: true });
    } else if (canceled === 'true') {
      toast({
        title: "Subscription canceled",
        description: "You've canceled the checkout process. No charges were made.",
        duration: 5000,
      });
      
      // Clean up the URL by removing query parameters
      navigate('/subscription', { replace: true });
    }
  }, [location.search, toast, navigate]);
  
  return null;
};
