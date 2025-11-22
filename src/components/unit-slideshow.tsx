'use client';

import { useState, useEffect } from 'react';

const UnitSlideShow = () => {
  const units = [
    {
      name: 'Manada',
      displayName: 'Ahi Niho Vaenga',
      image: '/images/logos/iconos_UnidadesManada.webp',
      alt: 'Manada Ahi Niho Vaenga'
    },
    {
      name: 'Compañía',
      displayName: 'Po Nui Vaicava',
      image: '/images/logos/iconos_UnidadesCia.webp',
      alt: 'Compañía Po Nui Vaicava'
    },
    {
      name: 'Tropa',
      displayName: 'A\'ata',
      image: '/images/logos/iconos_UnidadesTropa.webp',
      alt: 'Tropa A\'ata'
    },
    {
      name: 'Avanzada',
      displayName: 'Rapahango',
      image: '/images/logos/iconos_UnidadesAvanzada.webp',
      alt: 'Avanzada Rapahango'
    },
    {
      name: 'Clan',
      displayName: 'Ahu Akivi',
      image: '/images/logos/iconos_UnidadesClan.webp',
      alt: 'Clan Ahu Akivi'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % units.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [units.length]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div 
        className="slideshow-container w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {units.map((unit, index) => (
          <div 
            key={index} 
            className="slide flex-shrink-0 w-full flex flex-col items-center justify-center"
          >
            <img
              src={unit.image}
              alt={unit.alt}
              className="w-70 h-70 object-contain"
            />
            <p className="text-sm text-gray-300 text-center">
              {unit.name}<br />{unit.displayName}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {units.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default UnitSlideShow;