
/**
 * Industry terms mapping for improved detection
 */

/**
 * Industry-specific terms for better matching
 */
export const industryTerms: Record<string, string[]> = {
  'construction': ['construction', 'building', 'contractor', 'scaffold', 'excavation'],
  'manufacturing': ['manufacturing', 'factory', 'production', 'assembly', 'fabrication'],
  'healthcare': ['healthcare', 'hospital', 'medical', 'patient', 'clinic'],
  'oil_gas': ['oil', 'gas', 'petroleum', 'drilling', 'refinery'],
  'mining': ['mining', 'quarry', 'excavation', 'ore', 'mineral'],
  'agriculture': ['agriculture', 'farm', 'crop', 'livestock', 'harvest'],
  'retail': ['retail', 'store', 'shop', 'customer', 'merchandise'],
  'laboratory': ['laboratory', 'lab', 'research', 'experiment', 'chemical'],
  'logistics': ['logistics', 'warehouse', 'shipping', 'transportation', 'distribution'],
  'food_processing': ['food', 'processing', 'packaging', 'beverage', 'production']
};
