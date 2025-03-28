
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function useOrganizationCheck(userEmail: string | undefined) {
  const [existingOrganization, setExistingOrganization] = useState<any>(null);
  const [checkingOrganization, setCheckingOrganization] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingOrganization = async () => {
      if (!userEmail) return;
      
      setCheckingOrganization(true);
      
      try {
        const domain = userEmail.split('@')[1];
        
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name')
          .ilike('domain', `%${domain}%`)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setExistingOrganization(data);
        }
      } catch (error: any) {
        console.error("Error checking organization:", error);
        toast({
          title: "Error checking organization",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setCheckingOrganization(false);
      }
    };
    
    checkExistingOrganization();
  }, [userEmail, toast]);

  return { existingOrganization, checkingOrganization };
}
