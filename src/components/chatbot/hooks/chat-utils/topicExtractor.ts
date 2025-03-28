
/**
 * Extract the main safety topic from a user query
 */
export const extractTopicFromQuery = (query: string): string => {
  const topicMap: {[key: string]: string} = {
    'chemical': 'chemical safety',
    'fall': 'fall protection',
    'height': 'fall protection',
    'ppe': 'personal protective equipment',
    'protective': 'personal protective equipment',
    'train': 'safety training',
    'inspect': 'safety inspection',
    'hazard': 'hazard assessment',
    'assessment': 'risk assessment',
    'confined': 'confined space',
    'lockout': 'lockout/tagout',
    'tagout': 'lockout/tagout',
    'jsa': 'job safety analysis',
    'welding': 'welding safety',
    'forklift': 'powered industrial trucks'
  };
  
  const queryLower = query.toLowerCase();
  
  for (const [key, topic] of Object.entries(topicMap)) {
    if (queryLower.includes(key)) {
      return topic;
    }
  }
  
  return 'workplace safety';
};
