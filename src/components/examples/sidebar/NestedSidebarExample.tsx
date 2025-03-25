
import React, { useState } from "react";
import { Home, FileText, Bell, Settings, CheckSquare, AlertTriangle, ChevronDown, ChevronRight, Users, ShieldCheck, Folder } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const NestedSidebarExample = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    documents: false,
    settings: false
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-full">
        <Sidebar>
          <SidebarHeader className="px-4 py-3">
            <h3 className="text-lg font-semibold">Nested Sidebar</h3>
            <p className="text-xs text-muted-foreground">With expandable sections</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Nested Documents Section */}
              <SidebarMenuItem>
                <Collapsible open={openItems.documents} onOpenChange={() => toggleItem("documents")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Documents">
                      <Folder />
                      <span>Documents</span>
                      {openItems.documents ? 
                        <ChevronDown className="ml-auto h-4 w-4" /> : 
                        <ChevronRight className="ml-auto h-4 w-4" />
                      }
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Regulations</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Policies</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Reports</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
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
              
              {/* Nested Settings Section */}
              <SidebarMenuItem>
                <Collapsible open={openItems.settings} onOpenChange={() => toggleItem("settings")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                      {openItems.settings ? 
                        <ChevronDown className="ml-auto h-4 w-4" /> : 
                        <ChevronRight className="ml-auto h-4 w-4" />
                      }
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Account</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Appearance</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Security</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Notifications</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 text-xs text-center text-muted-foreground border-t">
            Nested Sidebar Example
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 bg-background">
          <div className="flex items-center mb-4">
            <SidebarTrigger className="mr-2" />
            <h2 className="text-xl font-bold">Content Area</h2>
          </div>
          <p className="mt-2 text-muted-foreground">This sidebar has nested navigation items that can be expanded and collapsed.</p>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NestedSidebarExample;
