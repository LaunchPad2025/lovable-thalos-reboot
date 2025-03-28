
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { UserRole } from "./types";
import { useOrganizationCheck } from "./useOrganizationCheck";

export function useOnboardingFlow(redirectUrl: string = '/dashboard') {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlanId = searchParams.get('plan');
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("worker");
  const [organization, setOrganization] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [createOrg, setCreateOrg] = useState<boolean>(true);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { existingOrganization, checkingOrganization } = useOrganizationCheck(user?.email);

  useEffect(() => {
    if (existingOrganization) {
      setCreateOrg(false);
    }
  }, [existingOrganization]);

  const handleIndustrySelect = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(m => m !== moduleId));
    } else {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const onboardedAt = new Date().toISOString();
      
      await updateUserProfile({
        role,
        industries: selectedIndustries,
        preferredModules: selectedModules,
        onboarded: true,
        onboardedAt,
        subscriptionStatus: 'trial',
        plan_id: selectedPlanId || 'basic' // Store the selected plan
      });
      
      let organizationId;
      
      if (existingOrganization) {
        organizationId = existingOrganization.id;
        
        await supabase
          .from('organization_members')
          .insert({
            organization_id: organizationId,
            user_id: user.id,
            role: 'member'
          });
          
        toast({
          title: "Joined existing organization!",
          description: `You've been added to ${existingOrganization.name} because of your email domain.`,
        });
      } else if (createOrg && organization) {
        const { data, error } = await supabase
          .from('organizations')
          .insert({
            name: organization,
            size: size || null,
            industries: selectedIndustries,
            domain: companyEmail || null
          })
          .select();
          
        if (error) throw error;
        
        if (data && data[0]) {
          organizationId = data[0].id;
          
          await supabase
            .from('organization_members')
            .insert({
              organization_id: organizationId,
              user_id: user.id,
              role: 'admin'
            });
        }
        
        toast({
          title: "Organization created!",
          description: `${organization} has been successfully created.`,
        });
      }
      
      // Redirect to subscription page if a plan was selected
      if (selectedPlanId) {
        toast({
          title: "Onboarding complete!",
          description: "Your profile has been set up successfully. Now let's set up your free trial.",
        });
        
        navigate(`/subscription?plan=${selectedPlanId}`);
      } else {
        toast({
          title: "Onboarding complete!",
          description: "Your profile has been set up successfully. You're now on a 14-day free trial with full access.",
        });
        
        navigate(redirectUrl);
      }
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error completing onboarding",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    role,
    setRole,
    organization,
    setOrganization,
    companyEmail,
    setCompanyEmail,
    size,
    setSize,
    createOrg,
    setCreateOrg,
    selectedIndustries,
    selectedModules,
    isSubmitting,
    existingOrganization,
    checkingOrganization,
    selectedPlanId,
    handleIndustrySelect,
    handleModuleSelect,
    handleNext,
    handleBack,
    handleSubmit
  };
}
