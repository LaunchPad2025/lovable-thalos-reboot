
import React from "react";
import { Home, FileText, Bell, Settings, CheckSquare, AlertTriangle, PanelLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const CollapsibleSidebarExample = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-full">
        <Sidebar>
          <SidebarHeader className="px-4 py-3">
            <h3 className="text-lg font-semibold">Collapsible Sidebar</h3>
            <p className="text-xs text-muted-foreground">Toggle with the button</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Regulations">
                  <FileText />
                  <span>Regulations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Tasks">
                  <CheckSquare />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Violations">
                  <AlertTriangle />
                  <span>Violations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Notifications">
                  <Bell />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 text-xs text-center text-muted-foreground border-t">
            Collapsible Sidebar Example
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 bg-background">
          <div className="flex items-center mb-4">
            <SidebarTrigger />
            <h2 className="text-xl font-bold ml-2">Content Area</h2>
          </div>
          <p className="mt-2 text-muted-foreground">Click the button above to toggle the sidebar.</p>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CollapsibleSidebarExample;
