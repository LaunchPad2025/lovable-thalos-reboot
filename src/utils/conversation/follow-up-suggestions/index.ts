
/**
 * Main follow-up suggestion generator
 */
import { findMatchingKeywords, getKeywordBasedSuggestions } from './keywordAnalysis';
import { detectIndustryContext, getIndustrySpecificSuggestions } from './industry';
import { generateFallbackSuggestions, ensurePracticalFollowUp } from './fallbackSuggestions';

/**
 * Generate relevant and actionable follow-up questions based on the conversation
 * with improved formatting and organization
 * @param userQuery Last user message
 * @param aiResponse Last AI response
 * @returns Array of follow-up question suggestions
 */
export function generateFollowUpQuestions(userQuery: string, aiResponse: string): string[] {
  // Check for keywords in the user query and AI response
  const combinedText = (userQuery + ' ' + aiResponse).toLowerCase();
  const suggestions: string[] = [];
  
  // Detect industry context first for more relevant suggestions
  const detectedIndustry = detectIndustryContext(combinedText);
  
  // Try to find the most relevant keywords first
  const matchingKeywords = findMatchingKeywords(combinedText);
  
  // Check for specific safety categories to tailor suggestions
  const safetyCategories = {
    'fall protection': [
      "What are the inspection requirements for fall protection equipment?",
      "How do I develop a site-specific fall protection plan?",
      "What training is required for workers using fall protection?"
    ],
    'chemical safety': [
      "What GHS labels are required for chemical containers?",
      "How should we store incompatible chemicals?",
      "What training is required for employees who work with chemicals?"
    ],
    'machine safety': [
      "What are the key components of a lockout/tagout program?",
      "Who needs to be trained on lockout/tagout procedures?",
      "How often should we review our machine guarding?"
    ],
    'confined space': [
      "What testing is required before confined space entry?",
      "Who needs to be involved in a confined space entry?",
      "What rescue provisions are required for confined spaces?"
    ],
    'respiratory protection': [
      "How often should we conduct respirator fit testing?",
      "What medical evaluations are required for respirator users?",
      "How should we document respirator training?"
    ],
    'fire safety': [
      "How often should fire extinguishers be inspected?",
      "What elements should be included in a fire prevention plan?",
      "What training is required for emergency evacuation procedures?"
    ]
  };
  
  // Check if any safety category is mentioned in the text
  for (const [category, categoryQuestions] of Object.entries(safetyCategories)) {
    if (combinedText.includes(category)) {
      // Add category-specific suggestions
      suggestions.push(...categoryQuestions.slice(0, 2));
      break; // Only use one category to avoid too many similar suggestions
    }
  }
  
  // If we still have room for more suggestions
  if (suggestions.length < 2 && matchingKeywords.length > 0) {
    // Get suggestions based on matching keywords
    const keywordSuggestions = getKeywordBasedSuggestions(matchingKeywords);
    
    // Add suggestions that don't duplicate what we already have
    for (const suggestion of keywordSuggestions) {
      if (!suggestions.includes(suggestion) && suggestions.length < 2) {
        suggestions.push(suggestion);
      }
    }
  }
  
  // If no specific keywords matched, analyze the intent and provide relevant actionable follow-ups
  if (suggestions.length === 0) {
    const fallbackSuggestions = generateFallbackSuggestions(combinedText);
    suggestions.push(...fallbackSuggestions);
  }
  
  // Add industry-specific suggestions if detected
  if (detectedIndustry && suggestions.length < 3) {
    const industrySuggestion = getIndustrySpecificSuggestions(detectedIndustry);
    if (industrySuggestion && industrySuggestion.length > 0) {
      suggestions.push(industrySuggestion[0]);
    }
  }
  
  // Ensure we have at least 2 suggestions
  if (suggestions.length < 2) {
    suggestions.push('Would you like a downloadable template or sample document for this topic?');
  }
  
  // Add a specific practical follow-up
  const updatedSuggestions = ensurePracticalFollowUp(suggestions);
  
  // Make sure we're not repeating suggestions
  return [...new Set(updatedSuggestions)].slice(0, 3); 
}
