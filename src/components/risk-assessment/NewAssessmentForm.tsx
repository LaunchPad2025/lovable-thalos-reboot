
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NewAssessmentForm = () => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/risk-assessment');
  };
  
  const handleCreateAssessment = () => {
    // In a real app, we would save the form data here
    // For now, just navigate back to the assessments list
    navigate('/risk-assessment');
  };
  
  return (
    <Card className="bg-[#0f1419] border-gray-800">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold text-white mb-4">Create New Risk Assessment</h2>
        <p className="text-gray-400 mb-6">Complete the form below to identify and evaluate workplace hazards.</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Assessment Template</label>
            <Select defaultValue="template">
              <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-gray-300">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f29] border-gray-700">
                <SelectItem value="general">General Workplace Assessment</SelectItem>
                <SelectItem value="construction">Construction Site Assessment</SelectItem>
                <SelectItem value="office">Office Environment Assessment</SelectItem>
                <SelectItem value="manufacturing">Manufacturing Facility Assessment</SelectItem>
                <SelectItem value="laboratory">Laboratory Safety Assessment</SelectItem>
                <SelectItem value="transportation">Transportation Safety Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Assessment Title</label>
              <Input 
                placeholder="Enter a title for this assessment" 
                className="bg-[#1a1f29] border-gray-700 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
              <Input 
                placeholder="Workplace location" 
                className="bg-[#1a1f29] border-gray-700 text-gray-300"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
              <Input 
                placeholder="Department" 
                className="bg-[#1a1f29] border-gray-700 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Assessor</label>
              <Input 
                placeholder="Name of person conducting assessment" 
                className="bg-[#1a1f29] border-gray-700 text-gray-300"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Assessment Date</label>
            <Input 
              type="date" 
              className="bg-[#1a1f29] border-gray-700 text-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">General Notes</label>
            <Textarea 
              placeholder="Any additional notes about this assessment..."
              className="bg-[#1a1f29] border-gray-700 text-gray-300 min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAssessment}
              className="bg-thalos-blue hover:bg-blue-600"
            >
              Save Assessment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewAssessmentForm;
