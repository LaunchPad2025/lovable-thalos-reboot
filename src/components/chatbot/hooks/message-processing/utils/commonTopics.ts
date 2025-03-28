
/**
 * Generate responses for common safety topics
 */
export const getResponseForCommonTopic = (query: string): string | null => {
  if (query.includes('ppe') || query.includes('equipment') || query.includes('protection')) {
    return "Thanks for asking about personal protective equipment (PPE)! Let me help with that.\n\n• Employers need to assess workplace hazards and provide appropriate PPE at no cost to employees\n• Common required equipment includes hard hats, safety glasses, gloves, and job-specific gear\n• You'll need proper training on when and how to use each piece of equipment\n\nWhat specific PPE are you concerned about implementing in your workplace?";
  } else if (query.includes('height') || query.includes('fall') || query.includes('elevation')) {
    return "Fall protection is definitely important! Here's what you should know:\n\n• Protection is required at 6 feet or more in construction (4 feet in general industry)\n• Your options include guardrails, safety nets, or personal fall arrest systems\n• Each system has specific requirements - for example, guardrails need to be 42 inches high and withstand 200 pounds of force\n\nAre you working on a specific height safety situation I can help with?";
  } else if (query.includes('chemical') || query.includes('hazardous') || query.includes('storage')) {
    return "Great question about chemical storage! Here's what you need to know:\n\n• You'll need proper labeling, accessible Safety Data Sheets, and employee training\n• For flammable liquids, storage cabinets must limit internal temperature to 325°F during fires\n• You're limited to 60 gallons of Class I or II liquids (or 120 gallons of Class III) per cabinet\n\nWhat specific chemicals are you working with? I can provide more targeted advice.";
  } else if (query.includes('waste') || query.includes('disposal') || query.includes('epa')) {
    return "Thanks for asking about waste management. Here's the key information:\n\n• You'll need to identify waste types, use proper containers, and label with accumulation start dates\n• Small quantity generators can store waste up to 180 days, while large quantity generators are limited to 90 days\n• Weekly inspections are required to check for leaks or deterioration\n\nIs there a specific aspect of waste management you're dealing with at your facility?";
  } else if (query.includes('training') || query.includes('certification')) {
    return "Safety training is essential! Here's what you need to know:\n\n• Training must be in a language workers understand\n• It needs to cover hazard recognition and prevention\n• For many hazards, annual refresher training is required\n• Documentation must be maintained with training dates and content\n\nAre you setting up a new training program or updating an existing one?";
  } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hi there! I'm Paulie, your friendly safety assistant. I'm here to help with questions about workplace safety regulations, compliance requirements, and best practices. What specific safety topic can I help you with today?";
  } else if (query.includes('construction') || query.includes('building') || query.includes('site')) {
    return "Construction safety is a big topic! Here are the key areas to focus on:\n\n• Fall protection when working at heights of 6+ feet\n• Proper scaffolding with guardrails\n• Trench protection for excavations 5+ feet deep\n• Proper lockout/tagout procedures for equipment\n• Hard hats, safety glasses, and appropriate PPE\n\nWhat specific aspect of construction safety are you working on?";
  } else if (query.includes('new employee') || query.includes('new hire') || query.includes('onboarding')) {
    return "Great question about training new employees! Here's what you need to know:\n\n• New employees need safety training before they start work - especially for hazardous tasks\n• Training should cover workplace-specific hazards, emergency procedures, and PPE use\n• You'll need to document all training with dates, topics covered, and signatures\n• Consider a mentor system for the first few weeks to reinforce safety practices\n\nAre you developing an onboarding program or improving an existing one?";
  } else if (query.includes('fine') || query.includes('penalty') || query.includes('citation')) {
    return "When it comes to safety violations and fines, here's what you should know:\n\n• Serious violations typically range from $4,000 to $13,653 per violation\n• Willful or repeated violations can reach $136,532 each\n• Factors affecting penalties include company size, good faith efforts, and violation history\n• You can reduce penalties through abatement, safety programs, and cooperation\n\nAre you dealing with a specific citation or just wanting to understand the potential risks?";
  } else if (query.includes('exit') || query.includes('emergency') || query.includes('evacuation')) {
    return "Emergency exits and evacuation routes are critical safety elements! Here's what you need to know:\n\n• Exit routes must be permanent, properly lit, and unobstructed\n• Exit doors must be unlocked from the inside and swing outward\n• You need clear, visible exit signs and emergency lighting\n• Regular evacuation drills should be conducted to ensure everyone knows what to do\n\nIs there a specific aspect of emergency planning you're working on?";
  } else if (query.includes('scaffold') || query.includes('ladder')) {
    return "Thanks for asking about scaffold and ladder safety! Here's the key guidance:\n\n• Scaffolds need to support at least 4 times the maximum intended load\n• Guardrails are required for platforms 10 feet or higher\n• Ladders should be inspected before each use for defects\n• Users need to maintain three points of contact when climbing\n• Never stand on the top step of a stepladder\n\nAre you using scaffolds, ladders, or both in your workplace?";
  }
  
  return null;
};
