import fs from "fs";
import path from "path";

// Mock data for media detection
const mediaDetectionData = [
  { mediaType: "Image", description: "Contains sensitive content", label: "Sensitive" },
  { mediaType: "Video", description: "Safe for all audiences", label: "Safe" },
  { mediaType: "Audio", description: "Contains explicit language", label: "Explicit" },
  { mediaType: "Text", description: "Safe and informative", label: "Safe" },
];

// Function to convert media detection data into JSONL format
const convertToJSONL = (data: typeof mediaDetectionData) => {
  return data
    .map(({ mediaType, description, label }) => {
      return JSON.stringify({
        prompt: `Analyze the following ${mediaType}: ${description}`,
        completion: `Label: ${label}`,
      });
    })
    .join("\n");
};

// Prepare the JSONL media detection set
const prepareMediaDetectionSet = () => {
  const jsonlData = convertToJSONL(mediaDetectionData);

  // Define the output file path
  const outputPath = path.join(__dirname, "media_detection_set.jsonl");

  // Write the JSONL data to a file
  fs.writeFileSync(outputPath, jsonlData, "utf-8");
  console.log(`Media detection set prepared and saved to ${outputPath}`);
};

// Mock data for labeled media violations
const mediaViolations = [
  {
    media_type: "Image",
    cue_type: "Visual",
    regulation_code: "Reg-A1",
    industry: "Finance",
    risk_level: "High",
    description: "Contains sensitive financial data.",
  },
  {
    media_type: "Video",
    cue_type: "Audio-Visual",
    regulation_code: "Reg-B2",
    industry: "Healthcare",
    risk_level: "Medium",
    description: "Shows patient data without consent.",
  },
  {
    media_type: "Audio",
    cue_type: "Audio",
    regulation_code: "Reg-C3",
    industry: "Education",
    risk_level: "Low",
    description: "Contains explicit language in educational content.",
  },
  {
    media_type: "Text",
    cue_type: "Textual",
    regulation_code: "Reg-D4",
    industry: "Technology",
    risk_level: "Medium",
    description: "Includes proprietary code snippets.",
  },
];

// Function to convert media violations into NDJSON format
const convertToNDJSON = (violations: typeof mediaViolations) => {
  return violations
    .map((violation) => JSON.stringify(violation))
    .join("\n");
};

// Prepare the NDJSON media violation set
const prepareMediaViolationSet = () => {
  const ndjsonData = convertToNDJSON(mediaViolations);

  // Define the output file path
  const outputPath = path.join(__dirname, "media_violations_set.ndjson");

  // Write the NDJSON data to a file
  fs.writeFileSync(outputPath, ndjsonData, "utf-8");
  console.log(`Media violations set prepared and saved to ${outputPath}`);
};

// Execute the scripts
prepareMediaDetectionSet();
prepareMediaViolationSet();
