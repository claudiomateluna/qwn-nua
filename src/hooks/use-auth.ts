import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        
        if (session?.user) {
          // Fetch user profile
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch user profile after sign in
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // We still want to continue even if profile fetch fails
        return;
      }

      if (data) {
        setProfile(data as User);
      }
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      throw error;
    }

    // Update user profile in the database
    if (data.user) {
      await updateUserProfile(data.user.id, userData);
      setUser(data.user);
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      setUser(data.user);
      await fetchUserProfile(data.user.id);
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    setUser(null);
    setProfile(null);
  };

  const updateUserProfile = async (userId: string, profileData: Partial<User>) => {
    const { error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    // Update local state
    if (profile) {
      setProfile({ ...profile, ...profileData });
    }
  };

  return {
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateUserProfile
  };
};