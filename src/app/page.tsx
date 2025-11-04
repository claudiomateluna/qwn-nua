'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenidos a <span className="text-blue-600">Nua Mana</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            La plataforma digital para Guías y Scouts Nua Mana. Donde la aventura y el crecimiento personal se encuentran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => router.push('/auth/signin')} 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/auth/signup')} 
              size="lg"
            >
              Registrarse
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Misión Scout</CardTitle>
              <CardDescription>
                Educar a jóvenes para que participen en la construcción de un mundo mejor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Empoderamiento Juvenil</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ciudadan@s Activ@s</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Valores y Habilidades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Educación para la Paz</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}