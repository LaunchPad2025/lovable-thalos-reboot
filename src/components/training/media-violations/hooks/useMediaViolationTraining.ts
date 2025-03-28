
import { useState, useEffect, useCallback } from 'react';
import { MediaViolationTraining, MediaViolationFilters } from '../types';
import { toast } from 'sonner';

// Sample data using the provided examples
const sampleViolationData: MediaViolationTraining[] = [
  {
    id: '1',
    violation_id: 'fall_protection_ladder_missing_harness',
    industry: 'Construction',
    category: 'Fall Protection',
    media_type: 'Photo',
    sample_caption: 'Worker standing on ladder 12 feet up, no harness or tie-off visible.',
    violation_type: 'Missing fall arrest system',
    regulation_citation: '29 CFR 1926.501(b)(13)',
    regulation_summary: 'OSHA requires fall protection for employees working on residential construction at heights of 6 feet or more.',
    risk_level: 'High',
    labels: ['no_harness', 'elevated_work', 'ladder'],
    remediation_steps: [
      'Require PFAS (Personal Fall Arrest System) above 6 ft',
      'Provide training on ladder safety and fall protection',
      'Audit ladder workstations for compliance'
    ],
    tags: ['fall protection', 'ladder', '1926.501', 'construction', 'osha'],
    copilot_response_sample: 'This appears to violate OSHA 1926.501(b)(13), which mandates fall protection at 6 feet. A harness or fall arrest system should be in place.',
    copilot_task_sample: 'Install PFAS harnesses and conduct training on fall protection for ladder use in elevated areas.',
    status: 'ready',
    created_at: '2023-10-15T08:30:00Z'
  },
  {
    id: '2',
    violation_id: 'ppe_missing_eye_protection',
    industry: 'Manufacturing',
    category: 'PPE',
    media_type: 'Photo',
    sample_caption: 'Worker operating grinding machine with no safety glasses.',
    violation_type: 'Missing eye protection',
    regulation_citation: '29 CFR 1910.133',
    regulation_summary: 'OSHA requires eye protection when workers are exposed to flying particles, molten metal, chemicals, or potentially injurious light radiation.',
    risk_level: 'High',
    labels: ['no_eyewear', 'metalworking', 'ppe_missing'],
    remediation_steps: [
      'Mandate ANSI-rated eye protection near grinding tools',
      'Train workers on PPE hazard zones',
      'Install signage and eyewear stations at machinery points'
    ],
    tags: ['eye protection', 'ppe', 'osha', '1910.133', 'manufacturing'],
    copilot_response_sample: 'Under OSHA 1910.133, employees exposed to flying particles must wear eye protection. This appears to be a violation.',
    copilot_task_sample: 'Add PPE compliance signage and supply approved safety eyewear at all grinding stations.',
    status: 'needs_review',
    created_at: '2023-11-02T14:45:00Z'
  },
  {
    id: '3',
    violation_id: 'confined_space_no_attendant',
    industry: 'Utilities',
    category: 'Confined Spaces',
    media_type: 'Video',
    sample_caption: 'Worker descends into underground vault without visible attendant or gas meter reading.',
    violation_type: 'Unauthorized confined space entry',
    regulation_citation: '29 CFR 1910.146',
    regulation_summary: 'Employers must implement a permit-required confined space program including air monitoring, attendants, and rescue procedures.',
    risk_level: 'Critical',
    labels: ['confined_space_entry', 'no_attendant', 'no_air_test'],
    remediation_steps: [
      'Assign trained attendant for all confined space entries',
      'Use air monitoring before and during entry',
      'Ensure confined space permits are documented'
    ],
    tags: ['confined space', 'utilities', 'osha', '1910.146', 'permit_required'],
    copilot_response_sample: 'This may violate OSHA 1910.146, which requires an attendant and gas test before entering permit-required confined spaces.',
    copilot_task_sample: 'Update confined space entry checklist and assign attendants with gas monitoring responsibility for all underground vaults.',
    status: 'approved',
    created_at: '2023-12-05T09:15:00Z'
  },
  {
    id: '4',
    violation_id: 'healthcare_bloodborne_pathogen_no_ppe',
    industry: 'Healthcare',
    category: 'Bloodborne Pathogens',
    media_type: 'Photo',
    sample_caption: 'Nurse handling blood sample without gloves.',
    violation_type: 'No PPE during potential blood exposure',
    regulation_citation: '29 CFR 1910.1030(d)(3)',
    regulation_summary: 'Employers must provide appropriate PPE to prevent occupational exposure to bloodborne pathogens.',
    risk_level: 'High',
    labels: ['no_gloves', 'blood_exposure', 'bbp_violation'],
    remediation_steps: [
      'Ensure gloves are worn during all exposure-prone procedures',
      'Conduct BBP refresher training',
      'Audit PPE compliance in all clinical areas'
    ],
    tags: ['bloodborne', 'ppe', 'osha', '1910.1030', 'healthcare'],
    copilot_response_sample: 'OSHA 1910.1030 requires PPE like gloves when handling blood or OPIM. This image likely violates that standard.',
    copilot_task_sample: 'Enforce glove compliance and conduct bloodborne pathogens training for clinical staff.',
    status: 'needs_review',
    created_at: '2024-01-18T11:20:00Z'
  },
  {
    id: '5',
    violation_id: 'mining_exposed_belts_no_guard',
    industry: 'Mining',
    category: 'Machine Guarding',
    media_type: 'Photo',
    sample_caption: 'Conveyor belt with exposed rollers and no guarding in mining site.',
    violation_type: 'Missing machine guarding',
    regulation_citation: '30 CFR 56.14107(a)',
    regulation_summary: 'Moving machine parts must be guarded to protect miners from contact that could cause injury.',
    risk_level: 'High',
    labels: ['unguarded_machinery', 'conveyor', 'mining_hazard'],
    remediation_steps: [
      'Install guards on all exposed moving parts',
      'Inspect belt systems for compliance',
      'Add warning signage and restrict access to moving components'
    ],
    tags: ['mining', 'guarding', 'msha', '30 CFR 56.14107', 'machine safety'],
    copilot_response_sample: 'MSHA regulation 30 CFR 56.14107(a) requires guarding for moving parts. Exposed conveyors without guards may violate this rule.',
    copilot_task_sample: 'Install compliant machine guards and inspect all conveyors at the mining site for similar violations.',
    status: 'ready',
    created_at: '2024-02-07T14:30:00Z'
  },
  {
    id: '6',
    violation_id: 'aviation_maintenance_no_hearing_protection',
    industry: 'Aviation',
    category: 'Hearing Protection',
    media_type: 'Video',
    sample_caption: 'Aircraft technician working on running jet engine without ear protection.',
    violation_type: 'Noise exposure above OSHA limits',
    regulation_citation: '29 CFR 1910.95(b)(1)',
    regulation_summary: 'Employers must implement a hearing conservation program when workers are exposed to noise levels at or above 85 dBA over an 8-hour TWA.',
    risk_level: 'Critical',
    labels: ['no_ear_protection', 'jet_engine_noise', 'hearing_risk'],
    remediation_steps: [
      'Provide and enforce use of hearing protection',
      'Conduct noise exposure monitoring',
      'Implement a hearing conservation program with training'
    ],
    tags: ['aviation', 'hearing', 'osha', '1910.95', 'noise'],
    copilot_response_sample: 'If noise levels exceed 85 dBA and hearing protection isn\'t used, this violates OSHA 1910.95. A hearing program is required.',
    copilot_task_sample: 'Distribute hearing protection and initiate noise monitoring procedures in all maintenance areas.',
    status: 'approved',
    created_at: '2024-03-12T16:45:00Z'
  }
];

