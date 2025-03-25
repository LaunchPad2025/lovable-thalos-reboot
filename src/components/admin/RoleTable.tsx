
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoleProps {
  name: string;
  description: string;
  users: number;
}

const roles: RoleProps[] = [
  {
    name: "Admin",
    description: "Full system access with all permissions",
    users: 3
  },
  {
    name: "Manager",
    description: "Department oversight with limited admin capabilities",
    users: 5
  },
  {
    name: "User",
    description: "Basic access for regular system users",
    users: 12
  }
];

const RoleTable: React.FC = () => {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-sidebar-hover">
          <tr className="border-b border-border">
            <th className="px-4 py-2 text-left font-medium text-sm">Role Name</th>
            <th className="px-4 py-2 text-left font-medium text-sm">Description</th>
            <th className="px-4 py-2 text-center font-medium text-sm">Users</th>
            <th className="px-4 py-2 text-right font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.name} className="border-b border-border">
              <td className="px-4 py-3 font-medium">{role.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{role.description}</td>
              <td className="px-4 py-3 text-center">
                <Badge variant="outline">{role.users} users</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm">Manage Role</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
