
/**
 * Industry terms mapping for improved detection
 */

/**
 * Industry-specific terms for better matching
 */
export const industryTerms: Record<string, string[]> = {
  'construction': ['construction', 'building', 'contractor', 'scaffold', 'excavation', 'crane', 'jobsite'],
  'manufacturing': ['manufacturing', 'factory', 'production', 'assembly', 'fabrication', 'machine shop'],
  'healthcare': ['healthcare', 'hospital', 'medical', 'patient', 'clinic', 'nursing'],
  'oil_gas': [
    'oil', 'gas', 'petroleum', 'drilling', 'refinery', 'pipeline', 'rig', 'offshore',
    'process safety', 'psm', 'h2s', 'hazwoper', 'midstream', 'upstream', 'downstream'
  ],
  'mining': ['mining', 'quarry', 'excavation', 'ore', 'mineral', 'underground'],
  'agriculture': ['agriculture', 'farm', 'crop', 'livestock', 'harvest', 'pesticide', 'tractor'],
  'retail': ['retail', 'store', 'shop', 'customer', 'merchandise', 'sales floor'],
  'laboratory': ['laboratory', 'lab', 'research', 'experiment', 'chemical', 'testing'],
  'logistics': ['logistics', 'warehouse', 'shipping', 'transportation', 'distribution', 'forklift'],
  'food_processing': ['food', 'processing', 'packaging', 'beverage', 'production', 'meat processing']
};
