'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('lobato (a)'); // Cambiado a un rol más atractivo para jóvenes
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signup(email, password, firstName, lastName);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Back Arrow */}
      <div className="p-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-[#2c3e50] hover:text-[#e74c3c] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Inicio</span>
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
            <div className="bg-gradient-to-r from-blue-700 to-green-700 p-8 text-center text-white">
              <div className="mx-auto bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <img
                  src="/images/logos/LogoColor.svg"
                  alt="Nua Mana Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold">¡Únete a la Aventura!</h1>
              <p className="mt-2 opacity-80">Crea tu cuenta y comienza tu camino scout</p>
            </div>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">Nombre</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Apellido</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

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
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-700 font-medium">Rol</Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="lobato (a)">Lobato(a)</option>
                      <option value="guia">Guía</option>
                      <option value="scout">Scout</option>
                      <option value="pionera (o)">Pionero(a)</option>
                      <option value="caminante">Caminante</option>
                      <option value="dirigente">Dirigente</option>
                      <option value="apoderado">Apoderado</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="xl" variant="gradient-primary">
                    Crear Cuenta
                  </Button>

                  <div className="text-center text-sm text-gray-600 pt-2">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => router.push('/auth/signin')}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      Inicia sesión aquí
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