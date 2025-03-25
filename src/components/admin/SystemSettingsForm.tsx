
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SystemSettingsForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-sidebar-hover rounded-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Company Name</label>
              <Input 
                placeholder="Thalos Technologies" 
                className="bg-sidebar border-border" 
                disabled
              />
              <p className="text-xs text-muted-foreground mt-1">The name of your organization</p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">Site Title</label>
              <Input 
                placeholder="Thalos | AI-Powered Workplace Safety" 
                className="bg-sidebar border-border" 
                disabled
              />
              <p className="text-xs text-muted-foreground mt-1">Title displayed in browser tabs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Contact Email</label>
                <Input 
                  placeholder="contact@thalos.com" 
                  className="bg-sidebar border-border" 
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Support Phone</label>
                <Input 
                  placeholder="+1 (888) 123-4567" 
                  className="bg-sidebar border-border" 
                  disabled
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Date Format</label>
                <Input 
                  placeholder="MM/DD/YYYY" 
                  className="bg-sidebar border-border" 
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Example: 05/12/2023</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Timezone</label>
                <Input 
                  placeholder="America/New_York" 
                  className="bg-sidebar border-border" 
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Example: America/New_York</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" disabled>Reset</Button>
            <Button disabled>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <p className="text-muted-foreground">Configure notification settings for all users.</p>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <p className="text-muted-foreground">Manage security settings and authentication methods.</p>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border border-border rounded-md p-4">
          <h3 className="font-medium mb-2">Backup & Restore</h3>
          <p className="text-sm text-muted-foreground mb-4">Export or import all system settings</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
              <span className="text-lg">↓</span> Export Settings
            </Button>
            <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
              <span className="text-lg">↑</span> Import Settings
            </Button>
          </div>
        </div>
        
        <div className="border border-border rounded-md p-4">
          <h3 className="font-medium mb-2">Reset Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">Revert to default system configuration</p>
          <Button variant="destructive" size="sm" disabled>Reset to Defaults</Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsForm;
