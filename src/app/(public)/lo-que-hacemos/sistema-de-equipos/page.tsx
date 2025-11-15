'use client';

import { Button } from '@/components/ui/modern-button';
import Link from 'next/link';

export default function SistemaDeEquiposPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-(--clr1) to-(--clr8) py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-(--clr4) mb-6">SISTEMA DE EQUIPOS</h1>
          <p className="text-xl text-(--clr3)">Organización de los jóvenes en grupos de trabajo</p>
        </div>

        <div className="bg-(--clr1) rounded-2xl p-12 mb-12 shadow-lg border border-(--clr4)/20 text-center">
          <h2 className="text-2xl font-bold text-(--clr4) mb-4">¡Próximamente!</h2>
          <p className="text-(--clr3) mb-6">
            Estamos trabajando para traerte la información sobre Sistema de Equipos.
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
          <Link href="/lo-que-hacemos/vida-al-aire-libre">
            <Button>
              Siguiente: Vida al Aire Libre →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}