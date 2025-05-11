import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';
import { supabase } from '../utils/supabase';

// Define user types
export interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Credentials {
  email: string;
  password: string;
}

// Define store state
interface UserState {
  // State
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  signUp: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

// Create the store
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      profile: null,
      isAuthenticated: false,
      isInitialized: false,
      
      // Initialize the store on app start
      initialize: async () => {
        try {
          // Check if user is already authenticated
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { id, email, created_at, updated_at } = session.user;
            
            set({
              user: {
                id,
                email: email || '',
                created_at: created_at || new Date().toISOString(),
                updated_at: updated_at || new Date().toISOString(),
              },
              isAuthenticated: true,
            });
            
            // Fetch user profile if authenticated
            try {
              await get().fetchProfile();
            } catch (error) {
              console.error('Failed to fetch profile:', error);
            }
          }
        } catch (error) {
          console.error('Session initialization error:', error);
        } finally {
          set({ isInitialized: true });
        }
      },
      
      // Login user
      login: async (credentials: Credentials) => {
        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        
        if (error) {
          throw error;
        }
        
        if (data.user) {
          const { id, email, created_at, updated_at } = data.user;
          
          set({
            user: {
              id,
              email: email || '',
              created_at: created_at || new Date().toISOString(),
              updated_at: updated_at || new Date().toISOString(),
            },
            isAuthenticated: true,
          });
          
          await get().fetchProfile();
        }
      },
      
      // Sign up new user
      signUp: async (credentials: Credentials) => {
        const { data, error } = await supabase.auth.signUp(credentials);
        
        if (error) {
          throw error;
        }
        
        if (data.user) {
          const { id, email, created_at, updated_at } = data.user;
          
          set({
            user: {
              id,
              email: email || '',
              created_at: created_at || new Date().toISOString(),
              updated_at: updated_at || new Date().toISOString(),
            },
            isAuthenticated: true,
          });
          
          // Create empty profile for new user
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({ user_id: id });
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
          
          await get().fetchProfile();
        }
      },
      
      // Logout user
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          throw error;
        }
        
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
        });
      },
      
      // Update user profile
      updateProfile: async (data: Partial<UserProfile>) => {
        const currentUser = get().user;
        
        if (!currentUser) {
          throw new Error('User must be authenticated to update profile');
        }
        
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('user_id', currentUser.id);
          
        if (error) {
          throw error;
        }
        
        // Refresh profile data
        await get().fetchProfile();
      },
      
      // Update user data
      updateUser: async (data: Partial<User>) => {
        const { error } = await supabase.auth.updateUser(data);
        
        if (error) {
          throw error;
        }
        
        const currentUser = get().user;
        
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...data,
              updated_at: new Date().toISOString(),
            },
          });
        }
      },
      
      // Fetch user profile from database
      fetchProfile: async () => {
        const currentUser = get().user;
        
        if (!currentUser) {
          throw new Error('User must be authenticated to fetch profile');
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          set({ profile: data as UserProfile });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for common use cases
export const useUser = () => useUserStore((state) => state.user);
export const useProfile = () => useUserStore((state) => state.profile);
export const useIsAuthenticated = () => useUserStore((state) => state.isAuthenticated);
export const useIsInitialized = () => useUserStore((state) => state.isInitialized); 