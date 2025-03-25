
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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
import { supabase } from "@/integrations/supabase/client";

type UserRole = 'admin' | 'safety_officer' | 'worker';

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

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("worker");
  const [organization, setOrganization] = useState<string>("");
  const [createOrg, setCreateOrg] = useState<boolean>(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      // Update user's metadata with onboarding info
      await updateUserProfile({
        role,
        industries: selectedIndustries,
        preferredModules: selectedModules,
        onboarded: true
      });
      
      // If creating an organization
      if (createOrg && organization) {
        const { data, error } = await supabase
          .from('organizations')
          .insert({
            name: organization,
            created_by: user.id,
            industries: selectedIndustries
          })
          .select();
          
        if (error) throw error;
        
        if (data && data[0]) {
          // Add user as admin to the new organization
          await supabase
            .from('organization_members')
            .insert({
              organization_id: data[0].id,
              user_id: user.id,
              role: 'admin'
            });
        }
      }
      
      toast({
        title: "Onboarding complete!",
        description: "Your profile has been set up successfully.",
      });
      
      // Redirect to dashboard
      navigate("/");
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
                  onValueChange={(value) => setRole(value)}
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
                  <div className="pt-2">
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      placeholder="Enter organization name"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="bg-[#1a2330] border-gray-700 mt-1"
                    />
                  </div>
                )}
              </div>
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
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-thalos-blue hover:bg-blue-600 ml-auto"
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default OnboardingFlow;
