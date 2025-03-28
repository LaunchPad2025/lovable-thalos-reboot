
import { Session, User } from '@supabase/supabase-js';

export interface UserMetadata {
  name?: string;
  role?: string;
  onboarded?: boolean;
  industries?: string[];
  preferredModules?: string[];
  has_subscription?: boolean;
  subscription_plan?: string;
  subscription_status?: string;
  organization_id?: string;
  [key: string]: any;
}

export interface UseAuthMethodsProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (metadata: UserMetadata) => Promise<void>;
}
