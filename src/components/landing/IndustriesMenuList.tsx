
import React from 'react';
import IndustryItem from './IndustriesMenu';

export const industriesData = [
  {
    title: "Construction",
    href: "/industries/construction",
    description: "Safety compliance and risk management for construction sites."
  },
  {
    title: "Mining",
    href: "/industries/mining",
    description: "Comprehensive safety solutions for underground and surface mining operations."
  },
  {
    title: "Oil & Gas",
    href: "/industries/oil-gas",
    description: "Safety compliance for drilling, refining, and distribution operations."
  },
  {
    title: "Manufacturing",
    href: "/industries/manufacturing",
    description: "Automated safety oversight for manufacturing facilities."
  },
  {
    title: "Energy & Utilities",
    href: "/industries/energy-utilities",
    description: "Specialized safety solutions for power generation and distribution."
  }
];

interface IndustriesMenuListProps {
  className?: string;
}

const IndustriesMenuList: React.FC<IndustriesMenuListProps> = ({ className }) => {
  return (
    <ul className={cn("grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]", className)} role="menu">
      {industriesData.map((industry, index) => (
        <IndustryItem
          key={index}
          title={industry.title}
          href={industry.href}
          description={industry.description}
        />
      ))}
    </ul>
  );
};

export default IndustriesMenuList;
