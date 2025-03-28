
/**
 * Provide practical best practices for common safety documentation questions
 * with improved formatting and organizational structure - Refactored to use imported modules
 */
import { getInspectionGuidance } from './categories/inspectionGuidance';
import { getTrainingGuidance } from './categories/trainingGuidance';
import { getAuditGuidance } from './categories/auditGuidance';
import { getIncidentGuidance } from './categories/incidentGuidance';
import { getHazardGuidance } from './categories/hazardGuidance';
import { getPPEGuidance } from './categories/ppeGuidance';
import { getEquipmentGuidance } from './categories/equipmentGuidance';
import { getOrganizationalGuidance } from './categories/organizationalGuidance';
import { getSpecializedFallbacks } from './specializedFallbacks';

export const getPracticalSafetyGuidance = (topic: string): string | null => {
  // Combine all guidance categories
  const allGuidance = {
    ...getInspectionGuidance(),
    ...getTrainingGuidance(),
    ...getAuditGuidance(),
    ...getIncidentGuidance(),
    ...getHazardGuidance(),
    ...getPPEGuidance(),
    ...getEquipmentGuidance(),
    ...getOrganizationalGuidance()
  };

  // Check for topic matches
  for (const [key, guidance] of Object.entries(allGuidance)) {
    if (topic.toLowerCase().includes(key)) {
      return guidance;
    }
  }

  // Get specialized fallbacks from the dedicated function
  const specializedFallback = getSpecializedFallbacks(topic);
  if (specializedFallback) {
    return specializedFallback;
  }

  return null;
};
