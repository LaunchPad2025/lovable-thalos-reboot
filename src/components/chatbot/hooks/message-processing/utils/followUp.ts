
/**
 * Check if the message appears to be a follow-up question
 */
export const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  // Enhanced detection of follow-up questions with more patterns
  if (previousUserMessages.length === 0) return false;
  
  const followUpIndicators = [
    'what about', 'how about', 'and', 'but', 'so', 'then', 'what if',
    'would', 'could', 'should', 'why', 'when', 'is it', 'are they', 
    'do i need', 'is there', 'what else', 'anything else', 'how often', 
    'do we need', 'what\'s the', 'what is the', 'how much'
  ];
  
  const isShortQuery = query.length < 20;
  const hasFollowUpPhrase = followUpIndicators.some(indicator => 
    query.toLowerCase().includes(indicator)
  );
  const lacksContext = !query.includes('?') && query.split(' ').length < 6;
  
  return previousUserMessages.length > 0 && (isShortQuery || hasFollowUpPhrase || lacksContext);
};

/**
 * Handle follow-up questions by incorporating previous context
 */
export const handleFollowUpQuestion = (recentTopics: string[], query: string, previousMessages: any[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Find the most recent non-user message to reference
  const previousResponses = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  if (previousResponses.length === 0) return null;
  
  // Get the most recent topic discussed
  const mostRecentTopic = recentTopics[0];
  
  // Handle specific common follow-up patterns
  if (query.toLowerCase().includes('how often')) {
    // Inspection frequency questions
    if (query.toLowerCase().includes('inspect')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "For fall protection equipment, OSHA requires inspection before each use by the worker, and formal inspections by a competent person at least annually. After any fall event, the equipment must be immediately removed from service and inspected. Remember to document all inspections in your safety records.";
        } else if (topic.includes('ppe') || topic.includes('protective')) {
          return "PPE should be inspected before each use for signs of damage, wear, or contamination. The inspection frequency also depends on the specific equipment - respirators need inspection before and after each use, while hard hats should be checked daily for cracks or dents. Equipment should also be thoroughly examined by a qualified person according to the manufacturer's recommendations, typically quarterly or annually.";
        } else if (topic.includes('fire') || topic.includes('extinguisher')) {
          return "Fire extinguishers require monthly visual inspections (checking pressure gauge, condition, accessibility) and annual maintenance checks by a certified professional. Hydrostatic testing is required every 5-12 years depending on the type. Keep records of all inspections to demonstrate compliance.";
        }
      }
      // Generic inspection answer if no specific topic
      return "Most safety equipment requires inspection before each use by the worker, with formal documented inspections by a qualified person on a regular schedule - often monthly, quarterly, or annually depending on the equipment type and manufacturer specifications. High-risk or critical safety equipment typically requires more frequent inspection.";
    }
    
    // Training frequency questions
    if (query.toLowerCase().includes('train') || query.toLowerCase().includes('refresher')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "OSHA requires fall protection refresher training whenever there are changes in the workplace that render previous training obsolete, changes in the types of fall protection systems or equipment used, or when a worker shows inadequate knowledge or use of fall protection systems. At minimum, annual refresher training is considered a best practice. Make sure to document all training sessions with dates, topics covered, and employee signatures.";
        } else if (topic.includes('lockout') || topic.includes('tagout')) {
          return "For Lockout/Tagout procedures, OSHA requires retraining whenever there's a change in job assignments, machines, equipment or processes, or when a new hazard is introduced. Additionally, refresher training is required whenever an inspection reveals problems with employee knowledge. The standard practice is to conduct refresher training annually. Always keep detailed training records.";
        } else if (topic.includes('hazard communication') || topic.includes('hazcom')) {
          return "Hazard Communication training refreshers should be provided whenever a new chemical hazard is introduced into the work area. While OSHA doesn't specify a refresher frequency, industry best practice is to conduct annual refresher training to ensure employees maintain their knowledge of chemical hazards, labeling systems, and safety data sheets.";
        }
      }
      // Generic training answer if no specific topic
      return "Most safety training programs require refresher training at least annually as a best practice, though OSHA's specific requirements vary by standard. Additionally, retraining is typically required when procedures change, new equipment is introduced, or when workplace observations indicate a need for additional training. The key is to document all training thoroughly, including content, dates, and employee verification.";
    }
  }
  
  // Check if query is about minimum height requirement
  if (query.toLowerCase().includes('height') || 
      (query.toLowerCase().includes('minimum') && 
       (query.toLowerCase().includes('fall') || recentTopics.includes('fall protection')))) {
    return "In construction, OSHA requires fall protection when working at heights of 6 feet or more above a lower level (29 CFR 1926.501). For general industry, the threshold is 4 feet (29 CFR 1910.28). In shipyards it's 5 feet, and for longshoring operations it's 8 feet. Remember that regardless of height, if there's a risk of falling onto dangerous equipment, fall protection is required. Always assess each situation for potential hazards.";
  }
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    for (const regulation of safetyRegulationResponses) {
      if (regulation.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))) {
        // Create a conversational response that builds on previous context
        const openingPhrases = [
          `Building on what we discussed about ${topic}, `,
          `To add to our conversation about ${topic}, `,
          `Regarding ${topic} that we were discussing, `,
          `Following up on ${topic}, `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        
        // Create a shortened, conversational version of the regulatory response
        let response = regulation.response
          .replace(/According to OSHA|OSHA standard|OSHA regulation/gi, 'the safety guideline')
          .replace(/\([0-9]+ CFR [^\)]+\)/g, ''); // Remove CFR references
        
        // Break into sentences and select just a few relevant ones
        const sentences = response.split(/\.\s+/);
        const simplifiedResponse = sentences.slice(0, 2).join('. ') + '.';
        
        const closingPhrases = [
          ` Would you like more specific details about implementation?`,
          ` Is there a specific aspect of this requirement you're concerned about?`,
          ` I can provide a simple checklist for compliance if that would help.`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + simplifiedResponse + closing;
      }
    }
  }
  
  return null;
};

// Import from the proper location
import { safetyRegulationResponses } from '../../../data/safetyRegulationData';
