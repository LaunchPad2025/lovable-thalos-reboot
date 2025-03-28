
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

Would you like any of these resources?
- ✅ A fall protection inspection checklist
- ✅ A scaffold safety inspection template
- ✅ A summary of OSHA 1926.501 requirements`;
};

/**
 * Generate a specific fall protection response
 */
export const getFallProtectionResponse = (): string => {
  return `**OSHA Fall Protection Requirements**

OSHA requires fall protection at elevations of 6 feet or higher in construction (1926.501) and 4 feet in general industry (1910.28). Employers must provide one or more of these systems:

- Guardrail systems
- Safety net systems  
- Personal fall arrest systems (harness, lanyard, anchor)

Key requirements include:
- Equipment inspection before each use
- Training on proper use and limitations
- Regular maintenance and documentation
- Rescue planning when using personal fall arrest

Would you like any of these resources?
- ✅ A fall protection daily inspection checklist
- ✅ A scaffold inspection template
- ✅ A summary of OSHA 1926.501 requirements`;
};

/**
 * Get regulation-based response for a topic
 */
export const getRegulationBasedResponse = (topic: string, recentTopics: string[]): string | null => {
  // Special case for fall protection topics
  if (topic.toLowerCase().includes('fall protection') || 
      topic.toLowerCase().includes('fall arrest') || 
      topic.toLowerCase().includes('1926.501') ||
      (topic.toLowerCase().includes('fall') && recentTopics.some(t => 
        t.includes('protection') || t.includes('construction')))) {
    return getFallProtectionResponse();
  }
  
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
