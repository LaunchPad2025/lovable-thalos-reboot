
import React from "react";
import { mockRoles, mockModules } from "./mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, InfoIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const RolePermissions = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-border bg-card">
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Role-Based Permissions</h2>
          <p className="text-sm text-muted-foreground">Configure access and viewing permissions for different roles.</p>
          
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search roles..."
                className="w-full md:w-80 pl-8"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </div>

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRoles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.users} users</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Manage Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card p-4">
        <h2 className="text-lg font-semibold mb-4">Module Permissions</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modules</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockModules.map((module) => (
              <React.Fragment key={module.name}>
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={5} className="font-medium">
                    {module.name}
                  </TableCell>
                </TableRow>
                {module.permissions.map((permission) => (
                  <TableRow key={`${module.name}-${permission.action}`}>
                    <TableCell></TableCell>
                    <TableCell>{permission.action}</TableCell>
                    <TableCell>
                      <Switch
                        checked={permission.admin}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={permission.manager}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={permission.user}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RolePermissions;
