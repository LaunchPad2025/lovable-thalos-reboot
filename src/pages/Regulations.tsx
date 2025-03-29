
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegulations, useRegulationDetails } from "@/hooks/useRegulations";
import { useRegulationViolations } from "@/hooks/useViolationRegulations";
import PageContainer from "@/components/layout/PageContainer";
import RegulationDetails from "@/components/regulations/RegulationDetails";
import SearchBar from "@/components/regulations/SearchBar";
import FilterControls from "@/components/regulations/FilterControls";
import IndustryTabs from "@/components/regulations/IndustryTabs";
import RegulationFormDrawer from "@/components/regulations/RegulationFormDrawer";

const Regulations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: regulations, isLoading: regulationsLoading, refetch } = useRegulations();
  const { data: regulationDetails } = useRegulationDetails(id);
  const { data: relatedViolations } = useRegulationViolations(id);
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("industry");
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    if (!id) setActiveTab("all");
  }, [id]);

  // Extract unique values for filters
  const industries = regulations 
    ? [...new Set(regulations.filter(r => r.industry).map(r => r.industry))]
    : [];
    
  const jurisdictions = regulations 
    ? [...new Set(regulations.filter(r => r.jurisdiction).map(r => r.jurisdiction))]
    : [];
    
  const statuses = regulations 
    ? [...new Set(regulations.filter(r => r.status).map(r => r.status))]
    : [];
    
  const documentTypes = regulations 
    ? [...new Set(regulations.filter(r => r.document_type).map(r => r.document_type))]
    : [];

  // Apply filters and search
  const filteredRegulations = regulations 
    ? regulations.filter(r => {
        // Match search term if provided
        const matchesSearch = searchTerm 
          ? (r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             r.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             r.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
             r.document_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             r.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             r.jurisdiction?.toLowerCase().includes(searchTerm.toLowerCase()))
          : true;
          
        // Match selected industry if not "all"
        const matchesIndustry = activeTab === "all" || r.industry === activeTab;
        
        // Match selected jurisdiction if provided
        const matchesJurisdiction = !jurisdictionFilter || r.jurisdiction === jurisdictionFilter;
        
        // Match selected status if provided
        const matchesStatus = !statusFilter || r.status === statusFilter;
        
        return matchesSearch && matchesIndustry && matchesJurisdiction && matchesStatus;
      })
    : [];

  return (
    <PageContainer title="Safety Regulations">
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Regulations</CardTitle>
              <CardDescription>
                Manage all your regulatory documents in one place
              </CardDescription>
            </div>
            <RegulationFormDrawer onSuccess={refetch} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              
              <FilterControls
                filterType={filterType}
                setFilterType={setFilterType}
                jurisdictionFilter={jurisdictionFilter}
                setJurisdictionFilter={setJurisdictionFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                jurisdictions={jurisdictions}
                statuses={statuses}
                documentTypes={documentTypes}
              />
            </div>
            
            <IndustryTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              industries={industries}
              filteredRegulations={filteredRegulations}
              isLoading={regulationsLoading}
            />
          </CardContent>
        </Card>

        {id && regulationDetails && (
          <RegulationDetails 
            regulation={regulationDetails} 
            violations={relatedViolations}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Regulations;
