
import React from 'react';

interface Factor {
  id: string;
  description: string;
  severity: string;
  likelihood: string;
  controls: string;
}

interface Finding {
  id: string;
  category: string;
  score: number;
  factors: Factor[];
}

interface FindingsTabProps {
  findings: Finding[];
}

const FindingsTab: React.FC<FindingsTabProps> = ({ findings }) => {
  return (
    <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
      <h3 className="text-white font-medium mb-4">Risk Assessment Findings</h3>
      
      {findings.map((finding) => (
        <div className="mb-6" key={finding.id}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <h4 className="text-white font-medium">{finding.category}</h4>
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-500/30 text-green-300 border border-green-800">
                {finding.score}
              </span>
            </div>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m18 15-6-6-6 6"></path></svg>
            </button>
          </div>
          
          {finding.factors.map((factor) => (
            <div key={factor.id} className="mb-8 border-t border-gray-800 pt-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="text-gray-300">{factor.id}</div>
                <div className="px-2 py-0.5 rounded bg-yellow-500 text-black text-xs font-medium">
                  Score: {finding.score}
                </div>
              </div>
              <p className="text-white mb-4">{factor.description}</p>
              
              <div className="mb-4">
                <div className="text-gray-400 mb-1">Severity</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-800 h-2 rounded-full mr-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">{factor.severity}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-gray-400 mb-1">Likelihood</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-800 h-2 rounded-full mr-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">{factor.likelihood}</span>
                </div>
              </div>
              
              <div>
                <div className="text-gray-400 mb-1">Current Controls</div>
                <div className="text-white">{factor.controls}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FindingsTab;
