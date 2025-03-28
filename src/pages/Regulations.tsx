
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIndustryRegulations } from '@/hooks/useRegulations';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';

const Regulations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  const userIndustry = user?.user_metadata?.industries?.[0] || 'Construction';
  
  const { data: regulations = [], isLoading, error } = useIndustryRegulations(userIndustry);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter regulations based on active tab and search term
  const filteredRegulations = React.useMemo(() => {
    if (!Array.isArray(regulations)) return [];
    
    let filtered = [...regulations];
    
    if (activeTab === 'federal') {
      filtered = filtered.filter((reg: any) => reg.country === 'USA' && !reg.state);
    } else if (activeTab === 'state') {
      filtered = filtered.filter((reg: any) => reg.state && !reg.local);
    } else if (activeTab === 'local') {
      filtered = filtered.filter((reg: any) => reg.local);
    } else if (activeTab === 'international') {
      filtered = filtered.filter((reg: any) => reg.country !== 'USA');
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((reg: any) => 
        reg.title?.toLowerCase().includes(search) ||
        reg.description?.toLowerCase().includes(search) ||
        reg.citation?.toLowerCase().includes(search) ||
        reg.keywords?.some((keyword: string) => keyword.toLowerCase().includes(search))
      );
    }
    
    return filtered;
  }, [regulations, activeTab, searchTerm]);
  
  const getSeverityColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Count regulations in each category for the tabs
  const counts = React.useMemo(() => {
    if (!Array.isArray(regulations)) return { all: 0, federal: 0, state: 0, local: 0, international: 0 };
    
    return {
      all: regulations.length,
      federal: regulations.filter((reg: any) => reg.country === 'USA' && !reg.state).length,
      state: regulations.filter((reg: any) => reg.state && !reg.local).length,
      local: regulations.filter((reg: any) => reg.local).length,
      international: regulations.filter((reg: any) => reg.country !== 'USA').length
    };
  }, [regulations]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Regulations</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700 rounded w-full"></div>
          <div className="h-[400px] bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Regulations</h1>
        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-6">
            <p>Error loading regulations. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Safety Regulations</h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <Input
          placeholder="Search regulations..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
        <Button variant="outline">Filter</Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="all">
            All <Badge variant="outline" className="ml-2">{counts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="federal">
            Federal <Badge variant="outline" className="ml-2">{counts.federal}</Badge>
          </TabsTrigger>
          <TabsTrigger value="state">
            State <Badge variant="outline" className="ml-2">{counts.state}</Badge>
          </TabsTrigger>
          <TabsTrigger value="local">
            Local <Badge variant="outline" className="ml-2">{counts.local}</Badge>
          </TabsTrigger>
          <TabsTrigger value="international">
            International <Badge variant="outline" className="ml-2">{counts.international}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredRegulations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No regulations found. Try adjusting your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRegulations.map((regulation: any) => (
                <Card key={regulation.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        {regulation.title}
                      </CardTitle>
                      <Badge className={getSeverityColor(regulation.risk_level)}>
                        {regulation.risk_level || 'Medium'} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {regulation.citation}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      {regulation.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {regulation.keywords?.map((keyword: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Regulations;
