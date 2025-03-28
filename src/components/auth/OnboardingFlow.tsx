
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnboardingFlow } from "./onboarding/useOnboardingFlow";
import { LoadingState } from "./onboarding/LoadingState";
import { StepOne } from "./onboarding/StepOne";
import { StepTwo } from "./onboarding/StepTwo";
import { StepThree } from "./onboarding/StepThree";
import { OnboardingFlowProps } from "./onboarding/types";

export function OnboardingFlow({ redirectUrl = '/dashboard' }: OnboardingFlowProps) {
  const {
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
    handleIndustrySelect,
    handleModuleSelect,
    handleNext,
    handleBack,
    handleSubmit
  } = useOnboardingFlow(redirectUrl);

  if (checkingOrganization) {
    return <LoadingState />;
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
            <StepOne
              role={role}
              setRole={setRole}
              existingOrganization={existingOrganization}
              createOrg={createOrg}
              setCreateOrg={setCreateOrg}
              organization={organization}
              setOrganization={setOrganization}
              companyEmail={companyEmail}
              setCompanyEmail={setCompanyEmail}
              size={size}
              setSize={setSize}
            />
          )}

          {step === 2 && (
            <StepTwo
              selectedIndustries={selectedIndustries}
              handleIndustrySelect={handleIndustrySelect}
            />
          )}

          {step === 3 && (
            <StepThree
              selectedModules={selectedModules}
              handleModuleSelect={handleModuleSelect}
            />
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
