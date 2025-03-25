
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface Organization {
  id: string;
  name: string;
}

const UserInvitation = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("worker");
  const [department, setDepartment] = useState("");
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("organizations")
          .select("id, name");
          
        if (error) throw error;
        
        if (data) {
          setOrganizations(data);
          if (data.length > 0) {
            setOrganizationId(data[0].id);
          }
        }
      } catch (error: any) {
        console.error("Error fetching organizations:", error);
        toast.error("Failed to load organizations");
      }
    };

    fetchOrganizations();
  }, [user]);

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!session) {
      toast.error("You must be logged in to send invitations");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call our Supabase Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email,
          role,
          department: department || undefined,
          organization_id: organizationId || undefined,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send invitation");
      }
      
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setDepartment("");
      
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
          
          {organizations.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Select 
                value={organizationId || undefined} 
                onValueChange={setOrganizationId}
              >
                <SelectTrigger id="organization">
                  <SelectValue placeholder="Select an organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
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
