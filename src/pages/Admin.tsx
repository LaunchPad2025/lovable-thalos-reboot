
import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import RolePermissions from "@/components/admin/RolePermissions";
import SystemSettings from "@/components/admin/SystemSettings";
import MockDataAlert from "@/components/ui/MockDataAlert";
import UserInvitation from "@/components/admin/UserInvitation";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <PageContainer>
      <div className="space-y-6">
        <MockDataAlert featureName="Admin Dashboard" />
        
        <div>
          <PageTitle title="Admin Dashboard" />
          <p className="text-muted-foreground">
            Manage users, roles, permissions, and system settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 rounded-md mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="invitations" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <UserInvitation />
              <div className="border border-border bg-card rounded-md p-6 space-y-4">
                <h3 className="text-lg font-medium">Recent Invitations</h3>
                <p className="text-muted-foreground text-sm">
                  Recent invitations will be displayed here once implemented.
                </p>
                <div className="text-muted-foreground text-xs">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Invitations expire after 7 days</li>
                    <li>Users must complete onboarding after registration</li>
                    <li>You can resend invitations if they expire</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions">
            <RolePermissions />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Admin;
