
/**
 * Conversational pattern detection for safety regulation queries
 */

/**
 * Common question patterns that indicate a specific safety domain
 * Used to extract implied topics from natural language queries
 */
export const conversationalPatterns: Record<string, RegExp[]> = {
  'fall protection': [
    /height.*(require|need).*fall protection/i,
    /need.*harness.*(height|work)/i,
    /guardrail.*scaffold/i,
    /roof.*work.*safety/i,
    /prevent.*fall/i
  ],
  'chemical safety': [
    /label.*chemical/i,
    /chemical.*storage/i,
    /sds.*sheet/i,
    /ghs.*label/i,
    /store.*flammable/i
  ],
  'machine safety': [
    /lockout.*tagout/i,
    /lock.*out.*machine/i,
    /machine.*guarding/i,
    /loto.*procedure/i,
    /authorized.*lockout/i
  ],
  'confined space': [
    /confined.*space.*entry/i,
    /permit.*tank.*entry/i,
    /test.*before.*enter/i,
    /confined.*space.*rescue/i,
    /need.*permit.*space/i
  ],
  'ppe': [
    /ppe.*required/i,
    /need.*respirator/i,
    /gloves.*required/i,
    /welding.*ppe/i,
    /check.*ppe/i
  ]
};

/**
 * Detect conversation patterns in a query string
 * 
 * @param query - The user query string
 * @returns Array of matched safety categories
 */
export const detectConversationalPatterns = (query: string): string[] => {
  const matches: string[] = [];
  const normalizedQuery = query.toLowerCase();
  
  for (const [category, patterns] of Object.entries(conversationalPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedQuery)) {
        if (!matches.includes(category)) {
          matches.push(category);
        }
        break;
      }
    }
  }
  
  return matches;
};
