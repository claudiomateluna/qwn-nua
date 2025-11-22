'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/modern-button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button className="w-full sm:w-auto">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}