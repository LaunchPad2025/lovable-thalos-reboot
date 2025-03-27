import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export function useOrganization() {
  const { user } = useAuth();

  const defaultOrg = {
    organization_id: "00000000-0000-0000-0000-000000000000",
    role: "member",
    organizations: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Default Organization"
    }
  };

  const { data: organization, isLoading, error } = useQuery({
    queryKey: ['organization', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log("No user found in useOrganization, returning default org");
        return defaultOrg;
      }

      try {
        console.log("Fetching organization for user:", user.id);
        
        // Now that we've fixed the infinite recursion in RLS policy,
        // we should be able to query organization_members directly
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role, organizations(id, name)')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching organization:", error);
          
          // We still keep the fallback logic for robustness
          toast.error("Could not load organization data. Using default values.");
          return defaultOrg;
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          // Creating automatic org for demo purposes
          toast.info("Using default organization for demo purposes");
          return defaultOrg;
        }

        console.log("Successfully fetched organization:", orgMember);
        // Clear any bypass flags since we can now query successfully
        window.localStorage.removeItem('bypass_org_query');
        return orgMember;
      } catch (err) {
        console.error("Exception in organization fetch:", err);
        toast.error("Error loading organization. Using default values.");
        return defaultOrg;
      }
    },
    enabled: true, // Always try to fetch, using default if needed
    retry: 1, // Reduce retries to avoid flooding with errors
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    organization: organization || defaultOrg, // Always return at least the default
    isLoading,
    error,
    hasOrganization: !!organization
  };
}
