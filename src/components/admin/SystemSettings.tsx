
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-border bg-card">
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">System Settings</h2>
          <p className="text-sm text-muted-foreground">Configure global settings for the Thalos platform.</p>

          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <Input
                    id="company-name"
                    placeholder="Thalos Technologies"
                    defaultValue="Thalos Technologies"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    The name of your organization.
                  </p>
                </div>

                <div>
                  <label htmlFor="site-title" className="block text-sm font-medium mb-1">
                    Site Title
                  </label>
                  <Input
                    id="site-title"
                    placeholder="Thalos | AI-Powered Workplace Safety"
                    defaultValue="Thalos | AI-Powered Workplace Safety"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Title displayed in browser tabs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                      Contact Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="contact@thalos.com"
                      defaultValue="contact@thalos.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="support-phone" className="block text-sm font-medium mb-1">
                      Support Phone
                    </label>
                    <Input
                      id="support-phone"
                      placeholder="+1 (888) 123-4567"
                      defaultValue="+1 (888) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date-format" className="block text-sm font-medium mb-1">
                      Date Format
                    </label>
                    <Input
                      id="date-format"
                      placeholder="MM/DD/YYYY"
                      defaultValue="MM/DD/YYYY"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Example: 06/15/2023
                    </p>
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium mb-1">
                      Timezone
                    </label>
                    <Input
                      id="timezone"
                      placeholder="America/New_York"
                      defaultValue="America/New_York"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Example: America/New_York
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center py-8 text-center">
                    <div className="max-w-md space-y-2">
                      <div className="flex justify-center">
                        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">
                        Notification settings will be available in a future update. You'll be able to configure email notifications, in-app alerts, and mobile push notifications.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center py-8 text-center">
                    <div className="max-w-md space-y-2">
                      <div className="flex justify-center">
                        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">
                        Security settings will be available in a future update. You'll be able to configure password policies, two-factor authentication, and session management options.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-md border border-border bg-card p-4">
          <h3 className="text-md font-medium mb-2">Backup & Restore</h3>
          <p className="text-sm text-muted-foreground mb-4">Export or import all system settings</p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Settings
            </Button>
            <Button variant="outline" size="sm">
              Import Settings
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-border bg-card p-4">
          <h3 className="text-md font-medium mb-2">Reset Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">Revert to default system configuration</p>
          
          <Button variant="destructive" size="sm">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
