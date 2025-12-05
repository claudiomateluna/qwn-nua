'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Lock, Mail } from 'lucide-react';

export default function SignIn() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Evitar envíos múltiples
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(''); // Limpiar error anterior

    // Login function returns an object with error property
    const result = await login(rut, password);

    if (result.error) {
      // Mostrar mensaje de error específico
      setError(result.error.message || 'RUT o contraseña incorrectos');
      setIsSubmitting(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[95vh] flex flex-col size-auto">
      {/* Back Arrow */}
      <div className="p-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-[#2c3e50] hover:text-[#e74c3c] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Volver</span>
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md">
          <Card className="rounded-3xl overflow-hidden border-0">
            <div className="bg-gradient-to-r from-[var(--clr7)] to-[var(--clr4)] p-8 text-center text-[var(--clr8)]">
              <div className="mx-auto bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <img
                  src="/images/logos/LogoColor.svg"
                  alt="Nua Mana Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold">¡Bienvenido de vuelta!</h1>
              <p className="mt-2 opacity-80">Inicia sesión en tu aventura scout</p>
            </div>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rut" className="text-gray-700 font-medium">RUT</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="rut"
                        type="text"
                        placeholder="12.345.678-9"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {error && (
                    <div key={`error-${Date.now()}`} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="xl" variant="gradient-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>

                  <div className="text-center text-sm text-gray-600 pt-2">
                    ¿No tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => router.push('/auth/signup')}
                      className="font-bold text-red-600 hover:underline"
                    >
                      Regístrate aquí
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}