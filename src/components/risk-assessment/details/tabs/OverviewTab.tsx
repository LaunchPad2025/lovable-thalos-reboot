
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RiskDistribution {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

interface Summary {
  factors: number;
  actions: number;
  attachments: number;
  highRisks: number;
}

interface OverviewTabProps {
  riskLevel: string;
  riskLevelLabel: string;
  status: string;
  summary: Summary;
  notes: string;
  riskDistribution: RiskDistribution;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  riskLevel, 
  riskLevelLabel, 
  status, 
  summary, 
  notes, 
  riskDistribution 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
        <h3 className="text-white font-medium mb-4">Risk Level</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-3xl font-bold text-white">{riskLevel}</span>
          <span className="text-gray-400">{riskLevelLabel}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
      
      <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
        <h3 className="text-white font-medium mb-4">Assessment Status</h3>
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
          <span className="text-white font-medium">{status}</span>
        </div>
        <p className="text-gray-400 text-sm">This assessment has been reviewed and approved.</p>
      </div>
      
      <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
        <h3 className="text-white font-medium mb-4">Assessment Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1a1f29] p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{summary.factors}</div>
            <div className="text-gray-400 text-sm">Risk Factors</div>
          </div>
          <div className="bg-[#1a1f29] p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{summary.actions}</div>
            <div className="text-gray-400 text-sm">Actions</div>
          </div>
          <div className="bg-[#1a1f29] p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{summary.attachments}</div>
            <div className="text-gray-400 text-sm">Attachments</div>
          </div>
          <div className="bg-[#1a1f29] p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{summary.highRisks}</div>
            <div className="text-gray-400 text-sm">High Risks</div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800 md:col-span-3">
        <h3 className="text-white font-medium mb-4">Notes</h3>
        <p className="text-gray-400">{notes}</p>
      </div>
      
      <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800 md:col-span-3">
        <h3 className="text-white font-medium mb-4">Risk Distribution</h3>
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div>
            <div className="mb-2 text-center text-sm text-gray-400">Low</div>
            <div className="bg-green-500 h-4 rounded w-full"></div>
            <div className="text-center mt-1 text-white">{riskDistribution.low}</div>
          </div>
          <div>
            <div className="mb-2 text-center text-sm text-gray-400">Medium</div>
            <div className="bg-yellow-500 h-4 rounded w-full"></div>
            <div className="text-center mt-1 text-white">{riskDistribution.medium}</div>
          </div>
          <div>
            <div className="mb-2 text-center text-sm text-gray-400">High</div>
            <div className="bg-orange-500 h-4 rounded w-full"></div>
            <div className="text-center mt-1 text-white">{riskDistribution.high}</div>
          </div>
          <div>
            <div className="mb-2 text-center text-sm text-gray-400">Critical</div>
            <div className="bg-red-500 h-4 rounded w-full"></div>
            <div className="text-center mt-1 text-white">{riskDistribution.critical}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
