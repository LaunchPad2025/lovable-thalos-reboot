
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export function useOrganization() {
  const { user } = useAuth();

  const { data: organization, isLoading, error } = useQuery({
    queryKey: ['organization'],
    queryFn: async () => {
      if (!user) return null;

      try {
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role, organizations(id, name)')
          .eq('user_id', user.id)
          .maybeSingle(); // Use maybeSingle instead of single to prevent errors when no data

        if (error) {
          console.error("Error fetching organization:", error);
          return null; // Return null instead of throwing to prevent query failures
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          return null;
        }

        return orgMember;
      } catch (err) {
        console.error("Exception in organization fetch:", err);
        return null; // Return null to prevent query failures
      }
    },
    enabled: !!user,
    retry: 3, // Add retry logic
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false
  });

  return {
    organization,
    isLoading,
    error
  };
}
