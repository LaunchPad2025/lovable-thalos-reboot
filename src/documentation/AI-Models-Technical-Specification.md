
# Thalos AI Models Technical Specification

This document provides detailed technical specifications for the AI models used in the Thalos platform, including architecture details, training methodologies, and integration approaches.

## 1. Computer Vision Models

### 1.1 Safety Violation Detection Models

#### Architecture Overview

| Model | Base Architecture | Purpose | Input Size | Output |
|-------|------------------|---------|------------|--------|
| ThalosDetect-Base | YOLOv8n | General violation detection | 640x640 | Bounding boxes, class labels, confidence scores |
| ThalosDetect-PPE | YOLOv8s | PPE compliance detection | 640x640 | Bounding boxes, class labels, confidence scores |
| ThalosDetect-Construction | YOLOv8m | Construction-specific violations | 640x640 | Bounding boxes, class labels, confidence scores |
| ThalosDetect-Manufacturing | YOLOv8m | Manufacturing-specific violations | 640x640 | Bounding boxes, class labels, confidence scores |

#### Model Capabilities & Violation Classes

**ThalosDetect-Base**
- Missing hard hat
- Missing safety vest
- Missing safety glasses
- Missing gloves
- Improper lifting
- Tripping hazards
- Blocked exits
- Improper tool usage

**ThalosDetect-PPE (Additional)**
- Missing face shield
- Missing hearing protection
- Missing respirator
- Missing fall protection
- Improper PPE wear

**ThalosDetect-Construction (Additional)**
- Scaffold safety issues
- Ladder safety violations
- Unprotected edges
- Electrical hazards
- Excavation hazards
- Crane operation issues

**ThalosDetect-Manufacturing (Additional)**
- Machine guarding issues
- Lockout/tagout violations
- Chemical handling violations
- Ergonomic issues
- Confined space violations

#### Performance Metrics

| Model | mAP@0.5 | mAP@0.5:0.95 | Inference Time (ms) | Model Size (MB) |
|-------|---------|--------------|---------------------|-----------------|
| ThalosDetect-Base | 0.83 | 0.72 | 23 | 6.5 |
| ThalosDetect-PPE | 0.87 | 0.76 | 38 | 12.8 |
| ThalosDetect-Construction | 0.81 | 0.70 | 78 | 25.4 |
| ThalosDetect-Manufacturing | 0.79 | 0.68 | 78 | 25.4 |

#### Training Methodology

1. **Data Collection & Annotation**
   - Curated dataset of 25,000+ safety violation images
   - Annotation using COCO format with polygon segmentation
   - 80/20 train/validation split

2. **Model Training**
   - Transfer learning from pretrained YOLO models
   - Training hyperparameters:
     - Batch size: 16
     - Learning rate: 0.001 with cosine decay
     - Epochs: 100
     - Data augmentation: random flip, rotation, brightness, contrast
   - Early stopping with patience of 15 epochs

3. **Optimization**
   - Quantization to int8 for edge deployment
   - TensorRT optimization for GPU inference
   - ONNX conversion for cross-platform compatibility

### 1.2 Model Selection System

#### Industry-based Model Selection Logic

```python
def select_model(industry, image_type, device_capability):
    # Base model selection by industry
    if industry == "construction":
        primary_model = "ThalosDetect-Construction"
        fallback_model = "ThalosDetect-Base"
    elif industry == "manufacturing":
        primary_model = "ThalosDetect-Manufacturing"
        fallback_model = "ThalosDetect-Base"
    else:
        primary_model = "ThalosDetect-Base"
        fallback_model = "ThalosDetect-Base"
    
    # Adjust for PPE-specific detection
    if image_type == "ppe_compliance":
        if industry in ["construction", "manufacturing"]:
            return "ThalosDetect-PPE"
    
    # Check device capability
    if device_capability == "low":
        return fallback_model
    
    return primary_model
```

#### Confidence Score Calibration

Confidence scores are calibrated using temperature scaling to provide more accurate probability estimates.

```python
def calibrate_confidence(raw_confidence, model_name):
    # Model-specific temperature parameters
    temperature_params = {
        "ThalosDetect-Base": 1.2,
        "ThalosDetect-PPE": 1.1,
        "ThalosDetect-Construction": 1.3,
        "ThalosDetect-Manufacturing": 1.35
    }
    
    # Apply temperature scaling
    temp = temperature_params.get(model_name, 1.0)
    calibrated_confidence = raw_confidence ** (1/temp)
    
    return calibrated_confidence
```

### 1.3 Model Integration Pipeline

#### Input Processing

