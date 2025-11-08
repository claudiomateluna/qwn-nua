// Componente para mostrar testimonios de usuarios
import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana María López",
      role: "Coordinadora de Ventas",
      content: "El sistema ha revolucionado nuestra forma de trabajar. La eficiencia ha aumentado significativamente."
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Director de Operaciones",
      content: "La implementación fue sencilla y los resultados inmediatos. ¡Altamente recomendado!"
    },
    {
      id: 3,
      name: "María González",
      role: "Gerente de Calidad",
      content: "La calidad del servicio y la atención al cliente son excepcionales. Nos ha ahorrado mucho tiempo."
    }
  ];

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0)).join('').toUpperCase();
    return initials.substring(0, 2); // Solo las dos primeras iniciales
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f9f9f9] to-[#fffff0]">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-center text-[var(--clr4)] text-3xl font-bold mb-12">Lo que dicen nuestros clientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-[var(--clr1)] rounded-xl p-6 shadow-lg border border-[var(--clr4)]/20"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 border-2 border-[var(--clr7)] flex items-center justify-center bg-[var(--clr4)] text-[var(--clr1)] text-sm font-bold">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--clr4)]">{testimonial.name}</h3>
                  <p className="text-[var(--clr2)] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[var(--clr3)] italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;