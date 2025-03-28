
/**
 * Topic-specific response handlers for common follow-up questions
 */

// Import safety regulation responses from the right location
import { safetyRegulationResponses } from '../../../../data/safetyRegulationData';

/**
 * Generate a response for height-related follow-up questions
 */
export const getHeightRequirementsResponse = (): string => {
  return `**Minimum Height Requirements for Fall Protection**

OSHA specifies different height thresholds by industry:

1. **Construction industry**: 
   - 6 feet or more above a lower level (29 CFR 1926.501)
   - Includes residential construction applications
   - Exceptions apply for specific activities

2. **General industry**: 
   - 4 feet or more above a lower level (29 CFR 1910.28)
   - Applies to most manufacturing and warehousing
   - Additional requirements for fixed ladders and platforms

3. **Shipyards**: 
   - 5 feet or more above a lower level
   - Special requirements for working over water
   - Different standards for various shipyard operations

4. **Longshoring operations**: 
   - 8 feet or more above a lower level
   - Special considerations for dock and vessel work
   - Additional requirements for marine terminals

5. **Special case**: 
   - Any height when working above dangerous equipment
   - Requires guardrails, fall restraint, or fall arrest
   - Specific process for documenting hazard assessment

When implementing your fall protection program, document the specific height thresholds applicable to your workplace and ensure all employees are trained on these requirements.

Would you like a downloadable fall protection planning guide for your industry?

**Related questions you might ask:**
- What are the different types of fall protection systems?
- How do I conduct a fall hazard assessment?
- What documentation is required for my fall protection program?`;
};

/**
 * Get regulation-based response for a topic
 */
export const getRegulationBasedResponse = (topic: string, recentTopics: string[]): string | null => {
  // Check if any topic from the conversation matches our regulations
  for (const regulation of safetyRegulationResponses) {
    if (regulation.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))) {
      // Create a conversational response that builds on previous context and adds practical advice
      const openingPhrases = [
        `Building on what we discussed about ${topic}, `,
        `To add to our conversation about ${topic}, `,
        `Regarding ${topic} that we were discussing, `
      ];
      
      const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
      
      // Create a shortened, conversational version of the regulatory response with practical advice
      let response = regulation.response
        .replace(/According to OSHA|OSHA standard|OSHA regulation/gi, 'the safety guideline')
        .replace(/\([0-9]+ CFR [^\)]+\)/g, ''); // Remove CFR references
      
      // Break into sentences and select just a few relevant ones
      const sentences = response.split(/\.\s+/);
      const simplifiedResponse = sentences.slice(0, 2).join('. ') + '.';
      
      const practicalAdvice = [
        ` In practice, most companies address this by creating standardized procedures, training employees thoroughly, and documenting compliance efforts.`,
        ` To implement this effectively, focus on clear documentation, regular training, and consistent enforcement of these requirements.`,
        ` The most successful safety programs make this practical by integrating these requirements into daily operations and regular inspections.`
      ];
      
      const advice = practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)];
      
      const closingPhrases = [
        ` Would you like a downloadable implementation checklist for this requirement?`,
        ` Would you like to see a practical example of how to document compliance?`,
        ` Would you like some specific steps for implementing this in your workplace?`
      ];
      
      const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
      
      return opening + simplifiedResponse + advice + closing;
    }
  }
  
  return null;
};
