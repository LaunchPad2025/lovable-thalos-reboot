
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Security Settings</h2>
        <p className="text-gray-400">Manage your account security and authentication preferences</p>
      </div>
      
      {/* Change Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Change Password</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              className="bg-[#131920] border-gray-700 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              className="bg-[#131920] border-gray-700 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="bg-[#131920] border-gray-700 mt-1"
            />
          </div>
          
          <Button className="bg-thalos-blue hover:bg-blue-600">
            Update Password
          </Button>
        </div>
      </div>
      
      {/* Two Factor Authentication */}
      <div className="pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Two Factor Authentication</h3>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center ml-4 pl-4 text-gray-400 text-sm">
          <Button variant="outline" className="text-xs bg-transparent border-gray-700 text-gray-300 hover:bg-[#1e2530]">
            Setup 2FA
          </Button>
        </div>
      </div>
      
      {/* Session Management */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lg font-medium mb-4">Session Management</h3>
        <p className="text-sm text-gray-400 mb-4">You are currently logged in from 1 device</p>
        
        <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-[#1e2530]">
          Sign Out All Devices
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
