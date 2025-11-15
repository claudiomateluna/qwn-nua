'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function ElMetodoScoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) to-(--clr8)">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-6">EL MÉTODO SCOUT</h1>
            <p className="text-xl text-(--clr3)">El sistema fundamental del movimiento scout</p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-12 mb-12 shadow-lg border border-(--clr4)/20 text-center">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">¡Próximamente!</h2>
            <p className="text-(--clr3) mb-6">
              Estamos trabajando para traerte la información sobre el Método Scout.
            </p>
            <p className="text-(--clr3)">
              Mientras tanto, puedes explorar otras secciones de nuestro sitio.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/lo-que-hacemos">
              <Button variant="outline">
                ← Volver a Lo que hacemos
              </Button>
            </Link>
            <Link href="/lo-que-hacemos/habilidades-y-tecnicas">
              <Button>
                Siguiente: Habilidades y Técnicas →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
