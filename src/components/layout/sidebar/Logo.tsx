
import React from "react";

const Logo: React.FC = () => (
  <div className="px-4 py-6 flex flex-col">
    <h1 className="text-2xl font-bold text-foreground">
      Thalos<span className="text-primary text-opacity-80">.</span>
    </h1>
    <p className="text-sm text-muted-foreground">
      powered by Steel Toe
    </p>
  </div>
);

export default Logo;
