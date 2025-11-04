'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, CheckCircle, CalendarDays } from 'lucide-react';

export default function ActasDashboard() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Actas",
      description: "Gestión de actas de reuniones",
      icon: FileText,
      action: () => router.push('/dashboard/actas'),
    },
    {
      title: "Participantes",
      description: "Gestión de participantes en reuniones",
      icon: Users,
      action: () => router.push('/dashboard/actas/participants'),
    },
    {
      title: "Acciones",
      description: "Seguimiento de acciones y compromisos",
      icon: CheckCircle,
      action: () => router.push('/dashboard/actas/acciones'),
    },
    {
      title: "Calendario",
      description: "Agenda de próximas reuniones",
      icon: CalendarDays,
      action: () => {},
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sistema de Actas</h1>
        <p className="text-muted-foreground">
          Gestiona las actas de reuniones, participantes y compromisos de la organización
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
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