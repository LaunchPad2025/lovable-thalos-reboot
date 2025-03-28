
/**
 * Main follow-up suggestion generator
 */
import { findMatchingKeywords, getKeywordBasedSuggestions } from './keywordAnalysis';
import { detectIndustry, getIndustrySuggestion } from './industryDetection';
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
  const detectedIndustry = detectIndustry(combinedText);
  
  // Try to find the most relevant keywords first
  const matchingKeywords = findMatchingKeywords(combinedText);
  
  if (matchingKeywords.length > 0) {
    // Get suggestions based on matching keywords
    const keywordSuggestions = getKeywordBasedSuggestions(matchingKeywords);
    suggestions.push(...keywordSuggestions);
  }
  
  // If no specific keywords matched, analyze the intent and provide relevant actionable follow-ups
  if (suggestions.length === 0) {
    const fallbackSuggestions = generateFallbackSuggestions(combinedText);
    suggestions.push(...fallbackSuggestions);
  }
  
  // Add industry-specific suggestions if detected
  if (detectedIndustry && suggestions.length < 3) {
    const industrySuggestion = getIndustrySuggestion(detectedIndustry);
    if (industrySuggestion) {
      suggestions.push(industrySuggestion);
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
