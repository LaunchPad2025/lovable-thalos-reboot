
import { User, Session } from '@supabase/supabase-js';

export type UserMetadata = {
  name?: string;
  role?: 'admin' | 'safety_officer' | 'worker';
  industries?: string[];
  preferredModules?: string[];
  onboarded?: boolean;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (metadata: UserMetadata) => Promise<void>;
}

export interface UseAuthListenersProps {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export interface UseAuthMethodsProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
