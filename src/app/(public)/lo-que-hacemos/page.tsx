'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function LoQueHacemosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) to-(--clr8)">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-6xl py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-(--clr4) mb-6">LO QUE HACEMOS</h1>
            <p className="text-xl text-(--clr3) max-w-3xl mx-auto leading-relaxed">
              Información sobre lo que hacemos, nuestra metodología, nuestro sistema de trabajo,
              nuestros principios y valores, lo que buscamos enseñar y el cómo este conjunto de
              cosas nos permite apoyar el desarrollo propio de cada niño, niña o joven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "APRENDER HACIENDO",
                description: "Metodología utilizada desde hace más de 100 años en el escultismo",
                path: "/lo-que-hacemos/aprender-haciendo",
                bg: "bg-gradient-to-br from-(--clr7) to-(--clr4)"
              },
              {
                title: "EL MÉTODO SCOUT",
                description: "El sistema fundamental del movimiento scout",
                path: "/lo-que-hacemos/el-metodo-scout",
                bg: "bg-gradient-to-br from-(--clr4) to-(--clr7)"
              },
              {
                title: "HABILIDADES Y TÉCNICAS",
                description: "Desarrollo de competencias prácticas en los jóvenes",
                path: "/lo-que-hacemos/habilidades-y-tecnicas",
                bg: "bg-gradient-to-br from-(--clr5) to-(--clr6)"
              },
              {
                title: "LEY Y PROMESA",
                description: "Los principios fundamentales del movimiento scout",
                path: "/lo-que-hacemos/ley-y-promesa",
                bg: "bg-gradient-to-br from-(--clr6) to-(--clr5)"
              },
              {
                title: "PROGRAMA Y ACTIVIDADES",
                description: "Nuestro enfoque educativo a través de actividades",
                path: "/lo-que-hacemos/programa-y-actividades",
                bg: "bg-gradient-to-br from-(--clr3) to-(--clr4)"
              },
              {
                title: "SISTEMA DE EQUIPOS",
                description: "Organización de los jóvenes en grupos de trabajo",
                path: "/lo-que-hacemos/sistema-de-equipos",
                bg: "bg-gradient-to-br from-(--clr7) to-(--clr5)"
              },
              {
                title: "VIDA AL AIRE LIBRE",
                description: "Importancia de la naturaleza en nuestra formación",
                path: "/lo-que-hacemos/vida-al-aire-libre",
                bg: "bg-gradient-to-br from-(--clr5) to-(--clr7)"
              },
              {
                title: "VIDA REFLEXIVA",
                description: "Profundizando en valores y crecimiento personal",
                path: "/lo-que-hacemos/vida-reflexiva",
                bg: "bg-gradient-to-br from-(--clr4) to-(--clr6)"
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
