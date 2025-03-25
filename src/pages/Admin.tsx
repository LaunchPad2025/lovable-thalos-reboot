
import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import UserTable from "@/components/admin/UserTable";
import RoleTable from "@/components/admin/RoleTable";
import PermissionsTable from "@/components/admin/PermissionsTable";
import SystemSettingsForm from "@/components/admin/SystemSettingsForm";
import ComingSoonOverlay from "@/components/admin/ComingSoonOverlay";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <PageTitle title="Admin Dashboard" />
          <p className="text-muted-foreground">
            Manage users, roles, permissions, and system settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 rounded-md mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4 relative">
            <div className="bg-card rounded-md border border-border p-6 relative">
              <div className="relative mb-6">
                <h2 className="text-xl font-semibold mb-1">User Management</h2>
                <p className="text-muted-foreground text-sm">Manage user accounts from the system</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    disabled
                  />
                </div>
                <Button disabled>
                  <Plus className="h-4 w-4 mr-2" /> Add User
                </Button>
              </div>

              <UserTable />
              <ComingSoonOverlay />
            </div>
          </TabsContent>

          <TabsContent value="permissions">
            <div className="bg-card rounded-md border border-border p-6 relative">
              <div className="relative mb-6">
                <h2 className="text-xl font-semibold mb-1">Role-Based Permissions</h2>
                <p className="text-muted-foreground text-sm">Configure role-specific permissions for different users</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Available Roles</h3>
                  <RoleTable />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Permission Matrix</h3>
                  <PermissionsTable />
                </div>
              </div>
              <ComingSoonOverlay />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-card rounded-md border border-border p-6 relative">
              <div className="relative mb-6">
                <h2 className="text-xl font-semibold mb-1">System Settings</h2>
                <p className="text-muted-foreground text-sm">Configure global settings for the Thalos platform</p>
              </div>

              <SystemSettingsForm />
              <ComingSoonOverlay />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Admin;

