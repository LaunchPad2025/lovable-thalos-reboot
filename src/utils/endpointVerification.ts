
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface EndpointStatus {
  endpoint: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  timestamp: Date;
}

/**
 * Verifies the connectivity to various endpoints used in the application
 * @returns A promise that resolves to an array of endpoint statuses
 */
export async function verifyEndpoints(): Promise<EndpointStatus[]> {
  const results: EndpointStatus[] = [];
  const startTime = new Date();

  // Function to add a result to the results array
  const addResult = (
    endpoint: string, 
    status: 'success' | 'error' | 'pending', 
    message: string
  ) => {
    results.push({
      endpoint,
      status,
      message,
      timestamp: new Date()
    });
  };

  // Check Replit authentication endpoint
  try {
    const authResponse = await fetch('https://thalostech.replit.app/api/auth/status', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });
    
    if (authResponse.ok) {
      addResult('Replit Auth', 'success', 'Authentication endpoint is functional');
    } else {
      addResult('Replit Auth', 'error', `Auth endpoint error: ${authResponse.status}`);
    }
  } catch (error) {
    addResult('Replit Auth', 'error', `Could not connect to auth endpoint: ${error.message}`);
  }

  // Check Supabase connection
  try {
    const { data, error } = await supabase.from('health_check').select('*').limit(1);
    
    if (error) {
      addResult('Supabase', 'error', `Supabase error: ${error.message}`);
    } else {
      addResult('Supabase', 'success', 'Connected to Supabase successfully');
    }
  } catch (error) {
    addResult('Supabase', 'error', `Supabase connection failed: ${error.message}`);
  }

  // Check Contact Form function
  try {
    const contactResponse = await supabase.functions.invoke('send-contact-email', {
      body: { test: true }
    });
    
    if (contactResponse.error) {
      addResult('Contact Form', 'error', `Contact form function error: ${contactResponse.error.message}`);
    } else {
      addResult('Contact Form', 'success', 'Contact form endpoint is ready');
    }
  } catch (error) {
    addResult('Contact Form', 'error', `Contact form endpoint error: ${error.message}`);
  }

  // Check Stripe integration (if applicable)
  try {
    const stripeResponse = await fetch('https://thalostech.replit.app/api/stripe-status', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });
    
    if (stripeResponse.ok) {
      addResult('Stripe', 'success', 'Payment processing endpoint is functional');
    } else {
      addResult('Stripe', 'error', `Payment endpoint error: ${stripeResponse.status}`);
    }
  } catch (error) {
    addResult('Stripe', 'error', `Could not connect to payment endpoint: ${error.message}`);
  }

  // Calculate total time taken
  const endTime = new Date();
  const totalTime = endTime.getTime() - startTime.getTime();
  
  // Log results for debugging
  console.log(`Endpoint verification completed in ${totalTime}ms`, results);
  
  return results;
}

/**
 * Runs endpoint verification and shows toast notifications for results
 */
export function runEndpointVerification(): Promise<EndpointStatus[]> {
  toast.info('Verifying endpoints...', {
    duration: 3000,
  });
  
  return verifyEndpoints().then(results => {
    const errors = results.filter(r => r.status === 'error');
    
    if (errors.length > 0) {
      toast.error(`${errors.length} endpoint(s) have connection issues`, {
        description: 'Check the console for details',
        duration: 5000
      });
    } else {
      toast.success('All endpoints verified successfully', {
        duration: 3000
      });
    }
    
    return results;
  });
}
