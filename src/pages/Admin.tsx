
import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import RolePermissions from "@/components/admin/RolePermissions";
import SystemSettings from "@/components/admin/SystemSettings";
import MockDataAlert from "@/components/ui/MockDataAlert";
import UserInvitation from "@/components/admin/UserInvitation";
import RecentInvitations from "@/components/admin/RecentInvitations";

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
              <RecentInvitations />
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
