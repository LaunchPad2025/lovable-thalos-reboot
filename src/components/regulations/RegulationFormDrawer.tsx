
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import RegulationForm from "@/components/regulations/RegulationForm";

interface RegulationFormDrawerProps {
  onSuccess: () => void;
}

const RegulationFormDrawer = ({ onSuccess }: RegulationFormDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Add Regulation
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Regulation</DrawerTitle>
          <DrawerDescription>
            Add a new regulation, standard, or rulebook to your library
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <RegulationForm onSuccess={() => {
            // Close drawer and refresh data
            const drawerClose = document.querySelector(
              '[data-drawer-close="true"]'
            ) as HTMLElement;
            drawerClose?.click();
            onSuccess();
          }} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RegulationFormDrawer;
