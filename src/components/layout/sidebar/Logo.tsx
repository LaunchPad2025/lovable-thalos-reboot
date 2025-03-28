
import React from "react";
import { HardHat } from "lucide-react";
import { isProduction } from "@/utils/environmentUtils";

const Logo: React.FC = () => (
  <div className="flex items-center px-4">
    <div className="flex items-center">
      <h1 className="text-xl font-bold text-white mr-2">
        Thalos<span className="text-primary">.</span>
      </h1>
      <HardHat size={18} className="text-primary" />
    </div>
    {!isProduction() && (
      <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-500">
        DEV
      </span>
    )}
  </div>
);

export default Logo;