1. **Image Validation**
   - File format validation (JPEG, PNG, WebP)
   - Dimension check (minimum 224x224)
   - Aspect ratio preservation

2. **Preprocessing**
   - Resize to model input dimensions
   - Normalization (0-1 scaling)
   - Channel ordering (RGB)

#### Inference Pipeline

1. **Model Loading**
   - Dynamic model selection based on industry and context
   - Model caching for frequent requests
   - Warm-up inference for stable performance

2. **Batch Processing**
   - Optional batching for multiple images
   - Priority queue for critical requests

3. **Post-processing**
   - Non-maximum suppression for overlapping detections
   - Confidence thresholding (default: 0.35)
   - Class filtering based on context

#### Output Format

```json
{
  "detections": [
    {
      "label": "missing_hardhat",
      "confidence": 0.92,
      "bbox": [120, 80, 210, 240],
      "regulations": [
        {
          "id": "29-CFR-1926.100",
          "title": "Head protection",
          "relevance": 0.98
        }
      ]
    },
    {
      "label": "tripping_hazard",
      "confidence": 0.87,
      "bbox": [350, 420, 520, 480],
      "regulations": [
        {
          "id": "29-CFR-1926.25",
          "title": "Housekeeping",
          "relevance": 0.93
        }
      ]
    }
  ],
  "metadata": {
    "model_used": "ThalosDetect-Construction",
    "processing_time_ms": 85,
    "image_dimensions": [640, 480]
  }
}
```

## 2. Natural Language Processing Models

### 2.1 Paulie Copilot Assistant

#### Model Architecture

| Component | Model | Purpose |
|-----------|-------|---------|
| Core Assistant | GPT-3.5 Turbo | General safety advice, conversation |
| Regulation Knowledge | Fine-tuned GPT model | Specific safety regulation information |
| Remediation Generator | Fine-tuned model | Generate violation remediation steps |

#### System Prompts

**Base System Prompt**
```
You are Paulie, an AI safety assistant specializing in workplace safety and compliance. 
You help safety managers and workers understand safety regulations, identify potential 
hazards, and implement appropriate control measures. Your expertise covers OSHA regulations, 
industry best practices, and practical safety implementation.

When providing guidance:
1. Be clear, concise, and practical
2. Reference specific regulations when applicable
3. Focus on actionable advice
4. Explain the rationale behind safety requirements
5. Adapt your advice to the specific industry context
```

**Regulation Specialist Prompt (Additional)**
```
When discussing regulations:
1. Reference the specific section and subsection
2. Explain the requirement in plain language
3. Provide practical implementation guidance
4. Note any exceptions or special cases
5. Suggest documentation needed for compliance
```

#### Safety Knowledge Base

The NLP models are supplemented with a structured knowledge base containing:

1. **Regulation Corpus**
   - OSHA 29 CFR 1910 (General Industry)
   - OSHA 29 CFR 1926 (Construction)
   - OSHA 29 CFR 1915 (Maritime)
   - NFPA codes and standards
   - ANSI standards
   - International standards (ISO, IEC)

2. **Industry-Specific Guidelines**
   - Construction safety best practices
   - Manufacturing safety procedures
   - Warehouse and logistics safety guidelines
   - Healthcare facility safety requirements

3. **Remediation Templates**
   - Structured templates for common violations
   - Step-by-step remediation procedures
   - Required resources and equipment
   - Verification and documentation procedures

### 2.2 Remediation Recommendation Engine

#### Implementation Details

The remediation engine uses a combination of rule-based templates and AI-generated content:

1. **Violation Classification**
   - Map detected violations to violation taxonomy
   - Determine severity and urgency
   - Identify applicable regulations

2. **Template Selection**
   - Select appropriate remediation template
   - Customize template based on context
   - Fill in specific details from violation

3. **AI Enhancement**
   - Generate additional remediation steps as needed
   - Refine language for clarity and actionability
   - Add contextual details from the image

#### Example Output

For a detected "missing_hardhat" violation:

```
## Safety Violation: Missing Hard Hat in Construction Zone

### Immediate Actions:
1. Stop work in the affected area
2. Provide proper head protection (Type II hard hat) to the worker
3. Verify proper fitting and condition of the hard hat
4. Document the corrective action

### Root Cause Analysis:
1. Interview worker to determine why proper PPE was not worn
2. Check if adequate PPE is available at the worksite
3. Review site PPE requirements and communication

### Preventive Measures:
1. Conduct toolbox talk on head protection requirements
2. Implement PPE checkpoint at site entrance
3. Post signage at entry points to PPE-required areas
4. Update site safety plan with specific PPE zones

### Regulatory Reference:
29 CFR 1926.100(a) - Employees working in areas where there is a possible danger of head injury from impact, falling or flying objects, or electrical shock and burns, shall be protected by protective helmets.
```

