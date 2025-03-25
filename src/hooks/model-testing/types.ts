
import { z } from 'zod';

export const testModelSchema = z.object({
  model_id: z.string(),
  violation_text: z.string().optional(),
  industry: z.string(),
});

export type TestModelFormValues = z.infer<typeof testModelSchema>;

export interface Detection {
  label: string;
  confidence?: number;
  bbox?: [number, number, number, number];
  text?: string;
  remediationSteps?: string;
  regulations?: {
    id: string;
    title: string;
    relevance: number;
  }[];
}

export interface TestResult {
  id: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status?: 'pending' | 'open' | 'in-progress' | 'resolved';
  imagePreview?: string | null;
  industry?: string;
  location?: string;
  description?: string;
  detections?: Detection[];
  regulationIds?: string[];
  relevanceScores?: number[];
}
