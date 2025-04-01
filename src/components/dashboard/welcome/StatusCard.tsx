
import React from 'react';
import { Link } from 'react-router-dom';

interface StatusCardProps {
  title: string;
  value: string | number;
  link: string;
  linkText: string;
}

const StatusCard = ({ title, value, link, linkText }: StatusCardProps) => {
  return (
    <div className="bg-[#151c25] p-4 rounded-lg border border-gray-800">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      <Link to={link} className="text-blue-400 text-sm mt-2 block hover:text-blue-300">
        {linkText}
      </Link>
    </div>
  );
};

export default StatusCard;
