
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useOrganization() {
  const { user } = useAuth();

  const { data: organization, isLoading, error } = useQuery({
    queryKey: ['organization'],
    queryFn: async () => {
      if (!user) {
        console.log("No user found in useOrganization");
        return null;
      }

      try {
        console.log("Fetching organization for user:", user.id);
        const { data: orgMember, error } = await supabase
          .from('organization_members')
          .select('organization_id, role, organizations(id, name)')
          .eq('user_id', user.id)
          .maybeSingle(); // Use maybeSingle instead of single to prevent errors when no data

        if (error) {
          console.error("Error fetching organization:", error);
          toast("Could not load organization data. Using default values.");
          return null;
        }

        if (!orgMember) {
          console.log("No organization membership found for user:", user.id);
          // If the user isn't in an organization, we'll create a default one for development
          return {
            organization_id: "00000000-0000-0000-0000-000000000000",
            role: "member",
            organizations: {
              id: "00000000-0000-0000-0000-000000000000",
              name: "Default Organization"
            }
          };
        }

        console.log("Successfully fetched organization:", orgMember);
        return orgMember;
      } catch (err) {
        console.error("Exception in organization fetch:", err);
        // Return a default organization for development
        return {
          organization_id: "00000000-0000-0000-0000-000000000000",
          role: "member",
          organizations: {
            id: "00000000-0000-0000-0000-000000000000",
            name: "Default Organization"
          }
        };
      }
    },
    enabled: !!user,
    retry: 3,
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    organization,
    isLoading,
    error,
    hasOrganization: !!organization
  };
}
