function generateResponse(query: string): string {
  if (query.includes("fall protection") || query.includes("1926.501")) {
    return "Under OSHA 29 CFR 1926.501, fall protection is required at elevations of 6 feet in construction...";
  } else if (query.includes("PPE") || query.includes("chemical handling") || query.includes("1910.120")) {
    return "Employers must provide chemical-resistant gloves, eye protection, and lab coats as per OSHA 1910.120...";
  }

  // Improved fallback detection logic
  return "I'm sorry, I couldn't find a specific response for your query. Could you provide more details?";
}