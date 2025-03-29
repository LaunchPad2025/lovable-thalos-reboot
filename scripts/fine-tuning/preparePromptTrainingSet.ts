import fs from "fs";
import path from "path";

// Mock data for approved Paulie responses
const approvedResponses = [
  { question: "What is Regulation A1?", industry: "Finance", citation: "Regulation A1", response: "Regulation A1 is about financial compliance." },
  { question: "Explain Regulation B2.", industry: "Healthcare", citation: "Regulation B2", response: "Regulation B2 pertains to patient data privacy." },
  { question: "Details on Regulation A1?", industry: "Finance", citation: "Regulation A1", response: "Regulation A1 ensures proper auditing." },
  { question: "What does Regulation C3 cover?", industry: "Healthcare", citation: "Regulation C3", response: "Regulation C3 focuses on medical device safety." },
];

// Function to convert responses into JSONL format
const convertToJSONL = (responses: typeof approvedResponses) => {
  return responses
    .map(({ question, response, citation }) => {
      return JSON.stringify({
        prompt: question,
        completion: `${response} (Citation: ${citation})`,
      });
    })
    .join("\n");
};

// Prepare the JSONL training set
const prepareJSONLTrainingSet = () => {
  const jsonlData = convertToJSONL(approvedResponses);

  // Define the output file path
  const outputPath = path.join(__dirname, "training_set.jsonl");

  // Write the JSONL data to a file
  fs.writeFileSync(outputPath, jsonlData, "utf-8");
  console.log(`JSONL training set prepared and saved to ${outputPath}`);
};

// Execute the script
prepareJSONLTrainingSet();
