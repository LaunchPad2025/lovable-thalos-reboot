
/**
 * Extract the main safety topic from a user query
 */
export const extractTopicFromQuery = (query: string): string => {
  const safetyTopics = [
    'hazard assessment', 'hazard', 'risk assessment', 'risk', 
    'training', 'inspection', 'audit', 'compliance', 
    'ppe', 'protective equipment', 'safety equipment',
    'incident', 'accident', 'injury', 'emergency',
    'confined space', 'fall protection', 'lockout', 'tagout',
    'chemical', 'hazcom', 'fire', 'electrical', 'machine',
    'forklift', 'ladder', 'scaffold', 'welding', 'construction',
    'manufacturing', 'healthcare', 'warehouse', 'safety data sheet',
    'sds', 'msds', 'jsa', 'job safety analysis'
  ];
  
  // Extract the main topic from query
  const queryLower = query.toLowerCase();
  let detectedTopic = 'safety';
  
  for (const topic of safetyTopics) {
    if (queryLower.includes(topic)) {
      detectedTopic = topic;
      break;
    }
  }
  
  return detectedTopic;
};
