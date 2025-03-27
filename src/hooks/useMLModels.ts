import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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

// Default models to use when database fetch fails
const defaultModels: MLModel[] = [
  {
    id: 'default-1',
    name: "YOLOv8",
    description: "Detect missing PPE (helmets, vests, gloves) in real-time",
    industry: "Construction",
    version: "v8m",
    model_type: "Image (Object Detection)",
    accuracy: 93.5,
    active: true,
    created_at: new Date().toISOString(),
    model_url: "https://huggingface.co/ultralytics/yolov8m"
  },
  {
    id: 'default-2',
    name: "BLIP2",
    description: "Provide natural language scene understanding for Copilot \"Paulie\"",
    industry: "All",
    version: "Flan-T5-XL",
    model_type: "Multimodal (Image + Text)",
    accuracy: 96.7,
    active: true,
    created_at: new Date().toISOString(),
    model_url: "https://huggingface.co/Salesforce/blip2-flan-t5-xl"
  }
];

export function useMLModels() {
  return useQuery({
    queryKey: ['ml-models'],
    queryFn: async () => {
      try {
        // Check if we have models in the database
        const { data: existingModels, error } = await supabase
          .from('ml_models')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching models:", error);
          throw error;
        }
        
        // If there are no models, add our default models
        if (!existingModels || existingModels.length === 0) {
          console.log("No models found, inserting default models");
          const newDefaultModels = [
            {
              name: "YOLOv8",
              description: "Detect missing PPE (helmets, vests, gloves) in real-time",
              industry: "Construction",
              version: "v8m",
              model_type: "Image (Object Detection)",
              accuracy: 93.5,
              active: true,
              model_url: "https://huggingface.co/ultralytics/yolov8m"
            },
            {
              name: "Cascade R-CNN",
              description: "High-accuracy detection of subtle PPE violations and overlaps",
              industry: "Construction",
              version: "Detectron2",
              model_type: "Image (Object Detection)",
              accuracy: 95.2,
              active: true,
              model_url: "https://huggingface.co/facebook/detectron2"
            },
            {
              name: "HRNet",
              description: "Detect unsafe posture (bending, crouching, overhead lifting)",
              industry: "Manufacturing",
              version: "W32",
              model_type: "Image (Pose Estimation)",
              accuracy: 91.8,
              active: true,
              model_url: "https://huggingface.co/openmmlab/hrnet-w32-human-pose-estimation"
            },
            {
              name: "DeepLabv3+",
              description: "Segment hazardous areas (open trenches, blocked exits, spill zones)",
              industry: "Warehousing",
              version: "B0-512",
              model_type: "Image (Semantic Segmentation)",
              accuracy: 89.4,
              active: true,
              model_url: "https://huggingface.co/nvidia/segformer-b0-finetuned-ade-512-512"
            },
            {
              name: "BLIP2",
              description: "Provide natural language scene understanding for Copilot \"Paulie\"",
              industry: "All",
              version: "Flan-T5-XL",
              model_type: "Multimodal (Image + Text)",
              accuracy: 96.7,
              active: true,
              model_url: "https://huggingface.co/Salesforce/blip2-flan-t5-xl"
            },
            // Add the new models
            {
              name: "SAM ViT",
              description: "Super precise segmentation for fine-grained detection of zones, tools, and detailed gear",
              industry: "Energy",
              version: "Huge",
              model_type: "Image (Instance Segmentation)",
              accuracy: 97.2,
              active: true,
              model_url: "https://huggingface.co/facebook/sam-vit-huge"
            },
            {
              name: "OwlViT",
              description: "Natural language visual queries for interpreting safety situations in images",
              industry: "All",
              version: "Base-Patch32",
              model_type: "Multimodal (Text + Image)",
              accuracy: 92.8,
              active: true,
              model_url: "https://huggingface.co/google/owlvit-base-patch32"
            },
            {
              name: "OpenPose",
              description: "Lightweight alternative to HRNet; detects full-body posture for ergonomics, slips/falls, lifting safety",
              industry: "Manufacturing",
              version: "1.0",
              model_type: "Image (Keypoint/Pose Estimation)",
              accuracy: 88.5,
              active: true,
              model_url: "https://huggingface.co/spaces/akhaliq/openpose"
            },
            {
              name: "I3D",
              description: "Detects unsafe actions in video streams like running near machinery or unsafe climbing",
              industry: "Construction",
              version: "ConvNet",
              model_type: "Video (Action Recognition)",
              accuracy: 90.3,
              active: true,
              model_url: "https://github.com/deepmind/kinetics-i3d"
            }
          ];
          
          // Insert the models into the database
          try {
            const { data: insertedModels, error: insertError } = await supabase
              .from('ml_models')
              .insert(newDefaultModels)
              .select();
              
            if (insertError) {
              console.error("Error inserting default models:", insertError);
              throw insertError;
            }
            
            console.log("Successfully inserted default models");
            return insertedModels as MLModel[];
          } catch (insertErr) {
            console.error("Failed to insert default models:", insertErr);
            // If insertion fails, return hardcoded default models
            return defaultModels;
          }
        }
        
        console.log(`Found ${existingModels.length} models in database`);
        return existingModels as MLModel[];
      } catch (err) {
        console.error("Exception in useMLModels:", err);
        // If anything fails, return hardcoded default models
        return defaultModels;
      }
    },
    retry: 1, // Retry once in case of network issues
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useMLModelsByIndustry(industry: string | null) {
  return useQuery({
    queryKey: ['ml-models', 'industry', industry],
    queryFn: async () => {
      if (!industry) return [];
      
      const { data, error } = await supabase
        .from('ml_models')
        .select('*')
        .eq(industry === 'All' ? 'active' : 'industry', industry === 'All' ? true : industry)
        .eq('active', true)
        .order('accuracy', { ascending: false });
      
      if (error) throw error;
      return data as MLModel[];
    },
    enabled: !!industry
  });
}

export function useMLModelById(modelId: string | undefined) {
  return useQuery({
    queryKey: ['ml-models', 'id', modelId],
    queryFn: async () => {
      if (!modelId) return null;
      
      const { data, error } = await supabase
        .from('ml_models')
        .select('*')
        .eq('id', modelId)
        .single();
      
      if (error) throw error;
      return data as MLModel;
    },
    enabled: !!modelId
  });
}

