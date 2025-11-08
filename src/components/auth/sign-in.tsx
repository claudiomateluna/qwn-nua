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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
          <div className="bg-gradient-to-r from-blue-700 to-green-700 p-8 text-center text-white">
            <div className="mx-auto bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold">¡Bienvenido de vuelta!</h1>
            <p className="mt-2 opacity-80">Inicia sesión en tu aventura scout</p>
          </div>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Correo Electrónico</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                    {error}
                  </div>
                )}
                
                <Button type="submit" className="w-full" size="xl" variant="gradient-primary">
                  Iniciar Sesión
                </Button>
                
                <div className="text-center text-sm text-gray-600 pt-2">
                  ¿No tienes una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/auth/signup')}
                    className="font-bold text-blue-600 hover:underline"
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
  );
}