
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepOneProps, companySize, UserRole } from "./types";

export function StepOne({
  role,
  setRole,
  existingOrganization,
  createOrg,
  setCreateOrg,
  organization,
  setOrganization,
  companyEmail,
  setCompanyEmail,
  size,
  setSize,
}: StepOneProps) {
  return (
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
  );
}
