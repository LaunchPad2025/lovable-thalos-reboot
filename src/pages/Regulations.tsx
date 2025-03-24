
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRegulations, useRegulationDetails } from "@/hooks/useRegulations";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageContainer from "@/components/layout/PageContainer";
import { useRegulationViolations } from "@/hooks/useViolationRegulations";
import RegulationForm from "@/components/regulations/RegulationForm";
import RegulationDetails from "@/components/regulations/RegulationDetails";
import { 
  Search, 
  Filter, 
  Calendar, 
  Globe, 
  Building, 
  FileType,
  BookOpen
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMobile from "@/hooks/useMobile";

const Regulations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { data: regulations, isLoading: regulationsLoading } = useRegulations();
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

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    const colors = {
      active: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
      superseded: "bg-amber-100 text-amber-800"
    };
    
    const color = colors[status as keyof typeof colors] || "bg-blue-100 text-blue-800";
    
    return (
      <Badge className={color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

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
            <Drawer>
              <DrawerTrigger asChild>
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Regulation
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add New Regulation</DrawerTitle>
                  <DrawerDescription>
                    Add a new regulation, standard, or rulebook to your library
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                  <RegulationForm onSuccess={() => {
                    // Close drawer and refresh data
                    const drawerClose = document.querySelector(
                      '[data-drawer-close="true"]'
                    ) as HTMLElement;
                    drawerClose?.click();
                  }} />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search regulations..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      <span>Filter by</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="industry">Industry</SelectItem>
                    <SelectItem value="jurisdiction">Jurisdiction</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="document_type">Document Type</SelectItem>
                  </SelectContent>
                </Select>
                
                {filterType === 'jurisdiction' && jurisdictions.length > 0 && (
                  <Select value={jurisdictionFilter || ''} onValueChange={setJurisdictionFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center">
                        <Globe size={16} className="mr-2" />
                        <span>Jurisdiction</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Jurisdictions</SelectItem>
                      {jurisdictions.map(jurisdiction => (
                        <SelectItem key={jurisdiction} value={jurisdiction}>{jurisdiction}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {filterType === 'status' && statuses.length > 0 && (
                  <Select value={statusFilter || ''} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>Status</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="all">All</TabsTrigger>
                {industries.map((industry) => (
                  <TabsTrigger key={industry} value={industry}>
                    {industry}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab}>
                {regulationsLoading ? (
                  <div className="text-center py-4">Loading regulations...</div>
                ) : filteredRegulations.length === 0 ? (
                  <div className="text-center py-4">No regulations found</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        {!isMobile && <TableHead>Type</TableHead>}
                        <TableHead>Industry</TableHead>
                        {!isMobile && <TableHead>Jurisdiction</TableHead>}
                        {!isMobile && <TableHead>Version</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead>Effective Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegulations.map((regulation) => (
                        <TableRow 
                          key={regulation.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => navigate(`/regulations/${regulation.id}`)}
                        >
                          <TableCell className="font-medium">{regulation.title}</TableCell>
                          {!isMobile && <TableCell>{regulation.document_type}</TableCell>}
                          <TableCell>{regulation.industry || "N/A"}</TableCell>
                          {!isMobile && <TableCell>{regulation.jurisdiction || "N/A"}</TableCell>}
                          {!isMobile && <TableCell>{regulation.version || "N/A"}</TableCell>}
                          <TableCell>
                            {getStatusBadge(regulation.status)}
                          </TableCell>
                          <TableCell>
                            {formatDate(regulation.effective_date)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
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
