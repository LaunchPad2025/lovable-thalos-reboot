
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface MLModel {
  id: string;
  name: string;
  description: string | null;
  industry: string;
  version: string;
  model_type: string;
  accuracy: number | null;
  active: boolean;
  created_at: string;
}

interface ModelDetailsProps {
  model: MLModel;
  onClose: () => void;
}

const ModelDetails = ({ model, onClose }: ModelDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isActive, setIsActive] = useState(model.active);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateModelStatus = async (active: boolean) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('ml_models')
        .update({ active })
        .eq('id', model.id);
      
      if (error) throw error;
      
      setIsActive(active);
      toast.success(`Model ${active ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      console.error('Error updating model status:', error);
      toast.error(error.message || 'Failed to update model status');
      setIsActive(model.active); // Revert UI state on error
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleActivation = () => {
    updateModelStatus(!isActive);
  };

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>{model.model_type} Model • {model.industry}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {model.description || "No description provided."}
                  </p>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-semibold">Model Details</h3>
                  <ul className="mt-2 grid gap-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{model.model_type}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <span>{model.industry}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>{model.version}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{new Date(model.created_at).toLocaleDateString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span>{model.accuracy ? `${model.accuracy}%` : "N/A"}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium">Status</h3>
                  <p className="text-sm text-muted-foreground">
                    {isActive ? "This model is active and being used for detection" : "This model is inactive"}
                  </p>
                </div>
                <Switch 
                  checked={isActive} 
                  onCheckedChange={toggleActivation}
                  disabled={isUpdating}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Use Cases</h3>
                <ul className="ml-6 list-disc text-sm text-muted-foreground">
                  <li>Detect safety violations in {model.industry.toLowerCase()}</li>
                  <li>Analyze {model.model_type.toLowerCase()} data for compliance issues</li>
                  <li>Generate regulatory violation reports</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="rounded-md border p-4 text-center">
              <p className="text-muted-foreground">
                Performance metrics and training history will be available here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="usage">
            <div className="rounded-md border p-4 text-center">
              <p className="text-muted-foreground">
                Usage history and analytics will be available here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button variant="outline" className="flex items-center">
          Test Model
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelDetails;
