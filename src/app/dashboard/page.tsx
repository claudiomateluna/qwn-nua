'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, FileText, Package, Coins, FileInput, Trophy } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  const menuItems = [
    {
      title: "Usuarios",
      description: "Gestiona usuarios y perfiles",
      icon: User as any,
      action: () => router.push('/dashboard/users'),
      roleRequired: 'admin'
    },
    {
      title: "Artículos",
      description: "Crea y gestiona contenido",
      icon: FileText,
      action: () => router.push('/dashboard/articles'),
      roleRequired: 'admin'
    },
    {
      title: "Inventario",
      description: "Control de equipo y recursos",
      icon: Package,
      action: () => router.push('/dashboard/inventory'),
      roleRequired: 'admin'
    },
    {
      title: "Tesorería",
      description: "Gestión financiera",
      icon: Coins,
      action: () => router.push('/dashboard/treasury'),
      roleRequired: 'admin'
    },
    {
      title: "Actas",
      description: "Actas de reuniones",
      icon: FileInput,
      action: () => router.push('/dashboard/minutes'),
      roleRequired: 'admin'
    },
    {
      title: "Avances",
      description: "Seguimiento de progreso scout",
      icon: Trophy,
      action: () => router.push('/dashboard/progress'),
      roleRequired: 'admin'
    }
  ];

  const filteredMenuItems = menuItems;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido a la plataforma de Nua Mana, {profile?.first_name} {profile?.paternal_last_name}
          </p>
        </div>
        <Button variant="outline" onClick={signOut}>Cerrar Sesión</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={item.action}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-100">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Acceder</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}