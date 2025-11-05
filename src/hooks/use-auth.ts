// Hook para manejar la autenticación de usuarios con Supabase
// Este hook proporciona funciones para login, signup, logout y estado de autenticación

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { supabase } from '@/services/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Definir el tipo para el contexto de autenticación
interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Escuchar cambios de autenticación
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  // Función para registrarse
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) {
      return { error };
    }

    // Si el usuario se registró exitosamente, intentar iniciar sesión automáticamente
    if (!error) {
      // Aquí normalmente se enviaría un correo de confirmación
      // Por simplicidad, asumiremos que el usuario puede iniciar sesión después del registro
    }

    return { error };
  };

  // Función para cerrar sesión
  const logout = async () => {
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
    loading,
    login,
    signup,
    logout,
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