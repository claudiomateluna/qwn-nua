'use client';

import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';
import Link from 'next/link';

export default function NuestraHistoriaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-(--clr1) from-40% to-(--clr2) to-100%">
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--clr4) mb-6">NUESTRA HISTORIA</h1>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <p className="text-(--clr3) mb-6">
              Nuestra historia nace de la necesidad de un grupo de dirigentes y guiadoras, una idea que reúne a un grupo humano
              con diferentes intereses y habilidades las cuales convergen hacia un punto común, la formación de un nuevo grupo
              Guía y Scout, o el proyecto de iniciación del mismo en el segundo semestre del 2005, en estas reuniones este grupo
              humano definió que el hilo conductor del nuevo grupo serían las costumbres y tradiciones del pueblo Rapa Nui, es
              en base a esto que la fecha de fundación fue definida como el 23 de Septiembre debido a la importancia que le
              entrega el pueblo Rapa Nui a la llegada de la primavera.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Naming and Foundation</h2>
            <p className="text-(--clr3) mb-6">
              Una vez definido estos temas se iniciaron conversaciones con el Colegio Nuestra Señora de Guadalupe, el cual a
              través de su entonces director, Juan Carlos Allan, recibió nuestro proyecto en este colegio, en honor a lo mismo
              el grupo tomó el nombre de NUA MANA, que significa Madre Sagrada en alusión al nombre de la entidad patrocinante
              que una vez nos acogió, debido a lo mismo se le agregó un nuevo color al pañolin, el amarillo que se suma al
              negro y rojo simboliza al Colegio que nos recibe.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Inaugural Activities and Units</h2>
            <p className="text-(--clr3) mb-6">
              Así las cosas el Sábado 1º de abril del 2006 el grupo de Guías y Scouts Nua Mana realizó sus primeras actividades,
              conformando sus primeras 4 unidades la Bandada, la Manada, la Compañía y la Tropa las cuales posteriormente
              definieron sus nombres como Hanua Nua Mea (Arco iris), Ahí Niho Vænga (Colmillo de Fuego), Põ Nui Vaicava
              (Mar de Media Noche) y A'ata (Luz tras la Oscuridad) respectivamente.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">First Inaugural Fire</h2>
            <p className="text-(--clr3) mb-6">
              En este marco nuestro nu'u (grupo) realizó su primer Fogón Inaugural hacia Julio del mismo año, donde la mística
              del encendido del Fogón estuvo marcada por el paso de un Manutara que dejo caer un huevo que contenía los pañolines
              de todos los integrantes de nuestro nu'u, esto como una forma de resaltar un inicio común del escultismo en
              nuestro Nua Mana.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">First Group Camp</h2>
            <p className="text-(--clr3) mb-6">
              Finalmente en nuestra historia tenemos que destacar el primer campamento grupal entre el 27 y el 29 de Octubre
              de 2006 en el campo escuela callejones, uno de los hecho importantes para nuestro nu'u ocurrido en este campamento
              fue la creación de la unidad Omotohi (Luna Llena) integrada por apoderados los cuales asisten a campamento como
              una unidad más y donde estos realizan sus propias actividades enmarcadas dentro del escultismo, esto como una
              forma de facilitar el conocimiento por parte de los padres y apoderados acerca de lo que produce y hace el
              escultismo en los niños.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Important Learning Experience</h2>
            <p className="text-(--clr3) mb-6">
              Un hecho de alta importancia que marco nuestra vida como grupo fue la inexistencia de un campamento de verano
              durante el verano de 2007, hecho del cual aprendimos importantes lecciones que aportaron al crecimiento del Nu'u.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Activities in 2007</h2>
            <p className="text-(--clr3) mb-6">
              Nuestra historia continúa, en Marzo de 2007, el primer sábado de este mes nuestro nu'u reinicio sus actividades
              para el año 2007, este año estuvo marcado por los campamentos coordinados por unidad realizados en el Cajón del Maipo,
              mientras las unidades menores fueron a la localidad de "Los Rulos", las unidades mayores hicieron lo propio en
              la localidad de "El Manzano".
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Creation of the Ruta Hotu Matu'a</h2>
            <p className="text-(--clr3) mb-6">
              Así también es importante destacar como parte de nuestra historia durante el 2007 la salida al Parque Mahuida
              donde se efectúo el primer paso a la entonces Ruta Hotu Matu'a (Primer Ariki (Rey) de Rapa Nui) actualmente
              avanzada Rapahango (Ser Mitológico de Rapa Nui). Con este paso desde la Compañía a la Avanzada (Ruta) se
              crea oficialmente la Ruta Hotu Matu'a.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-8 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">Training Camp in September 2007</h2>
            <p className="text-(--clr3) mb-6">
              En Septiembre de 2007 se hizo el primer campamento de Guiadoras y Dirigentes a la localidad de Viluma en Melipilla,
              con el objetivo de capacitarse y mejorar las relaciones en el Mahina Api (Luna Nueva). Como una forma de celebrar
              la Navidad Scout el Nua Mana celebró el evento en un centro de acogida para niños cercano al Colegio donde funcionamos.
            </p>
          </div>

          <div className="bg-(--clr1) rounded-2xl p-8 mb-12 shadow-lg border border-(--clr4)/20">
            <h2 className="text-2xl font-bold text-(--clr4) mb-4">First Summer Camp</h2>
            <p className="text-(--clr3)">
              En el Verano de 2008 nuestro nu'u realizó su primer Campamento de Verano en la localidad de La Villa, al interior
              de Pichilemu… Somos Nua Mana, Nuestra Historia es Movimiento que continua hacia el futuro con grandes sueños y esperanzas.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/acerca-de">
              <Button variant="outline">
                ← Volver a Acerca de
              </Button>
            </Link>
            <Link href="/acerca-de/nuestro-equipo">
              <Button>
                Siguiente: Nuestro Equipo →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
