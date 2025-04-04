
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { plans } from "@/data/subscriptionPlans";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LovableSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  const [processingState, setProcessingState] = useState<'validating' | 'creating-account' | 'subscribing' | 'done'>('validating');
  const [error, setError] = useState<string | null>(null);
  
  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'pro';
  const returnUrl = searchParams.get('return_url') || null;
  const email = searchParams.get('email') || '';

  // Validate plan parameter
  const validPlans = ['basic', 'pro', 'premium', 'enterprise'];
  const isValidPlan = validPlans.includes(planId);
  
  // Get plan details
  const selectedPlan = plans.find(p => p.id === planId) || plans[1]; // Default to Pro plan if invalid

  // Validate return URL (basic validation for demo purposes)
  const validateReturnUrl = (url: string | null): boolean => {
    if (!url) return true; // No URL is valid (will use default)
    
    const allowedDomains = [
      'localhost',
      'thalos-safety.com',
      'lovable-website.com',
      'thalostech.io'
    ];
    
    try {
      const parsedUrl = new URL(url);
      return allowedDomains.some(domain => parsedUrl.hostname.includes(domain));
    } catch (e) {
      return false;
    }
  };
  
  const isValidReturnUrl = validateReturnUrl(returnUrl);

  // Handle the signup and subscription process
  useEffect(() => {
    const processSignupFlow = async () => {
      try {
        // Validate parameters first
        if (!isValidPlan) {
          setError(`Invalid plan: '${planId}'. Please use one of: basic, pro, premium, enterprise.`);
          return;
        }
        
        if (!isValidReturnUrl) {
          setError(`Invalid return URL. For security reasons, only approved domains are allowed.`);
          return;
        }
        
        // If user is already logged in
        if (user) {
          setProcessingState('subscribing');
          
          // If enterprise plan, redirect to contact page
          if (planId === 'enterprise') {
            window.location.href = "https://cal.com/annieeser/30min";
            return;
          }
          
          // Redirect to the new subscription URL
          window.location.href = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly`;
          
          return;
        }
        
        // If user is not logged in, create a temporary account
        if (!user && !loading) {
          setProcessingState('creating-account');
          
          // Generate a random password for the user
          const tempPassword = Math.random().toString(36).slice(-10);
          
          // Create a new account with the provided email or a generated one
          const userEmail = email || `temp_user_${Date.now()}@thalostech.temp`;
          
          const { data, error } = await supabase.auth.signUp({
            email: userEmail,
            password: tempPassword,
            options: {
              data: {
                from_lovable: true,
                selected_plan: planId,
                return_url: returnUrl
              }
            }
          });
          
          if (error) {
            // If the user already exists, try to sign them in
            if (error.message.includes('already registered')) {
              toast({
                title: "Welcome back!",
                description: "You already have an account. Please sign in to continue.",
              });
              
              // Redirect to the auth page with the plan parameter
              navigate(`/auth?plan=${planId}${returnUrl ? `&return_url=${encodeURIComponent(returnUrl)}` : ''}`);
              return;
            }
            
            setError(`Error creating account: ${error.message}`);
            return;
          }
          
          if (data.session) {
            setProcessingState('subscribing');
            
            // If enterprise plan, redirect to contact page
            if (planId === 'enterprise') {
              window.location.href = "https://cal.com/annieeser/30min";
              return;
            }
            
            // Redirect to the new subscription URL
            window.location.href = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly`;
            
            return;
          } else {
            // Email confirmation required - direct the user to check their email
            toast({
              title: "Check your email",
              description: "Please check your email to confirm your account before subscribing.",
            });
            
            setProcessingState('done');
          }
        }
      } catch (err) {
        console.error('Error processing signup flow:', err);
        setError('An unexpected error occurred. Please try again.');
        setProcessingState('done');
      }
    };
    
    if (!loading && processingState === 'validating') {
      processSignupFlow();
    }
  }, [user, loading, planId, returnUrl, isValidPlan, isValidReturnUrl, processingState, navigate, toast]);

  // Show loading state while processing
  if (processingState !== 'done' && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
        <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              {processingState === 'validating' && "Validating your request..."}
              {processingState === 'creating-account' && "Creating your account..."}
              {processingState === 'subscribing' && "Setting up your subscription..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="text-gray-400 text-center">
                {processingState === 'validating' && "We're validating your request parameters..."}
                {processingState === 'creating-account' && "We're creating your Thalos account..."}
                {processingState === 'subscribing' && "We're setting up your subscription to the " + selectedPlan.name + " plan..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
        <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500 text-center">
              Integration Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-400 text-center">{error}</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/documentation/integration')}
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default view (should rarely be shown as user will be redirected)
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            Thalos x Lovable Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-center">
              Please check your email to confirm your account before subscribing to the {selectedPlan.name} plan.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              Go to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