## 3. Future AI Development Roadmap

### 3.1 Planned Model Improvements

#### Short-Term (3-6 months)
- **Expanded Detection Classes**: Add 15+ new violation types
- **Multi-Frame Analysis**: Improved detection across multiple frames
- **Temporal Consistency**: Track violations across image sequences
- **Uncertainty Quantification**: Better confidence estimation

#### Medium-Term (6-12 months)
- **Video Analysis**: Real-time violation detection in video streams
- **Activity Recognition**: Detect unsafe behaviors and actions
- **Person Tracking**: Track individuals across frames for continuous monitoring
- **Multimodal Fusion**: Combine image data with sensor data

#### Long-Term (12+ months)
- **Anomaly Detection**: Identify unusual patterns without explicit training
- **Predictive Analytics**: Forecast potential safety issues before they occur
- **Continuous Learning**: Models that improve from operational feedback
- **Custom Model Training**: User-trainable models for specific environments

### 3.2 Technical Challenges and Solutions

| Challenge | Impact | Proposed Solution |
|-----------|--------|------------------|
| Limited labeled data | Reduced model accuracy | Synthetic data generation, active learning |
| Variable lighting conditions | Inconsistent detection | Robust augmentation, domain adaptation |
| Occlusion and crowded scenes | Missed violations | Part-based detection, scene decomposition |
| Real-time processing requirements | Latency issues | Model distillation, hardware acceleration |
| Privacy concerns | User resistance | On-device processing, anonymization techniques |

## 4. Integration Guidelines

### 4.1 Edge Function Implementation

The AI models are exposed through Supabase Edge Functions with the following endpoints:

1. **`/analyze-violation`**
   - **Method**: POST
   - **Purpose**: Analyze image for safety violations
   - **Parameters**:
     - `image`: Base64-encoded image or image URL
     - `industry`: Industry context
     - `modelId`: (Optional) Specific model to use

2. **`/generate-remediation`**
   - **Method**: POST
   - **Purpose**: Generate remediation steps for a violation
   - **Parameters**:
     - `violationType`: Type of violation
     - `context`: Additional contextual information
     - `regulations`: Relevant regulations

### 4.2 Frontend Integration

```typescript
// Example usage of violation analysis API
const analyzeImage = async (imageFile: File, industry: string) => {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Call analysis endpoint
    const { data, error } = await supabase.functions.invoke('analyze-violation', {
      body: {
        image: base64Image,
        industry: industry,
        violationText: '',  // Optional text description
      }
    });
    
    if (error) throw error;
    
    // Process results
    const violations = data.detections.map(detection => ({
      type: detection.label,
      confidence: detection.confidence,
      location: getBoundingBoxCoordinates(detection.bbox),
      regulations: detection.regulations || []
    }));
    
    return {
      violations,
      imagePreview: data.imagePreview,
      severity: calculateOverallSeverity(violations)
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
```

## 5. Model Maintenance and Governance

### 5.1 Model Monitoring

1. **Performance Metrics Tracking**
   - Accuracy, precision, recall tracking over time
   - Drift detection for data and concept drift
   - User feedback collection and analysis

2. **Alert Thresholds**
   - Alert when accuracy drops below 75%
   - Alert when processing time exceeds 200ms
   - Alert when error rate exceeds 5%

### 5.2 Retraining Schedule

| Model | Retraining Frequency | Trigger Conditions |
|-------|----------------------|-------------------|
| Base Detection | Quarterly | Accuracy drop >5%, New violation types |
| Industry-Specific | Bi-annually | Accuracy drop >7%, New regulations |
| PPE Detection | Quarterly | Accuracy drop >5%, New PPE types |

### 5.3 Model Versioning

**Version Naming Convention**: `[model]-[major].[minor].[patch]`
- **Major**: Significant architecture changes
- **Minor**: New capabilities or classes
- **Patch**: Performance improvements, bug fixes

**Deployment Strategy**:
- Shadow deployment for A/B testing
- Gradual rollout to monitor performance
- Fallback capability to previous version

## Conclusion

This technical specification provides a comprehensive overview of the AI models powering the Thalos platform. It serves as a reference for developers integrating with these models and provides a foundation for future AI development efforts.

As the platform evolves, these specifications will be updated to reflect new capabilities, improved performance, and additional AI features as outlined in the product roadmap.
