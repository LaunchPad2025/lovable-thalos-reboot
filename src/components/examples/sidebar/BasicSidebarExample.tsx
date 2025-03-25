
import React from "react";
import { Home, FileText, Bell, Settings, CheckSquare, AlertTriangle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";

const BasicSidebarExample = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-full">
        <Sidebar collapsible="none">
          <SidebarHeader className="px-4 py-3">
            <h3 className="text-lg font-semibold">Basic Sidebar</h3>
            <p className="text-xs text-muted-foreground">Simple navigation</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText />
                  <span>Regulations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CheckSquare />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <AlertTriangle />
                  <span>Violations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bell />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 text-xs text-center text-muted-foreground border-t">
            Basic Sidebar Example
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 bg-background">
          <h2 className="text-xl font-bold">Content Area</h2>
          <p className="mt-2 text-muted-foreground">This is where your main content would go.</p>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BasicSidebarExample;
