
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export function useOrganization() {
  const { user } = useAuth();

  const { data: organization, isLoading, error } = useQuery({
    queryKey: ['organization'],
    queryFn: async () => {
      if (!user) return null;

      const { data: orgMember, error } = await supabase
        .from('organization_members')
        .select('organization_id, role, organizations(id, name)')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error("Error fetching organization:", error);
        throw error;
      }

      return orgMember;
    },
    enabled: !!user
  });

  return {
    organization,
    isLoading,
    error
  };
}
