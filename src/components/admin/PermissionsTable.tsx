
import React from "react";
import { Switch } from "@/components/ui/switch";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PermissionRowProps {
  action: string;
  admin: boolean;
  manager: boolean;
  user: boolean;
}

const PermissionRow: React.FC<PermissionRowProps> = ({ action, admin, manager, user }) => {
  return (
    <tr className="border-b border-border">
      <td className="py-2 px-3 flex items-center gap-1">
        {action}
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="w-48">Permission to {action.toLowerCase()} in this module</p>
          </TooltipContent>
        </Tooltip>
      </td>
      <td className="py-2 px-3 text-center">
        <Switch checked={admin} disabled />
      </td>
      <td className="py-2 px-3 text-center">
        <Switch checked={manager} disabled />
      </td>
      <td className="py-2 px-3 text-center">
        <Switch checked={user} disabled />
      </td>
    </tr>
  );
};

interface ModuleSectionProps {
  moduleName: string;
  permissions: {
    action: string;
    admin: boolean;
    manager: boolean;
    user: boolean;
  }[];
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ moduleName, permissions }) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium py-2 px-3 bg-sidebar-hover rounded-t-md">
        {moduleName}
      </h3>
      <div className="border border-border rounded-b-md">
        <table className="w-full">
          <tbody>
            {permissions.map((perm) => (
              <PermissionRow
                key={`${moduleName}-${perm.action}`}
                action={perm.action}
                admin={perm.admin}
                manager={perm.manager}
                user={perm.user}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PermissionsTable: React.FC = () => {
  const modules = [
    {
      name: "Dashboard",
      permissions: [
        { action: "View", admin: true, manager: true, user: true },
        { action: "Edit", admin: true, manager: false, user: false },
      ]
    },
    {
      name: "Users",
      permissions: [
        { action: "View", admin: true, manager: true, user: false },
        { action: "Create", admin: true, manager: false, user: false },
        { action: "Edit", admin: true, manager: false, user: false },
        { action: "Delete", admin: true, manager: false, user: false },
      ]
    },
    {
      name: "Violations",
      permissions: [
        { action: "View", admin: true, manager: true, user: true },
        { action: "Create", admin: true, manager: true, user: true },
        { action: "Edit", admin: true, manager: true, user: false },
        { action: "Delete", admin: true, manager: false, user: false },
        { action: "Approve", admin: true, manager: true, user: false },
      ]
    },
    {
      name: "Tasks",
      permissions: [
        { action: "View", admin: true, manager: true, user: true },
        { action: "Create", admin: true, manager: true, user: false },
        { action: "Edit", admin: true, manager: true, user: false },
        { action: "Delete", admin: true, manager: true, user: false },
        { action: "Assign", admin: true, manager: true, user: false },
      ]
    },
    {
      name: "Settings",
      permissions: [
        { action: "View", admin: true, manager: true, user: false },
        { action: "Edit", admin: true, manager: false, user: false },
      ]
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="grid grid-cols-4 w-full">
            <div className="col-span-1 px-3 font-medium text-sm">Permissions</div>
            <div className="col-span-3 grid grid-cols-3 text-center text-sm font-medium">
              <div>Admin</div>
              <div>Manager</div>
              <div>User</div>
            </div>
          </div>
        </div>
      </div>
      
      {modules.map((module) => (
        <ModuleSection key={module.name} moduleName={module.name} permissions={module.permissions} />
      ))}
    </div>
  );
};

export default PermissionsTable;
