
import { z } from 'zod';

export interface Detection {
  label?: string;
  confidence?: number;
  bbox?: [number, number, number, number];
  text?: string;
  remediationSteps?: string;
}

export interface TestResult {
  regulationIds: string[];
  relevanceScores: number[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in-progress' | 'resolved';
  description: string;
  detections?: Detection[];
  imagePreview?: string | null;
  industry?: string;
  id?: string;
  location?: string;
}

export const testModelSchema = z.object({
  model_id: z.string().min(1, 'Model selection is required'),
  violation_text: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),
});

export type TestModelFormValues = z.infer<typeof testModelSchema>;

