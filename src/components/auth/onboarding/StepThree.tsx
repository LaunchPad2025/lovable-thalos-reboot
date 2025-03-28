
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StepThreeProps, modules } from "./types";

export function StepThree({ selectedModules, handleModuleSelect }: StepThreeProps) {
  return (
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
  );
}
