
import { Dispatch, SetStateAction } from "react";

export type UserRole = 'admin' | 'safety_officer' | 'worker';

export interface OnboardingFlowProps {
  redirectUrl?: string;
}

export interface StepOneProps {
  role: UserRole;
  setRole: Dispatch<SetStateAction<UserRole>>;
  existingOrganization: any;
  createOrg: boolean;
  setCreateOrg: Dispatch<SetStateAction<boolean>>;
  organization: string;
  setOrganization: Dispatch<SetStateAction<string>>;
  companyEmail: string;
  setCompanyEmail: Dispatch<SetStateAction<string>>;
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
}

export interface StepTwoProps {
  selectedIndustries: string[];
  handleIndustrySelect: (industry: string) => void;
}

export interface StepThreeProps {
  selectedModules: string[];
  handleModuleSelect: (moduleId: string) => void;
}

export const industries = [
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

export const modules = [
  { id: "violations", label: "Violations Detection" },
  { id: "tasks", label: "Task Management" },
  { id: "regulations", label: "Regulation Tracking" },
  { id: "reports", label: "Reporting & Analytics" },
];

export const companySize = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];
