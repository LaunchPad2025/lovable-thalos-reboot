
export interface MLModel {
  id: string;
  name: string;
  description: string | null;
  industry: string;
  version: string;
  model_type: string;
  accuracy: number | null;
  active: boolean;
  created_at: string;
  model_url?: string;
}
