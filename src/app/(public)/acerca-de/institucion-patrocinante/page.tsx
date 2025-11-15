'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function InstitucionPatrocinantePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) from-40% to-(--clr2) to-100%">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-6">INSTITUCIÓN PATROCINANTE</h1>
            <p className="text-xl text-(--clr3)">Colegio Los Navíos</p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">Detalles de la Institución</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-(--clr4) mb-2">Ubicación</h3>
                <p className="text-(--clr3)">Bahía Catalina 11781 y 11754, La Florida</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--clr4) mb-2">Director</h3>
                <p className="text-(--clr3)">Mauricio Soto Guajardo</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-(--clr4) mb-2">Tipo</h3>
            <p className="text-(--clr3) mb-6">Institución educativa inclusiva que imparte enseñanza pre-básica y básica</p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">Filosofía Educativa</h2>
            <p className="mb-4">
              El colegio Los Navíos busca:
            </p>
            <ul className="list-disc list-inside text-(--clr3) space-y-2 mb-6">
              <li>Formar en los estudiantes actitudes basadas y asociadas a los valores del respeto, honestidad, perseverancia y solidaridad</li>
              <li>Promover la sana convivencia escolar</li>
              <li>Formar y educar estudiantes responsables y respetuosos</li>
              <li>Desarrollar habilidades y competencias cognitivas, motrices y sociales</li>
              <li>Facilitar la valoración positiva de sí mismos</li>
              <li>Promover la continuidad escolar y adaptación a nuevos desafíos</li>
            </ul>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">Programas Educativos</h2>
            <p className="mb-4">
              La institución cuenta con los siguientes programas:
            </p>
            <ul className="list-disc list-inside text-(--clr3) space-y-2">
              <li>Programas de orientación</li>
              <li>Convivencia escolar</li>
              <li>Prevención de drogas y alcohol</li>
              <li>Educación de la afectividad y sexualidad</li>
              <li>Cuidado del Medio Ambiente</li>
              <li>Promoción de la vida sana</li>
              <li>Talleres HPV</li>
            </ul>
          </div>

          <div className="text-center bg-gradient-to-r from-(--clr4) to-(--clr7) text-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Guías y Scouts Nua Mana</h2>
            <p className="text-lg mb-4">Una nueva aventura</p>
            <p>
              Nuestra misión es contribuir a la educación de jóvenes para que participen en la construcción de un mundo mejor,
              donde las personas se desarrollen plenamente y jueguen un papel constructivo en la sociedad.
              Mediante un sistema de valores basado en principios espirituales, sociales y personales, que se expresan en la Ley y la Promesa.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/acerca-de">
              <Button variant="outline">
                ← Volver a Acerca de
              </Button>
            </Link>
            <Link href="/acerca-de/mision-y-vision">
              <Button>
                Siguiente: Misión y Visión →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
