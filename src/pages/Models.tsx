import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import PageContainer from "@/components/layout/PageContainer";
import { useMLModels, useMLModelsByIndustry } from "@/hooks/useMLModels";
import ModelForm from "@/components/models/ModelForm";
import ModelDetails from "@/components/models/ModelDetails";
import TestModelForm from "@/components/models/TestModelForm";
import { Brain, BrainCircuit, ChevronRight, Gauge, Server } from "lucide-react";

const Models = () => {
  const { data: models = [], isLoading } = useMLModels();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const industries = [...new Set(models.filter(m => m.industry).map(m => m.industry))];
  
  const filteredModels = activeTab === "all" 
    ? models 
    : models.filter(m => m.industry === activeTab);
  
  const selectedModelData = models.find(m => m.id === selectedModel);
  
  return (
    <PageContainer 
      title="ML Models"
    >
      <div className="grid gap-4 md:grid-cols-7">
        <div className="grid grid-cols-1 gap-4 md:col-span-7 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Total Models</div>
              </div>
              <div className="text-2xl font-bold">{models.length}</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Across {industries.length} industries
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Active Models</div>
              </div>
              <div className="text-2xl font-bold">
                {models.filter(m => m.active).length}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Ready for use in violation detection
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Avg. Accuracy</div>
              </div>
              <div className="text-2xl font-bold">
                {models.length > 0 
                  ? `${(models.reduce((acc, m) => acc + (m.accuracy || 0), 0) / models.length).toFixed(1)}%`
                  : "N/A"}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Based on model validation metrics
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="md:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>ML Models</CardTitle>
              <CardDescription>
                Configure and test your safety violation detection models
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Test Model</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Test Model</DialogTitle>
                    <DialogDescription>
                      Test a model with sample data to see how it detects violations
                    </DialogDescription>
                  </DialogHeader>
                  <TestModelForm models={models} />
                </DialogContent>
              </Dialog>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>Add Model</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Add ML Model</DrawerTitle>
                    <DrawerDescription>
                      Register a new model for safety violation detection
                    </DrawerDescription>
                  </DrawerHeader>
                  <ModelForm />
                </DrawerContent>
              </Drawer>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Models</TabsTrigger>
                {industries.map(industry => (
                  <TabsTrigger key={industry} value={industry}>
                    {industry}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="py-4 text-center">Loading models...</div>
                ) : filteredModels.length === 0 ? (
                  <div className="py-4 text-center">No models found</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredModels.map(model => (
                        <TableRow 
                          key={model.id}
                          className="cursor-pointer"
                          onClick={() => setSelectedModel(model.id)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <BrainCircuit className="mr-2 h-4 w-4 text-muted-foreground" />
                              {model.name}
                            </div>
                          </TableCell>
                          <TableCell>{model.model_type}</TableCell>
                          <TableCell>{model.industry}</TableCell>
                          <TableCell>{model.version}</TableCell>
                          <TableCell>{model.accuracy ? `${model.accuracy}%` : "N/A"}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              model.active 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                            }`}>
                              {model.active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <ChevronRight className="h-4 w-4" />
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
        
        {selectedModel && selectedModelData && (
          <ModelDetails 
            model={selectedModelData} 
            onClose={() => setSelectedModel(null)} 
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Models;