export const useMediaViolationTraining = () => {
  const [data, setData] = useState<MediaViolationTraining[]>(sampleViolationData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<MediaViolationFilters>({
    industry: '',
    category: '',
    risk_level: '',
    status: '',
    searchQuery: ''
  });

  // Calculate statistics from data
  const stats = {
    total: data.length,
    needsReview: data.filter(item => item.status === 'needs_review').length,
    ready: data.filter(item => item.status === 'ready').length,
    approved: data.filter(item => item.status === 'approved').length,
    
    // Count by industry
    byIndustry: data.reduce((acc, item) => {
      acc[item.industry] = (acc[item.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    // Count by category
    byCategory: data.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    // Count by risk level
    byRiskLevel: data.reduce((acc, item) => {
      acc[item.risk_level] = (acc[item.risk_level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  // Filter the data based on filters
  const filterData = useCallback(() => {
    setLoading(true);
    
    try {
      // Apply filters to the data
      let filteredData = [...sampleViolationData];
      
      if (filters.industry) {
        filteredData = filteredData.filter(item => item.industry === filters.industry);
      }
      
      if (filters.category) {
        filteredData = filteredData.filter(item => item.category === filters.category);
      }
      
      if (filters.risk_level) {
        filteredData = filteredData.filter(item => item.risk_level === filters.risk_level);
      }
      
      if (filters.status) {
        filteredData = filteredData.filter(item => item.status === filters.status);
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredData = filteredData.filter(item => 
          item.violation_id.toLowerCase().includes(query) ||
          item.sample_caption.toLowerCase().includes(query) ||
          item.regulation_citation?.toLowerCase().includes(query) ||
          item.regulation_summary?.toLowerCase().includes(query)
        );
      }
      
      setData(filteredData);
    } catch (error) {
      console.error('Error filtering data:', error);
      toast.error('Failed to filter data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Apply filters when they change
  useEffect(() => {
    filterData();
  }, [filterData]);

  // Update filters
  const updateFilters = (newFilters: Partial<MediaViolationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Update status of a violation
  const updateStatus = async (id: string, status: 'needs_review' | 'ready' | 'approved') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the data
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, status } : item
      ));
      
      toast.success(`Status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    filters,
    stats,
    updateFilters,
    updateStatus,
    refreshData: filterData
  };
};
