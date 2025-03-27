
import React from "react";

const Logo: React.FC = () => (
  <div className="px-4 py-6 flex flex-col">
    <div className="flex items-center">
      <img 
        src="https://www.thalos.tech/assets/logo-thalos.png" 
        alt="Thalos Logo" 
        className="h-8 mr-2"
      />
    </div>
    <p className="text-sm text-muted-foreground">
      by Thalos Technologies
    </p>
  </div>
);

export default Logo;
