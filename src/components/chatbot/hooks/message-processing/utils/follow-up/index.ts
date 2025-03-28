
/**
 * Main follow-up handling file that orchestrates all follow-up related functionality
 */
import { isFollowUpQuestion } from './detectionUtils';
import { getHeightRequirementsResponse, getRegulationBasedResponse } from './topicResponses';
import { getInspectionFrequencyResponse } from './inspectionResponses';
import { getTrainingFrequencyResponse } from './trainingResponses';
import { 
  getDocumentationResponse,
  getTrainingRecordResponse,
  getForkliftCertificationResponse
} from './documentationResponses';
import {
  getTrainingMatrixResponse,
  getTrainingCalendarResponse
} from './matrixCalendarResponses';
import {
  getAuditPreparationResponse,
  getNearMissResponse
} from './specializedResponses';
import { Message } from '../../../../types';

/**
 * Handle follow-up questions by incorporating previous context and practical advice
 */
export const handleFollowUpQuestion = (recentTopics: string[], query: string, previousMessages: Message[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Find the most recent non-user message to reference
  const previousResponses = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  if (previousResponses.length === 0) return null;
  
  // Get the most recent topic discussed
  const mostRecentTopic = recentTopics[0];
  
  // Handle specific practical questions about documentation, processes, etc.
  if (query.toLowerCase().includes('how do i') || 
      query.toLowerCase().includes('what should') || 
      query.toLowerCase().includes('best way')) {
    
    // Check different types of documentation questions
    const documentationResponse = getDocumentationResponse(query);
    if (documentationResponse) return documentationResponse;
    
    // Check for training record questions
    const trainingRecordResponse = getTrainingRecordResponse(query);
    if (trainingRecordResponse) return trainingRecordResponse;
    
    // Check for forklift certification questions
    const forkliftResponse = getForkliftCertificationResponse(query);
    if (forkliftResponse) return forkliftResponse;
    
    // Check for training matrix questions
    const matrixResponse = getTrainingMatrixResponse(query);
    if (matrixResponse) return matrixResponse;
    
    // Check for training calendar questions
    const calendarResponse = getTrainingCalendarResponse(query);
    if (calendarResponse) return calendarResponse;
    
    // Check for audit preparation questions
    const auditResponse = getAuditPreparationResponse(query);
    if (auditResponse) return auditResponse;
    
    // Check for near-miss tracking questions
    const nearMissResponse = getNearMissResponse(query);
    if (nearMissResponse) return nearMissResponse;
  }
  
  // Handle specific common follow-up patterns
  if (query.toLowerCase().includes('how often')) {
    // Inspection frequency questions
    if (query.toLowerCase().includes('inspect')) {
      for (const topic of recentTopics) {
        return getInspectionFrequencyResponse(topic);
      }
    }
    
    // Training frequency questions
    if (query.toLowerCase().includes('train') || query.toLowerCase().includes('refresher')) {
      for (const topic of recentTopics) {
        return getTrainingFrequencyResponse(topic);
      }
    }
  }
  
  // Check if query is about minimum height requirement
  if (query.toLowerCase().includes('height') || 
      (query.toLowerCase().includes('minimum') && 
       (query.toLowerCase().includes('fall') || recentTopics.includes('fall protection')))) {
    return getHeightRequirementsResponse();
  }
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    const regulationResponse = getRegulationBasedResponse(topic, recentTopics);
    if (regulationResponse) return regulationResponse;
  }
  
  return null;
};

// Re-export everything for backward compatibility
export { isFollowUpQuestion };
