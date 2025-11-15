'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ data with questions and answers from nuamana.cl
const FAQ_DATA = [
  {
    question: "¿PUEDO SER SCOUT?",
    answer: "Sí, <b>todos pueden ser scouts</b>, nuestro grupo es abierto a toda la comunidad, para poder ser parte de los scouts, sólo tienes que ser mayor de 7 años y tener ganas de divertirte y jugar junto a otras personas.",
    image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/FAQ-puedoSerScout.png"
  },
  {
    question: "¿CÓMO PUEDO PARTICIPAR?",
    answer: "Para nosotros es muy importante que niñas, niños y jóvenes se sientan cómodos siendo Scout, para poder participar lo primero es ver si te gusta, por eso tenemos las puertas abiertas a todos y todas las y los que quieran asistir, entonces, ¿Cómo puedes participar? <b>sólo ven un sábado de 3 a 6 de la tarde</b> y ve si te gusta.",
    image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/FAQ-comoPuedoParticipar.png"
  },
  {
    question: "¿HASTA QUÉ EDAD PUEDO SER SCOUT?",
    answer: "Las y los niños, niñas y jóvenes que participan de las actividades <b>van desde los 7 a los 21 años</b>.",
    image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/FAQ-hastaQueEdadPuedoSerScout.png"
  },
  {
    question: "¿HAY QUE PAGAR ALGO?",
    answer: "Cómo dijimos antes lo más importante es que te guste, por lo mismo, para ir sábado a sábado a las actividades de 3 a 6 de la tarde, no hay que pagar nada.<br><br>Sin embargo, también nos preocupamos por la salud de las y los scouts, es por ello que tenemos un <b>seguro de accidentes scouts</b> que está incluido dentro de nuestra inscripción. Hay que pagar una inscripción, pero sólo una vez que estás seguro de que te sientes cómodo y que te gusta estar en los Scouts, por otra parte, las salidas por el día, los campamentos y otras actividades tienen un costo que se destina completamente a cubrir los gastos de esas actividades.<br><br>Finalmente, no queremos que el dinero sea un factor por el que no seas Scout, es por lo mismo que como grupo hacemos muchas actividades económicas durante el año, para poder financiar los campamentos y salidas, y depende de tu colaboración en esas actividades el costo que tendrán las salidas y campamentos para tí, ya que la recaudación de las actividades económicas se destina a cubrir esos gastos.",
    image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/FAQ-hayQuePagarAlgo.png"
  },
  {
    question: "¿QUÉ INCLUYE LA INSCRIPCIÓN?",
    answer: "La inscripción para nuevos participantes incluye:<br><br><b>• Seguro scout</b> (es un seguro complementario de salud, que se cobra como reembolso posterior a los gastos médicos y descuentos propios de cada niño, niña o joven)<br><b>• Pañolín de grupo</b><br><b>• Credencial scout</b><br><b>• Insignia del año</b>",
    image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/FAQ-queIncluyeLaInscripcion.png"
  }
];

// Define the FAQ item type
type FAQItemProps = {
  question: string;
  answer: string;
  image: string;
};

// FAQ Item Component with HTML support and image
const FAQItem = ({ question, answer, isOpen, toggleOpen, image }: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  image: string;
}) => {
  return (
    <div className="border border-(--clr4)/20 rounded-xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full flex justify-between items-center p-6 text-left bg-(--clr1) hover:bg-(--clr1)/70 transition-colors"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-(--clr4)">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-(--clr7) flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-(--clr7) flex-shrink-0 ml-4" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 bg-(--clr1)/20 border-t border-(--clr4)/10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-shrink-0 w-50 h-50 overflow-hidden rounded-lg">
              <img
                src={image}
                alt={question}
                className="w-full h-full object-cover mt-2"
              />
            </div>
            <p
              className="text-(--clr3) flex-grow"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-[#f9f9f9] to-[#fffff0] px-4"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2
            id="faq-title"
            className="text-4xl font-bold text-(--clr4) mb-4"
          >
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-(--clr3) max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre Nua Mana - Guías y Scouts
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              image={faq.image}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;