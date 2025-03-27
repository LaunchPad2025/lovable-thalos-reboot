import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCw, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

interface UserInvitation {
  id: string;
  email: string;
  role: string;
  department: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

const RecentInvitations = () => {
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const fetchInvitations = async (page: number) => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("user_invitations")
        .select("*")
        .order("created_at", { ascending: false })
        .range((page - 1) * 10, page * 10 - 1); // Fetch 10 invitations per page

      if (error) throw error;

      setInvitations(data || []);
    } catch (error: any) {
      console.error("Error fetching invitations:", error);
      toast.error("Failed to load invitations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations(page);
  }, [user, page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const resendInvitation = async (invitationId: string, email: string) => {
    try {
      // In a real implementation, this would call an API to resend the invitation
      toast.success(`Invitation resent to ${email}`);
    } catch (error: any) {
      console.error("Error resending invitation:", error);
      toast.error(error.message || "Failed to resend invitation");
    }
  };

  // Function to get a more user-friendly role name
  const formatRole = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'safety_officer':
        return 'Safety Manager';
      case 'worker':
        return 'Contributor';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  // Function to determine badge variant based on role
  const getRoleBadgeVariant = (role: string): "destructive" | "default" | "outline" | "secondary" => {
    switch (role) {
      case 'admin':
        return "destructive";
      case 'safety_officer':
        return "default";
      case 'worker':
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Invitations</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchInvitations(page)}
          disabled={isLoading}
        >
          <RotateCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : invitations.length === 0 ? (
          <div className="text-muted-foreground text-sm py-6 text-center">
            No invitations sent yet.
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="border-b border-border pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{invitation.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getRoleBadgeVariant(invitation.role)}>
                        {formatRole(invitation.role)}
                      </Badge>
                      {invitation.department && (
                        <span className="text-xs text-muted-foreground">
                          {invitation.department}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant={
                      invitation.status === 'accepted' ? "success" : 
                      invitation.status === 'pending' ? "outline" : "destructive"
                    }>
                      {invitation.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(invitation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {invitation.status === 'pending' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => resendInvitation(invitation.id, invitation.email)}
                  >
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    Resend
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-muted-foreground text-xs mt-4">
          <ul className="list-disc pl-4 space-y-1">
            <li>Invitations expire after 7 days</li>
            <li>Users must complete onboarding after registration</li>
            <li>You can resend invitations if they expire</li>
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentInvitations;
