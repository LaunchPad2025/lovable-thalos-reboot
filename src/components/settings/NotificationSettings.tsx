
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
        <p className="text-gray-400">Manage how you receive notifications</p>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-gray-400">Receive notifications via email</p>
          </div>
          <Switch />
        </div>
        
        {/* Browser Notifications */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">Browser Notifications</h3>
            <p className="text-sm text-gray-400">Show notifications in the browser</p>
          </div>
          <Switch />
        </div>
        
        {/* SMS Notifications */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">SMS Notifications</h3>
            <p className="text-sm text-gray-400">Receive important alerts via SMS</p>
          </div>
          <Switch />
        </div>
        
        {/* Mobile Push Notifications */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">Mobile Push Notifications</h3>
            <p className="text-sm text-gray-400">Receive notifications on your mobile device</p>
          </div>
          <Switch />
        </div>
        
        {/* Notification Sounds */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">Notification Sounds</h3>
            <p className="text-sm text-gray-400">Play a sound when notifications arrive</p>
          </div>
          <Switch />
        </div>
      </div>
      
      {/* Notification Types Section */}
      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-lg font-medium mb-4">Notification Types</h3>
        
        {/* Task Assignments & Updates */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Task Assignments & Updates</h4>
            <p className="text-sm text-gray-400">When tasks are assigned to you or updated</p>
          </div>
          <Switch />
        </div>
        
        {/* Safety Violations */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Safety Violations</h4>
            <p className="text-sm text-gray-400">When new violations are detected</p>
          </div>
          <Switch />
        </div>
        
        {/* Reports & Analytics */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Reports & Analytics</h4>
            <p className="text-sm text-gray-400">Weekly and monthly reports</p>
          </div>
          <Switch />
        </div>
        
        {/* System Updates */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">System Updates</h4>
            <p className="text-sm text-gray-400">Platform and new feature notifications</p>
          </div>
          <Switch />
        </div>
        
        {/* Audit Permissions */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Audit Permissions</h4>
            <p className="text-sm text-gray-400">Notifications for upcoming and overdue audits</p>
          </div>
          <Switch />
        </div>
        
        {/* Training Notifications */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Training Notifications</h4>
            <p className="text-sm text-gray-400">Updates about training sessions and certifications</p>
          </div>
          <Switch />
        </div>
      </div>
      
      {/* Notification Frequency */}
      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
        
        {/* Email Digest Frequency */}
        <div className="mb-4">
          <Label htmlFor="emailDigest">Email Digest Frequency</Label>
          <select id="emailDigest" className="mt-1 block w-full p-2 bg-[#131920] border border-gray-700 rounded-md text-white">
            <option>Daily Digest</option>
            <option>Weekly Digest</option>
            <option>Real-time</option>
          </select>
        </div>
        
        {/* Quiet Hours */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" defaultValue="10:00" className="bg-[#131920] border-gray-700" />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" defaultValue="07:00" className="bg-[#131920] border-gray-700" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-thalos-blue hover:bg-blue-600">Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
