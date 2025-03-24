
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to Thalos. Your account has been upgraded.",
        duration: 5000,
      });
      
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
};
