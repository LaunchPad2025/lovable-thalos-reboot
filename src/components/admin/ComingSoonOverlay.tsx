
import React from "react";
import { BadgeInfo } from "lucide-react";

const ComingSoonOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-md">
      <BadgeInfo className="h-12 w-12 text-blue-400 mb-2" />
      <h3 className="text-xl font-bold text-white mb-1">Coming Soon</h3>
      <p className="text-gray-300 text-center max-w-md px-4">
        This feature is under development and currently shows simulated data. 
        Full functionality will be available in a future update.
      </p>
    </div>
  );
};

export default ComingSoonOverlay;
