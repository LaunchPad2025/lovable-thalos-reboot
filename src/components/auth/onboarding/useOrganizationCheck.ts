
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function useOrganizationCheck(userEmail: string | undefined) {
  const [existingOrganization, setExistingOrganization] = useState<any>(null);
  const [checkingOrganization, setCheckingOrganization] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingOrganization = async () => {
      if (!userEmail) {
        setCheckingOrganization(false);
        return;
      }
      
      setCheckingOrganization(true);
      
      try {
        // Extract the domain part from the email
        const domain = userEmail.split('@')[1];
        
        if (!domain) {
          console.error("Invalid email format");
          setCheckingOrganization(false);
          return;
        }
        
        console.log("Checking organization for domain:", domain);
        
        // Query for organization with matching domain
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name, domain')
          .not('domain', 'is', null)
          .filter('domain', 'neq', '')
          .or(`domain.ilike.%${domain}%,domain.eq.${domain}`);
        
        if (error) {
          console.error("Error in domain query:", error);
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Found matching organization(s):", data);
          // Use the first matching organization
          setExistingOrganization(data[0]);
        } else {
          console.log("No matching organization found for domain:", domain);
          setExistingOrganization(null);
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
