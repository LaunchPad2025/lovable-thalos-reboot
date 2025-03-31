
import React from 'react';

export const Pickaxe = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m14 15 7 7"/>
      <path d="m11.5 12.5-5-5"/>
      <path d="M18 2 4 16"/>
      <path d="m21 5-7.5 7.5"/>
      <path d="M14 8 5.5 16.5"/>
      <path d="M3 21 7 8"/>
    </svg>
  );
};
