'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function SignOutPage() {
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut();
        // Redirigir al usuario a la página de inicio después de cerrar sesión
        router.push('/');
        router.refresh(); // Actualizar para que se reflejen cambios de autenticación
      } catch (error) {
        console.error('Error during sign out:', error);
        // En caso de error, también redirigir al inicio
        router.push('/');
      }
    };

    // Confirmar que el usuario realmente quiere cerrar sesión
    if (typeof window !== 'undefined' && confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      performSignOut();
    } else {
      // Si cancela, volver al dashboard
      router.push('/dashboard');
    }
  }, [signOut, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Cerrando sesión...</p>
      </div>
    </div>
  );
}