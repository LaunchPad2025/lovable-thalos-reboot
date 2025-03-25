
import React from "react";
import { HardHat } from "lucide-react";

const Logo: React.FC = () => (
  <div className="px-4 py-6 flex flex-col">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-foreground mr-2">
        Thalos<span className="text-primary text-opacity-80">.</span>
      </h1>
      <HardHat size={20} className="text-primary" />
    </div>
    <p className="text-sm text-muted-foreground">
      powered by Steel Toe
    </p>
  </div>
);

export default Logo;
