
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
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

const FloatingSidebarExample = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-full bg-gray-50">
        <Sidebar variant="floating">
          <SidebarHeader className="px-4 py-3">
            <h3 className="text-lg font-semibold">Floating Sidebar</h3>
            <p className="text-xs text-muted-foreground">With shadow and border</p>
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
            Floating Sidebar Example
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 bg-gray-50">
          <div className="flex items-center mb-4">
            <SidebarTrigger className="mr-2" />
            <h2 className="text-xl font-bold">Content Area</h2>
          </div>
          <p className="mt-2 text-muted-foreground">This sidebar has a floating style with shadow and rounded corners.</p>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FloatingSidebarExample;
