
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
        
        // Now using the security definer functions, we should have fixed the infinite recursion
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role, organizations(id, name)')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching organization:", error);
          toast.error("Could not load organization data: " + error.message);
          return defaultOrg;
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          // Creating automatic org for demo purposes
          toast.info("Using default organization for demo purposes");
          return defaultOrg;
        }

        console.log("Successfully fetched organization:", orgMember);
        return orgMember;
      } catch (err) {
        console.error("Exception in organization fetch:", err);
        toast.error("Error loading organization. Using default values.");
        return defaultOrg;
      }
    },
    enabled: !!user,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    organization: organization || defaultOrg,
    isLoading,
    error,
    hasOrganization: !!organization
  };
}
