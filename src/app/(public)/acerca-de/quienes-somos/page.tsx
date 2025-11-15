'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) from-40% to-(--clr2) to-100%">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-4">QUIENES SOMOS</h1>
            <p className="text-xl text-(--clr3)">
              Somos un grupo de Guías y Scouts que tiene más de 20 años de experiencias y aventuras
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-(--clr3) mb-12">
            <p>
              Quienes Somos un grupo de Guías y Scouts que tiene más de 18 años de experiencias y aventuras,
              junto a niñas, niños y jóvenes nos dedicamos a potenciar la capacidades propias de cada uno de ellas y ellos.
            </p>

            <p>
              Esto lo hacemos mediante diferentes y variadas actividades, que incluyen juegos, dinámicas y vivencias.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">¿QUIENES SOMOS LOS SCOUTS?</h2>
            <p className="mb-4">
              Para responder una pregunta como quienes somos, debemos primero verlo desde una perspectiva global,
              los scouts somos entre otras cosas una gran hermandad en el mundo, el Movimiento Guía Scout está
              presente en 162 países, con una red de más de 50 millones de miembros.
            </p>

            <p>
              Entre ellos, 7 millones de adultos voluntarios apoyan las actividades locales, dando como resultado
              un inmenso efecto multiplicador de la Misión del Movimiento que es contribuir a la educación de niñas,
              niños y jóvenes mediante un sistema de valores, basado en nuestra Promesa y nuestra Ley, para contribuir
              a un mundo mejor donde las personas se sientan realizadas como individuos y jueguen un papel constructivo
              en la sociedad.
            </p>

            <div className="bg-(--clr8)/50 border-l-4 border-(--clr7) pl-6 my-6 italic">
              <p className="mb-2">
                «Todo niño tiene el derecho a una aventura. La vida es acerca de atrapar las oportunidades.
                Estas son simples lecciones de vida que el escultismo enseña. Es todo acerca amistad, entretenimiento
                y aventura – Para la gente que normalmente no una oportunidad de aventura los Scouts son como una luz
                que brilla en sus comunidades»
              </p>
              <p className="text-right font-semibold">- Bear Grylls, Jefe Scout</p>
            </div>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">NOSOTROS SOMOS…</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                "Aventureros.",
                "Creadores del Futuro.",
                "Innovadores.",
                "Emprendedores.",
                "Voluntarios.",
                "Inclusivos.",
                "Enfocados en la Comunidad.",
                "Inspiradores.",
                "Moldeados por los Jóvenes.",
                "Marcamos la diferencia."
              ].map((item, index) => (
                <div key={index} className="bg-(--clr8) p-4 rounded-lg border border-(--clr4)/20">
                  <p className="text-center font-medium text-(--clr4)">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">UNA AVENTURA QUE CAMBIA VIDAS</h2>
            <p className="mb-4">
              El Escultismo cambia vidas. Pero quienes somos? Nosotros hacemos una diferencia positiva en
              nuestra comunidad mejorando las oportunidades de vida y resultados de los jóvenes de cualquier
              clase social. Tenemos la gran oportunidad de trabajar con jóvenes en el momento más importante
              de sus vidas entregándoles valores y habilidades durante este periodo de tiempo.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">EL ESCULTISMO ES ACERCA DE OPORTUNIDADES</h2>
            <p>
              Desde apoyo y amigos hasta nuevas habilidades y una confianza renovada, los scouts traen un espíritu
              optimista y práctico a su trabajo. Le damos la bienvenida a todos dentro del escultismo y creemos
              apasionadamente en lo que hacemos, de esta forma respondemos quienes somos.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-3xl font-bold text-(--clr4) mb-6">LOS JÓVENES TIENEN GRANDES COSAS QUE OFRECER</h2>
            <p className="mb-4">
              En las Guías y los Scouts, niños, niñas y jóvenes obtienen la oportunidad de descubrir sus potenciales,
              beneficiarse de un ambiente positivo de apoyo y hacer una diferencia, esa es la principal característica
              sobre quienes somos.
            </p>

            <p>
              Ya sea apoyando un negocio local en su comunidad, yendo a un viaje de canotaje con amigos, tomando un
              papel de relevancia en un show, o liderando un viaje con fuera de la ciudad, nosotros levantamos los
              espíritus, reconocemos los logros y elevamos las aspiraciones.
            </p>

            <p className="mt-4">
              Todo esto es posible debido a un gran equipo de adultos voluntarios y a nuestra institución patrocinante,
              los ejemplos a seguir, son una parte vital, queremos inspirar a una nueva generación llena con generosidad
              de espíritu y la determinación de hacer las cosas mejor para ellos y sus comunidades.
            </p>
          </div>

          <div className="text-center bg-gradient-to-r from-(--clr4) to-(--clr7) text-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-2">Guías y Scouts Nua Mana</h2>
            <p className="text-lg">Una nueva aventura</p>
            <p className="mt-4">
              Nuestra misión es contribuir a la educación de jóvenes para que participen en la construcción de un mundo mejor,
              donde las personas se desarrollen plenamente y jueguen un papel constructivo en la sociedad.
              Mediante un sistema de valores basado en principios espirituales, sociales y personales, que se expresan en la Ley y la Promesa.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">ENCUENTRANOS</h2>
            <p className="mb-2">Colegio Los Navíos</p>
            <p className="mb-2">Bahía Catalina 11781</p>
            <p className="mb-2">La Florida, Santiago, Chile</p>
            <p>C.P.: 8311475</p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/acerca-de">
              <Button variant="outline">
                ← Volver a Acerca de
              </Button>
            </Link>
            <Link href="/acerca-de/institucion-patrocinante">
              <Button>
                Siguiente: Institución Patrocinante →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}