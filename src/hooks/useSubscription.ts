
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Subscription } from '@/types/models';
import { useAuth } from '@/context/auth';

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch the current user's subscription
  const { data: subscription, isLoading, error } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<Subscription | null> => {
      if (!user) return null;
      
      try {
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
      } catch (error) {
        console.error("Error fetching subscription:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Fetch organization subscription if user has no personal subscription
  const { data: orgSubscription, isLoading: isLoadingOrgSub } = useQuery({
    queryKey: ['orgSubscription', user?.id],
    queryFn: async (): Promise<Subscription | null> => {
      if (!user) return null;
      if (subscription) return null; // Don't fetch if user already has a subscription
      
      try {
        // First get the user's organization
        const { data: orgMember, error: orgError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', user.id)
          .single();
        
        if (orgError || !orgMember) return null;
        
        // Then get the organization's subscription
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('organization_id', orgMember.organization_id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') return null;
          throw error;
        }
        
        return data as Subscription;
      } catch (error) {
        console.error("Error fetching org subscription:", error);
        return null;
      }
    },
    enabled: !!user && !subscription,
  });

  // Mutation to cancel subscription
  const cancelSubscription = useMutation({
    mutationFn: async () => {
      const activeSubscription = subscription || orgSubscription;
      if (!activeSubscription?.stripe_subscription_id) {
        throw new Error('No active subscription found');
      }

      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: activeSubscription.stripe_subscription_id },
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
      if (orgSubscription) {
        queryClient.invalidateQueries({ queryKey: ['orgSubscription', user?.id] });
      }
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

  // Determine the final subscription status considering both user and org subscriptions
  const effectiveSubscription = subscription || orgSubscription;
  
  return {
    subscription: effectiveSubscription,
    isLoading: isLoading || isLoadingOrgSub,
    error,
    cancelSubscription,
    isActive: effectiveSubscription?.status === 'active',
    isCanceled: effectiveSubscription?.cancel_at_period_end,
    planId: effectiveSubscription?.plan_id,
    isOrgSubscription: !subscription && !!orgSubscription,
  };
};
