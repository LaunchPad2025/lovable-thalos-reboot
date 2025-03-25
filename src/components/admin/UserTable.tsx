
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
}

const users: UserData[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    department: "Safety",
    status: "active"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    department: "Operations",
    status: "active"
  },
  {
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
    department: "Construction",
    status: "inactive"
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    department: "Logistics",
    status: "active"
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Manager",
    department: "Maintenance",
    status: "active"
  }
];

const UserTable: React.FC = () => {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-sidebar-hover">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Department</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{user.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">{user.department}</td>
              <td className="px-4 py-3">
                <Badge 
                  variant={user.status === "active" ? "default" : "secondary"}
                  className={user.status === "active" ? "bg-green-600" : "bg-gray-500"}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
