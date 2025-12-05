'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/navbar';
import { User, FileText, Package, Coins, FileInput, Trophy } from 'lucide-react';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  // Si está cargando la sesión, mostrar un indicador
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ffc41d]"></div>
      </div>
    );
  }

  // Si no hay usuario, redirigir al login
  useEffect(() => {
    if (!user && !loading) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  // Si no hay usuario, mostrar un mensaje de carga o null temporalmente
  if (!user && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ffc41d]"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: "Usuarios",
      description: "Gestiona usuarios y perfiles",
      icon: User as any,
      action: () => router.push('/dashboard/users'),
      roleRequired: ['admin', 'dirigente'],
      gradient: "from-[#2c3e50] to-[#ffc41d]"
    },
    {
      title: "Artículos",
      description: "Crea y gestiona contenido",
      icon: FileText,
      action: () => router.push('/dashboard/articles'),
      roleRequired: ['admin', 'dirigente'],
      gradient: "from-[#ffc41d] to-[#f39c12]"
    },
    {
      title: "Inventario",
      description: "Control de equipo y recursos",
      icon: Package,
      action: () => router.push('/dashboard/inventory'),
      roleRequired: ['admin', 'dirigente'],
      gradient: "from-[#e74c3c] to-[#c0392b]"
    },
    {
      title: "Tesorería",
      description: "Gestión financiera",
      icon: Coins,
      action: () => router.push('/dashboard/treasury'),
      roleRequired: ['admin', 'dirigente', 'tesorera'],
      gradient: "from-[#2c3e50] to-[#34495e]"
    },
    {
      title: "Actas",
      description: "Actas de reuniones",
      icon: FileInput,
      action: () => router.push('/dashboard/actas'),
      roleRequired: ['admin', 'dirigente'],
      gradient: "from-[#ffc41d] to-[#f39c12]"
    },
    {
      title: "Avances",
      description: "Seguimiento de progreso scout",
      icon: Trophy,
      action: () => router.push('/dashboard/progress'),
      roleRequired: ['admin', 'dirigente'],
      gradient: "from-[#e74c3c] to-[#cb2733]"
    }
  ];

  const filteredMenuItems = profile
    ? menuItems.filter(item =>
        !item.roleRequired ||
        item.roleRequired.includes(profile.role) ||
        item.roleRequired.includes('all')
      )
    : menuItems.filter(item => item.roleRequired.includes('all'));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="max-w-[1080px] mx-auto py-16 px-4 pt-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4 inika">Dashboard</h1>
          <p className="text-2xl text-[#e74c3c]">
            {profile?.first_name} {profile?.paternal_last_name}, ¡una nueva aventura te espera!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mx-auto">
          {filteredMenuItems.map((item, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#2c3e50] shadow-xl bg-gradient-to-b from-white to-[#fffff0] rounded-2xl overflow-hidden"
              onClick={item.action}
            >
              <div className={`bg-gradient-to-r ${item.gradient} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/30 backdrop-blur-sm">
                    <item.icon className="h-8 w-8 text-[#2c3e50]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                    <CardDescription className="text-white/90 mt-1">{item.description}</CardDescription>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6 p-6">
                <Button className="w-full bg-gradient-to-r from-[#2c3e50] to-[#ffc41d] hover:from-[#34495e] hover:to-[#e6b40d]">
                  Acceder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

    </div>
  );
}