import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useOrganization } from "@/hooks/useOrganization";
import { Loader2 } from "lucide-react";

type UserRole = 'admin' | 'safety_officer' | 'worker';

interface OnboardingFlowProps {
  redirectUrl?: string;
}

const industries = [
  "Construction",
  "Manufacturing",
  "Healthcare",
  "Logistics",
  "Food Processing",
  "Oil & Gas",
  "Mining",
  "Agriculture",
  "Transportation",
];

const modules = [
  { id: "violations", label: "Violations Detection" },
  { id: "tasks", label: "Task Management" },
  { id: "regulations", label: "Regulation Tracking" },
  { id: "reports", label: "Reporting & Analytics" },
];

const companySize = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

export function OnboardingFlow({ redirectUrl = '/dashboard' }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("worker");
  const [organization, setOrganization] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [createOrg, setCreateOrg] = useState<boolean>(true);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [existingOrganization, setExistingOrganization] = useState<any>(null);
  const [checkingOrganization, setCheckingOrganization] = useState<boolean>(true);
  
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { organization: userOrg } = useOrganization();

  useEffect(() => {
    const checkExistingOrganization = async () => {
      if (!user?.email) return;
      
      setCheckingOrganization(true);
      
      try {
        const domain = user.email.split('@')[1];
        
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name')
          .ilike('domain', `%${domain}%`)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setExistingOrganization(data);
          setCreateOrg(false);
        }
      } catch (error: any) {
        console.error("Error checking organization:", error);
      } finally {
        setCheckingOrganization(false);
      }
    };
    
    checkExistingOrganization();
  }, [user?.email]);

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
      await updateUserProfile({
        role,
        industries: selectedIndustries,
        preferredModules: selectedModules,
        onboarded: true
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
      
      toast({
        title: "Onboarding complete!",
        description: "Your profile has been set up successfully. You're now on a free trial.",
      });
      
      navigate(redirectUrl);
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

  if (checkingOrganization) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] p-4">
        <Card className="w-full max-w-md border-gray-800 bg-[#131920] text-white">
          <CardContent className="pt-6 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-400">Checking organization information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] p-4">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920] text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Welcome to Thalos
          </CardTitle>
          <CardDescription className="text-gray-400">
            Let's set up your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Select 
                  onValueChange={(value) => setRole(value as UserRole)}
                  defaultValue={role}
                >
                  <SelectTrigger className="bg-[#1a2330] border-gray-700">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2330] border-gray-700">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="safety_officer">Safety Officer</SelectItem>
                    <SelectItem value="worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {existingOrganization ? (
                <div className="space-y-2 p-4 bg-blue-900/20 border border-blue-800 rounded-md">
                  <h3 className="font-medium text-blue-400">Organization Match Found</h3>
                  <p className="text-sm text-gray-300">
                    Based on your email domain, you'll be joined to the existing organization:
                  </p>
                  <p className="font-medium text-white">{existingOrganization.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="create-org" 
                      checked={createOrg}
                      onCheckedChange={(checked) => setCreateOrg(checked as boolean)}
                    />
                    <Label htmlFor="create-org">Create a new organization</Label>
                  </div>
                  
                  {createOrg && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          placeholder="Enter organization name"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          className="bg-[#1a2330] border-gray-700 mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="companyEmail">Company Email Domain</Label>
                        <Input
                          id="companyEmail"
                          placeholder="company.com"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          className="bg-[#1a2330] border-gray-700 mt-1"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Used for verifying new team members
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="size">Company Size</Label>
                        <Select 
                          onValueChange={setSize}
                          value={size}
                        >
                          <SelectTrigger className="bg-[#1a2330] border-gray-700 mt-1">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2330] border-gray-700">
                            {companySize.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Select Industries (Choose all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`industry-${industry}`}
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={() => handleIndustrySelect(industry)}
                    />
                    <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>Select Modules (Choose all that apply)</Label>
              <div className="space-y-3">
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`module-${module.id}`}
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleSelect(module.id)}
                    />
                    <Label htmlFor={`module-${module.id}`}>{module.label}</Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-400">
                  You'll be able to use all features during your trial. After your trial ends, 
                  contact our sales team to continue using Thalos.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="bg-transparent border-gray-700 text-white hover:bg-[#1e2530]"
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={handleNext}
              className="bg-thalos-blue hover:bg-blue-600 ml-auto"
              disabled={step === 1 && createOrg && !organization}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-thalos-blue hover:bg-blue-600 ml-auto"
            >
              {isSubmitting ? "Saving..." : "Start Free Trial"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default OnboardingFlow;
