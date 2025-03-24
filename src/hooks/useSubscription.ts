
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Subscription } from '@/types/models';
import { useAuth } from '@/context/AuthContext';

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch the current user's subscription
  const { data: subscription, isLoading, error } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<Subscription | null> => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No subscription found
          return null;
        }
        throw error;
      }
      
      // Ensure the status is one of the allowed types
      if (data && (data.status === 'active' || data.status === 'canceled' || data.status === 'past_due')) {
        return data as Subscription;
      }
      
      // If we get an unexpected status, default to a safe value
      if (data) {
        return {
          ...data,
          status: 'past_due' // Default to past_due as a fallback
        } as Subscription;
      }
      
      return null;
    },
    enabled: !!user,
  });

  // Mutation to cancel subscription
  const cancelSubscription = useMutation({
    mutationFn: async () => {
      if (!subscription?.stripe_subscription_id) {
        throw new Error('No active subscription found');
      }

      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: subscription.stripe_subscription_id },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Subscription canceled',
        description: 'Your subscription has been canceled and will end at the current billing period.',
      });
      
      // Invalidate and refetch the subscription data
      queryClient.invalidateQueries({ queryKey: ['subscription', user?.id] });
    },
    onError: (error) => {
      console.error('Error canceling subscription:', error);
      toast({
        title: 'Failed to cancel subscription',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });

  return {
    subscription,
    isLoading,
    error,
    cancelSubscription,
    isActive: subscription?.status === 'active',
    isCanceled: subscription?.cancel_at_period_end,
  };
};
