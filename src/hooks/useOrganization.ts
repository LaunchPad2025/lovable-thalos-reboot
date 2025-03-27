
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
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
        
        // Temporary workaround - bypass the organization_members table if we're still having issues
        // Just return the default organization for now until the database policies take effect
        if (window.localStorage.getItem('bypass_org_query') === 'true') {
          console.log("Using bypass mode for organization query");
          return defaultOrg;
        }
        
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role, organizations(id, name)')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching organization:", error);
          
          // Check for the specific error that was fixed with our SQL migration
          if (error.code === '42P17' && error.message.includes('infinite recursion')) {
            toast.error("Database policy error still present. Using fallback mode.", {
              id: "db-policy-fixed",
              duration: 5000
            });
            
            // Set a flag to bypass this query next time
            window.localStorage.setItem('bypass_org_query', 'true');
          } else {
            toast.error("Could not load organization data. Using default values.");
          }
          
          return defaultOrg;
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          // Creating automatic org for demo purposes
          toast.info("Using default organization for demo purposes");
          return defaultOrg;
        }

        console.log("Successfully fetched organization:", orgMember);
        // Clear the bypass flag if the query succeeded
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
