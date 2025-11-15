'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function AcercaDePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) to-(--clr8)">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-6xl py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-(--clr4) mb-6">ACERCA DE</h1>
            <p className="text-xl text-(--clr3) max-w-3xl mx-auto leading-relaxed">
              Información acerca de nuestro grupo, nuestra historia, quienes somos,
              nuestro equipo de guiadoras y dirigentes, nuestros apoderados,
              nuestra institución patrocinante y nuestra misión y visión como grupo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "QUIENES SOMOS",
                description: "Conoce quiénes somos como grupo de Guías y Scouts",
                path: "/acerca-de/quienes-somos",
                bg: "bg-gradient-to-br from-(--clr7) to-(--clr4)"
              },
              {
                title: "INSTITUCIÓN PATROCINANTE",
                description: "Información sobre nuestra institución patrocinante",
                path: "/acerca-de/institucion-patrocinante",
                bg: "bg-gradient-to-br from-(--clr4) to-(--clr7)"
              },
              {
                title: "MISIÓN Y VISIÓN",
                description: "Nuestra misión y visión como grupo scout",
                path: "/acerca-de/mision-y-vision",
                bg: "bg-gradient-to-br from-(--clr5) to-(--clr6)"
              },
              {
                title: "NUESTRA HISTORIA",
                description: "La historia de nuestro grupo Guía y Scout",
                path: "/acerca-de/nuestra-historia",
                bg: "bg-gradient-to-br from-(--clr6) to-(--clr5)"
              },
              {
                title: "NUESTRO EQUIPO",
                description: "Conoce a nuestro equipo de guiadoras y dirigentes",
                path: "/acerca-de/nuestro-equipo",
                bg: "bg-gradient-to-br from-(--clr3) to-(--clr4)"
              },
              {
                title: "NUESTROS APODERADOS",
                description: "Trabajando juntos somos un gran equipo",
                path: "/acerca-de/nuestros-apoderados",
                bg: "bg-gradient-to-br from-(--clr7) to-(--clr5)"
              }
            ].map((item, index) => (
              <Link href={item.path} key={index}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                  <div className={`h-48 rounded-t-xl ${item.bg} flex items-center justify-center`}>
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-(--clr4) group-hover:text-(--clr7) transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-(--clr3) mb-4">{item.description}</p>
                    <Button variant="outline" className="w-full">
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-(--clr4) mb-4">Nuestro Compromiso</h2>
            <p className="text-(--clr3) max-w-3xl mx-auto">
              Guías y Scouts Nua Mana - Una nueva aventura. Nuestra misión es contribuir a la educación de jóvenes
              para que participen en la construcción de un mundo mejor, donde las personas se desarrollen plenamente
              y jueguen un papel constructivo en la sociedad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}