
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
        
        // Use direct query with no nested selects to avoid recursion issues
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching organization:", error);
          toast.error("Could not load organization data: " + error.message);
          return defaultOrg;
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          toast.info("Using default organization for demo purposes");
          return defaultOrg;
        }

        // Then make a separate query for the organization details
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id, name')
          .eq('id', orgMember.organization_id)
          .single();

        if (orgError) {
          console.error("Error fetching organization details:", orgError);
          return {
            ...orgMember,
            organizations: {
              id: orgMember.organization_id,
              name: "Unknown Organization"
            }
          };
        }

        console.log("Successfully fetched organization:", orgMember, "with details:", orgData);
        return {
          ...orgMember,
          organizations: orgData
        };
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
