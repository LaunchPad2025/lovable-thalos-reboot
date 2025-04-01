
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const complianceTrendData = [
  { month: 'Jan 1', compliance: 100, violations: 0 },
  { month: 'Feb 1', compliance: 100, violations: 0 },
  { month: 'Mar 1', compliance: 80, violations: 2 },
  { month: 'Apr 1', compliance: 100, violations: 0 },
];

const mediaTypeData = [
  { name: 'image', value: 40, fill: '#2563eb' },
  { name: 'enhanced_image', value: 53, fill: '#4ade80' },
  { name: 'smart_risk_analysis', value: 5, fill: '#3e76e6' },
  { name: 'enhanced_visual_analysis', value: 2, fill: '#f97316' },
];

const MediaCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Media Analysis</h3>
          <p className="text-gray-400 text-sm mb-6">Analysis processing statistics</p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">62</div>
            <div className="text-gray-400 text-sm">54 successful, 8 failed</div>
            <div className="text-blue-400 text-sm">87% success rate</div>
          </div>
        </div>
        
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Media Types</h3>
          <p className="text-gray-400 text-sm mb-6">Distribution by media format</p>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={mediaTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mediaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#2563eb] rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">image: 40%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#4ade80] rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">enhanced_image: 53%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#3e76e6] rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">smart_risk_analysis: 5%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#f97316] rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">enhanced_visual_analysis: 2%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h3 className="font-medium text-white mb-2">Violation Detection Performance</h3>
        <p className="text-gray-400 text-sm mb-4">Detection rate across media types</p>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complianceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis domain={[0, 5]} stroke="#64748b" />
              <Line type="monotone" dataKey="violations" stroke="#3b82f6" strokeWidth={2} name="Violations Detected" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default MediaCharts;
