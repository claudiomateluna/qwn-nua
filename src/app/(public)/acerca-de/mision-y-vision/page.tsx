'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function MisionVisionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) from-40% to-(--clr2) to-100%">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-6">MISIÓN Y VISIÓN</h1>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">MISIÓN</h2>
            <p className="mb-6 text-(--clr3)">
              Nuestra misión es contribuir a la educación de jóvenes para que participen en la construcción de un mundo mejor,
              donde las personas se desarrollen plenamente y jueguen un papel constructivo en la sociedad.
            </p>
            <p className="mb-6 text-(--clr3)">
              Mediante un sistema de valores basado en principios espirituales, sociales y personales, que se expresan en la Ley y la Promesa.
            </p>
            <p className="text-(--clr3)">
              Como grupo queremos fomentar el crecimiento de niños y jóvenes en un ambiente de confianza para ellos,
              donde puedan desarrollar sus propias habilidades y reforzar las que ya posean, y entregarles valores como
              el cuidado por la naturaleza, la lealtad, la alegría, el optimismo, la cordialidad, el valorar el trabajo de los demás,
              la empatia y una espiritualidad sana entre otras cosas.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">VISIÓN</h2>
            <p className="mb-6 text-(--clr3)">
              Vemos al Movimiento como una fuerza social educativa vigente, valorado por la familia y la comunidad,
              fiel a su propósito, a sus principios, a sus valores y a su método, contribuyendo a satisfacer las necesidades
              de los jóvenes y de la sociedad.
            </p>
            <p className="mb-6 text-(--clr3)">
              Lo vemos integrado por la mayor cantidad de niños, niñas y jóvenes de su historia, sin distinciones de ningún tipo,
              que participan con entusiasmo en la determinación de sus proyectos y de manera progresiva llegan a ser agentes de cambio,
              que promueven la protección del medioambiente y el desarrollo sostenible, y que contribuyen a crear en el país condiciones
              de equidad, inclusión y justicia social.
            </p>
            <p className="text-(--clr3)">
              Lo vemos apoyado por jóvenes y adultos de ambos sexos, comprometidos con su crecimiento como personas y dispuestos a servir,
              competentes como educadores voluntarios, que son testimonio de los valores del Movimiento y contribuyen de manera
              significativa al desarrollo de niñas, niños y jóvenes.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Contexto Adicional</h2>
            <p className="text-(--clr3) mb-4">
              Como grupo la misión y visión que tenemos del movimiento se ven reflejados en las líneas que se ven a continuación,
              donde consideramos una contribución a la educación de niñas, niños y jóvenes, valorando la familia y la comunidad,
              todo en el marco de lo que nos da como marco la Asociación de Guías y Scouts de Chile.
            </p>
            <p className="text-(--clr3)">
              Estas son nuestra misión y visión.
            </p>
          </div>

          <div className="text-center bg-gradient-to-r from-(--clr4) to-(--clr7) text-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-2">Guías y Scouts Nua Mana</h2>
            <p className="text-lg">Una nueva aventura</p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/acerca-de">
              <Button variant="outline">
                ← Volver a Acerca de
              </Button>
            </Link>
            <Link href="/acerca-de/nuestra-historia">
              <Button>
                Siguiente: Nuestra Historia →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
