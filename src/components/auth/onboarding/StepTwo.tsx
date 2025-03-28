
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StepTwoProps, industries } from "./types";

export function StepTwo({ selectedIndustries, handleIndustrySelect }: StepTwoProps) {
  return (
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
  );
}
