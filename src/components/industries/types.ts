
import { ReactNode } from 'react';

export interface UseCase {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
}

export interface Regulation {
  title: string;
  description: string;
  tags: string[];
}

export interface SafetyOfficerBenefit {
  title: string;
  description: string;
}

export interface DayInLifeItem {
  time: string;
  activity: string;
  description: string;
  withThalos: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  heroDescription: string;
  heroImage: string;
  icon: ReactNode;
  color: string;
  description: string;
  useCases: UseCase[];
  regulations: Regulation[];
  safetyOfficerBenefits: SafetyOfficerBenefit[];
  dayInLife: DayInLifeItem[];
}
