
import { MLModel } from './types';

// Default models to use when database fetch fails
export const defaultModels: MLModel[] = [
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

export const defaultModelDefinitions = [
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
