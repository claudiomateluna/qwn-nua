'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function AprenderHaciendoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) to-(--clr8)">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-6">APRENDER HACIENDO</h1>
            <p className="text-xl text-(--clr3)">
              Metodología utilizada desde hace más de 100 años en el escultismo
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <p className="text-(--clr3) mb-6">
              Aprender haciendo es la metodología utilizada desde hace más 100 años en el escultismo,
              y que, a pesar de su longevidad cada día nos demuestra que es la mejor forma de aprender
              y de vivir nuestra vida.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">¿Cómo funciona esto?</h2>

            <p className="text-(--clr3) mb-4">
              Puesto que, cuando Baden-Powell diseño el movimiento scout, lo hizo considerando que los
              aprendizajes se logran desde en la experiencia. Y tomando como referencia principal la
              vida al aire libre como principal forjador de carácter en el joven.
            </p>

            <p className="text-(--clr3)">
              Aprender haciendo significa que la niña, niño o joven aprende de sus vivencias dentro de
              los scouts, pero al mismo tiempo de su vida diaria.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">Explicación</h2>

            <p className="text-(--clr3) mb-4">
              Es decir, que puede que no seas el mayor conocedor sobre escultismo, pero tu propia
              experiencia de vida te provee de conocimiento, que al momento de compartirlo con tu
              unidad se convierte en un aprendizaje para quienes te rodean y al mismo tiempo tú te
              nutres de la consciencia de tu entorno, permitiendo que como grupo crezcamos y nos
              proyectemos a ser cada día mejores.
            </p>

            <p className="text-(--clr3)">
              B.P. también se basa en el servicio y en una serie de valores como la ley y la promesa Scout,
              que a la larga se convierten en un código de conducta en nuestra vida, que fortalece al
              individuo y lo convierte en un ejemplo a seguir. Basándose en el potencial y el compromiso
              que el mismo ofrezca a el movimiento.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-6">Aprender Haciendo</h2>

            <p className="text-(--clr3) mb-4">
              Es así como a través del aprender haciendo se modela el carácter del muchacho convirtiéndolo
              en un líder apto para asumir cualquier responsabilidad, de la que se sabe capacitado para
              comprometerse y tener resultados que dan fe de la excelencia.
            </p>

            <p className="text-(--clr3)">
              Al haber completado su preparación el joven scout está listo para asumir cualquier reto ya
              que posee habilidades de trabajo en equipo, proactividad, perseverancia, honor y muchos otros
              valores que lo diferencian de la mayoría y que al mismo tiempo lo convierten en un agente de
              cambio que buscará construir siempre un mundo mejor.
            </p>
          </div>

          <div className="text-center bg-gradient-to-r from-(--clr4) to-(--clr7) text-white rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-bold mb-2">Nuestra misión</h2>
            <p className="mb-4">
              Nuestra misión es contribuir a la educación de jóvenes para que participen en la construcción
              de un mundo mejor, donde las personas se desarrollen plenamente y jueguen un papel constructivo
              en la sociedad. Mediante un sistema de valores basado en principios espirituales, sociales y
              personales, que se expresan en la Ley y la Promesa.
            </p>
            <p className="font-semibold">ENCUENTRANOS</p>
            <p className="mt-2">Colegio Los Navíos</p>
            <p>Bahía Catalina 11781</p>
            <p>La Florida, Santiago, Chile</p>
            <p>C.P.: 8311475</p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/lo-que-hacemos">
              <Button variant="outline">
                ← Volver a Lo que hacemos
              </Button>
            </Link>
            <Link href="/lo-que-hacemos/el-metodo-scout">
              <Button>
                Siguiente: El Método Scout →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
