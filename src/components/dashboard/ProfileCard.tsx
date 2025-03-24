
import React from 'react';
import { User, Building, MapPin, Phone, Mail } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  role: string;
  company: string;
  location: string;
  phone: string;
  email: string;
}

const ProfileCard = ({ name, role, company, location, phone, email }: ProfileCardProps) => {
  return (
    <div className="thalos-card">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-thalos-blue-light flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-thalos-blue">{name.charAt(0)}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{role}</p>
        
        <div className="w-full space-y-3 mt-2">
          <div className="flex items-center">
            <Building size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{company}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{location}</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{phone}</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
