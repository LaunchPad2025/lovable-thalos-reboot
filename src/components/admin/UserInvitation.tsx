
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const UserInvitation = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("worker");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // that sends an invitation email and stores the invitation in the database
      const { data, error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          role,
          department,
          invited_by: user?.id,
          status: 'pending'
        })
        .select();
      
      if (error) throw error;
      
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Invite New User</CardTitle>
        <CardDescription>
          Send an invitation email to add a new user to the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendInvitation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={role} 
              onValueChange={setRole}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="safety_officer">Safety Officer</SelectItem>
                <SelectItem value="worker">Worker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="e.g. Safety, Operations, etc."
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Invitation"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
        <p>
          Users will receive an email with a link to set up their account.
          They will need to complete onboarding before accessing the system.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserInvitation;
