
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NotificationPreferences = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <p className="text-sm text-muted-foreground">Manage your notification settings</p>
      </div>

      <div className="space-y-4">
        {/* Notification Channels */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Channels</h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">In-App Notifications</h4>
              <p className="text-sm text-muted-foreground">Show notifications within the application</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Mobile Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch />
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
                Soon
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch />
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
                Soon
              </span>
            </div>
          </div>
        </div>
        
        {/* Notification Types */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-medium mb-4">Notification Types</h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Safety Violations</h4>
              <p className="text-sm text-muted-foreground">When new violations are detected</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Task Assignments</h4>
              <p className="text-sm text-muted-foreground">When tasks are assigned to you</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Risk Assessments</h4>
              <p className="text-sm text-muted-foreground">Updates on risk assessments</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Audit Notifications</h4>
              <p className="text-sm text-muted-foreground">Upcoming and completed audits</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Document Updates</h4>
              <p className="text-sm text-muted-foreground">When documents are added or updated</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">System Announcements</h4>
              <p className="text-sm text-muted-foreground">Updates about the platform</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        {/* Notification Frequency */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
          
          <div className="mb-4">
            <Label htmlFor="digest">Email Digest Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="digest" className="mt-1">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Quiet Hours</Label>
            <div className="flex items-center space-x-2 mt-1">
              <div>
                <Label htmlFor="startTime" className="text-xs">From</Label>
                <Input id="startTime" type="time" defaultValue="22:00" className="w-28" />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-xs">To</Label>
                <Input id="endTime" type="time" defaultValue="07:00" className="w-28" />
              </div>
              <div className="ml-2 text-xs px-1.5 py-0.5 bg-purple-900/30 text-purple-300 border border-purple-800 rounded-md">
                Soon
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
