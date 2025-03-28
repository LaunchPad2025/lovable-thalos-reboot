
/**
 * Main export file for fallback responses
 */
import { getDefaultResponse } from './defaultResponse';
import { getPracticalSafetyGuidance } from './practicalGuidance';
import { getSpecializedFallbacks } from './specializedFallbacks';
import { getIndustrySpecificResponse } from './industryResponses';

// Also export individual guidance categories for direct access if needed
import { getInspectionGuidance } from './categories/inspectionGuidance';
import { getTrainingGuidance } from './categories/trainingGuidance';
import { getAuditGuidance } from './categories/auditGuidance';
import { getIncidentGuidance } from './categories/incidentGuidance';
import { getHazardGuidance } from './categories/hazardGuidance';
import { getPPEGuidance } from './categories/ppeGuidance';
import { getEquipmentGuidance } from './categories/equipmentGuidance';
import { getOrganizationalGuidance } from './categories/organizationalGuidance';

export {
  // Main response generators
  getDefaultResponse,
  getPracticalSafetyGuidance,
  getSpecializedFallbacks,
  getIndustrySpecificResponse,
  
  // Individual category guidance
  getInspectionGuidance,
  getTrainingGuidance,
  getAuditGuidance,
  getIncidentGuidance,
  getHazardGuidance,
  getPPEGuidance,
  getEquipmentGuidance,
  getOrganizationalGuidance
};
