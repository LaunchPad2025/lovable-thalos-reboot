
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

// Mock data for risk assessments
const mockAssessments = [
  {
    id: '1',
    title: 'Main Warehouse Annual Assessment',
    location: 'Building A - Warehouse',
    date: '9/14/2023',
    status: 'Approved',
    riskLevel: 'Low'
  },
  {
    id: '2',
    title: 'Production Line 1 Quarterly Check',
    location: 'Building B - Production',
    date: '11/01/2023',
    status: 'Pending Review',
    riskLevel: 'Medium'
  },
  {
    id: '3',
    title: 'Laboratory Safety Inspection',
    location: 'R&D Center - Lab 3',
    date: '10/15/2023',
    status: 'Requires Action',
    riskLevel: 'Medium'
  },
  {
    id: '4',
    title: 'Office Ergonomics Evaluation',
    location: 'Headquarters - Floor 3',
    date: '1/17/2024',
    status: 'Draft',
    riskLevel: 'Low'
  }
];

const RiskAssessmentList = () => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/risk-assessment/${id}`);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Critical':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500 text-white';
      case 'Pending Review':
        return 'bg-yellow-500 text-black';
      case 'Requires Action':
        return 'bg-red-500 text-white';
      case 'Draft':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="mt-6 bg-[#0f1419] rounded-md border border-gray-800">
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Risk Assessments</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search assessments..."
            className="pl-8 bg-[#1a1f29] border-gray-700 text-gray-300"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#1a1f29]">
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Location</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Risk Level</TableHead>
              <TableHead className="text-gray-400 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssessments.map((assessment) => (
              <TableRow 
                key={assessment.id} 
                className="border-gray-800 hover:bg-[#1a1f29] cursor-pointer"
                onClick={() => handleRowClick(assessment.id)}
              >
                <TableCell className="text-gray-300 font-medium">{assessment.title}</TableCell>
                <TableCell className="text-gray-400">{assessment.location}</TableCell>
                <TableCell className="text-gray-400">{assessment.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(assessment.riskLevel)}`}>
                    {assessment.riskLevel}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-gray-500">...</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RiskAssessmentList;
