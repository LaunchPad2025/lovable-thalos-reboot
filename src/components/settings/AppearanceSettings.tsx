
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Appearance Settings</h2>
        <p className="text-gray-400">Customize how Thalos looks and feels</p>
      </div>
      
      {/* Theme Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme</h3>
        <RadioGroup defaultValue="dark" className="space-y-3">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark">Dark (Default)</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light">Light</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system">Use System Settings</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Density Settings */}
      <div className="pt-6 border-t border-gray-800 space-y-4">
        <h3 className="text-lg font-medium">Display Density</h3>
        <RadioGroup defaultValue="comfortable" className="space-y-3">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="comfortable" id="density-comfortable" />
            <Label htmlFor="density-comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="compact" id="density-compact" />
            <Label htmlFor="density-compact">Compact</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Sidebar Settings */}
      <div className="pt-6 border-t border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Sidebar</h3>
            <p className="text-sm text-gray-400">Auto-collapse sidebar on small screens</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      {/* Animation Settings */}
      <div className="pt-6 border-t border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Animations</h3>
            <p className="text-sm text-gray-400">Enable UI animations and transitions</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button className="bg-thalos-blue hover:bg-blue-600">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
