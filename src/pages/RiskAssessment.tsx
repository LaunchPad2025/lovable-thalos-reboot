
import React, { useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import RiskAssessmentTabs from '@/components/risk-assessment/RiskAssessmentTabs';
import RiskAssessmentList from '@/components/risk-assessment/RiskAssessmentList';
import RiskAssessmentDetails from '@/components/risk-assessment/RiskAssessmentDetails';
import RiskAssessmentTemplates from '@/components/risk-assessment/RiskAssessmentTemplates';
import NewAssessmentForm from '@/components/risk-assessment/NewAssessmentForm';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import MockDataAlert from '@/components/ui/MockDataAlert';

const RiskAssessment = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const activeTab = searchParams.get('tab') || 'assessments';
  const isNewAssessment = searchParams.get('new') === 'true';
  
  const handleTabChange = (tab: string) => {
    navigate(`/risk-assessment?tab=${tab}`);
  };
  
  const handleCreateNew = () => {
    navigate('/risk-assessment?new=true');
  };
  
  const handleBack = () => {
    navigate('/risk-assessment');
  };

  return (
    <PageContainer>
      <div className="flex flex-col h-full">
        <MockDataAlert featureName="Risk Assessment" />
        
        {id ? (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white mr-2"
                onClick={handleBack}
              >
                ← Back to Assessments
              </Button>
              <div className="ml-auto flex space-x-2">
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                  Share
                </Button>
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                  Export
                </Button>
                <Button size="sm" className="bg-thalos-blue hover:bg-blue-600">
                  Edit
                </Button>
              </div>
            </div>
            <RiskAssessmentDetails id={id} />
          </div>
        ) : isNewAssessment ? (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white"
                onClick={handleBack}
              >
                ← Back to Assessments
              </Button>
            </div>
            <NewAssessmentForm />
          </div>
        ) : (
          <>
            <PageTitle 
              title="Risk Assessment Tool" 
              subtitle="Identify, evaluate, and mitigate workplace safety risks"
              action={
                <Button 
                  onClick={handleCreateNew} 
                  className="bg-thalos-blue hover:bg-blue-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              }
            />
            <div className="mt-6">
              <RiskAssessmentTabs activeTab={activeTab} onTabChange={handleTabChange} />
              {activeTab === 'assessments' && <RiskAssessmentList />}
              {activeTab === 'templates' && <RiskAssessmentTemplates />}
              {activeTab === 'risk-matrix' && (
                <div className="p-6 text-center text-gray-400 bg-[#0f1419] rounded-md border border-gray-800 mt-6">
                  <h3 className="text-xl font-medium mb-4">Risk Matrix</h3>
                  <p>This feature is coming soon!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default RiskAssessment;
