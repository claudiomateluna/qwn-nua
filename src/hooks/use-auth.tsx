'use client';

// Hook para manejar la autenticación de usuarios con Supabase
// Este hook proporciona funciones para login, signup, logout y estado de autenticación

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { supabase } from '@/services/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

import { User } from '@/types';

// Definir el tipo para el contexto de autenticación
interface AuthContextType {
  user: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  login: (rut: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, firstName: string, lastName: string, rut?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        const { data: userProfile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        setProfile(userProfile as User);
      }
      setLoading(false);

      // Escuchar cambios de autenticación
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setUser(session?.user || null);
          if (session?.user) {
            const { data: userProfile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
            setProfile(userProfile as User);
          }
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  // Función para iniciar sesión con RUT
  const login = async (rut: string, password: string) => {
    // Primero, buscar al usuario por RUT en la tabla personalizada
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('rut', rut)
      .single();

    if (userError || !userData) {
      // Para evitar revelar si el usuario existe o no, mostramos un mensaje genérico
      return { error: new Error('RUT o contraseña incorrectos') };
    }

    // Usar el email encontrado para iniciar sesión con Supabase
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });

    if (authError) {
      // Si el usuario existe pero la contraseña es incorrecta, también mostramos mensaje genérico
      return { error: new Error('RUT o contraseña incorrectos') };
    }

    return { error: null };
  };

  // Función para registrarse
  const signup = async (email: string, password: string, firstName: string, lastName: string, rut?: string) => {
    try {
      // Dividir el apellido en paternal y maternal si es necesario
      let paternalLastName = '';
      let maternalLastName = '';

      // Dividir el apellido en dos partes si hay un espacio
      if (lastName) {
        const nameParts = lastName.trim().split(' ');
        if (nameParts.length === 1) {
          paternalLastName = nameParts[0];
        } else if (nameParts.length >= 2) {
          paternalLastName = nameParts[0];
          maternalLastName = nameParts.slice(1).join(' ');
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            paternal_last_name: paternalLastName,
            maternal_last_name: maternalLastName
          },
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`
        }
      });

      if (error) {
        console.error("Signup error:", error);
        return { error };
      }

      // El perfil de usuario ahora se crea en la página de registro
      // para evitar problemas de sesión y RLS durante el proceso de registro

      return { error: null };
    } catch (err) {
      console.error("Unexpected signup error:", err);
      return { error: err as any };
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Función para restablecer contraseña
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  const value = {
    user,
    profile,
    loading,
    login,
    signup,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}