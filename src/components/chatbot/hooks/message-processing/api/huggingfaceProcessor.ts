
import { Message } from '../../../types';
import { processWithHuggingFace, suggestFollowUpQuestions } from '@/utils/huggingfaceUtils';
import { isFollowUpQuestion } from '../utils/follow-up';
import { generateFollowUpQuestions } from '@/utils/conversationUtils';

/**
 * Process message using Hugging Face API with improved context handling
 * and practical workplace safety focus
 */
export const processWithAI = async (
  content: string, 
  allMessages: Message[]
): Promise<string> => {
  try {
    console.log("Attempting to process with HuggingFace API");
    
    // Identify clear follow-up questions to provide better context
    const previousUserMessages = allMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .slice(-3);
      
    const isFollowUp = isFollowUpQuestion(content, previousUserMessages);
    if (isFollowUp) {
      console.log("Detected follow-up question, providing additional context to model");
    }
    
    // Check if this is a documentation or procedure question that needs formatting
    const needsFormatting = checkIfNeedsFormatting(content);
    if (needsFormatting) {
      console.log("Documentation or procedure question detected, will enhance formatting");
    }
    
    // Process with context-awareness
    const aiResponse = await processWithHuggingFace(content, allMessages);
    console.log("Hugging Face processing successful");
    
    // Apply formatting to the response if needed
    if (needsFormatting) {
      return formatPracticalResponse(aiResponse, content);
    }
    
    return aiResponse;
  } catch (error) {
    console.error('Error with Hugging Face processing:', error);
    throw error; // Propagate the error to be handled by the caller
  }
};

/**
 * Generate follow-up suggestions based on conversation context
 * with a focus on practical next steps
 */
export const generateSuggestions = (
  content: string,
  aiResponse: string
): string[] => {
  return suggestFollowUpQuestions(content, aiResponse);
};

/**
 * Check if this is a question about documentation, procedures, or other topics that 
 * would benefit from structured formatting
 */
const checkIfNeedsFormatting = (content: string): boolean => {
  const formattingKeywords = [
    'how do i', 'what should', 'best way', 
    'document', 'record', 'track', 'log',
    'checklist', 'template', 'form', 'matrix',
    'calendar', 'schedule', 'procedure', 'process',
    'inspect', 'audit', 'assessment', 'evaluation'
  ];
  
  return formattingKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
};

/**
 * Apply improved formatting to practical responses, especially for
 * documentation, procedures, and process questions
 */
const formatPracticalResponse = (response: string, query: string): string => {
  // Identify topic for heading
  const topicWords = [
    'documentation', 'inspection', 'training', 'audit', 
    'checklist', 'matrix', 'calendar', 'procedure', 
    'assessment', 'forklift', 'ppe', 'fall protection'
  ];
  
  let detectedTopic = '';
  for (const topic of topicWords) {
    if (query.toLowerCase().includes(topic) || response.toLowerCase().includes(topic)) {
      detectedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
      break;
    }
  }
  
  if (!detectedTopic) {
    detectedTopic = 'Safety';
  }
  
  // Add a heading if the response doesn't already have one
  if (!response.includes('**')) {
    const headings = [
      `**${detectedTopic} Best Practices**`,
      `**${detectedTopic} Documentation Guide**`,
      `**${detectedTopic} Implementation Steps**`,
      `**Essential ${detectedTopic} Procedures**`
    ];
    
    const heading = headings[Math.floor(Math.random() * headings.length)];
    response = heading + "\n\n" + response;
  }
  
  // Format lists if they exist but aren't well-formatted
  if ((response.includes("1.") || response.includes("•") || response.includes("-")) && 
      !response.includes("   -")) {
    
    // Convert basic numbered lists to formatted lists with subpoints
    response = response.replace(/(\d+\.\s+)([A-Z][^\.]+)\.(\s+)([A-Z])/g, "$1$2.\n\n$1$4");
    
    // Convert plain hyphens to properly formatted list items
    response = response.replace(/^-\s+/gm, "- ");
    
    // Add subpoints formatting if there appears to be a list structure without it
    if (response.includes("1.") && response.includes("2.") && !response.includes("   -")) {
      // Check for phrases that suggest subpoints
      const subpointPhrases = ["including", "such as", "for example", "like", "e.g."];
      
      for (const phrase of subpointPhrases) {
        response = response.replace(
          new RegExp(`(\\d+\\.\\s+[^\\n]+)${phrase}([^\\n]+)`, "gi"),
          (match, listItem, subItems) => {
            // Convert the subItems into a list of subpoints
            const subItemsList = subItems.split(/,\s*/).map(item => `   - ${item.trim()}`).join('\n');
            return `${listItem}:\n${subItemsList}`;
          }
        );
      }
    }
  }
  
  // Fix run-on sentences
  response = response.replace(/(\w)\s+([A-Z])/g, "$1. $2");
  response = response.replace(/(\w)\s+(Would you like|Should I|Do you need|Want|Need)/g, "$1. $2");
  
  // Add a downloadable offer if there isn't one already
  if (!response.includes("download") && !response.includes("template") && !response.includes("Would you like")) {
    response += `\n\nWould you like a downloadable ${detectedTopic.toLowerCase()} template that you can customize for your workplace?`;
  }
  
  return response;
};
