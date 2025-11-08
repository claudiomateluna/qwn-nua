'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topImages, setTopImages] = useState<string[]>([]);
  const [bottomImages, setBottomImages] = useState<string[]>([]);
  const [borderColors, setBorderColors] = useState<string[]>([]);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Frases para el slider
  const phrases = [
    "SCOUTS, Educación para la Vida",
    "Empoderamos a niñas niños y jovenes, Con Habilidades para Crear un Mundo Mejor",
    "Vivimos en una Aventura, Transformadora y Llena de Crecimiento Personal"
  ];

  // Imágenes para la galería
  const allImages = [
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_01_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_02_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_03_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_04_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_05_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_06_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_07_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_08_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_09_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_10_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_11_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_12_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_13_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_14_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_15_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_16_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_17_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_18_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_19_.webp",
    "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/fotos_20_.webp"
  ];

  // Colores para las imágenes
  const colors = [
    'border-[#FFB6C1]', // Light Pink
    'border-[#87CEEB]', // Sky Blue
    'border-[#98FB98]', // Pale Green
    'border-[#DDA0DD]', // Plum
    'border-[#F0E68C]', // Khaki
    'border-[#FFDAB9]', // Peach Puff
    'border-[#E6E6FA]', // Lavender
    'border-[#AFEEEE]', // Pale Turquoise
  ];

  // Manejar el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Llamar al inicio para establecer el tamaño actual
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Inicializar imágenes y colores basados en el tamaño de pantalla
  useEffect(() => {
    const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
    const numTopImages = screenWidth < 460 ? 1 : (screenWidth < 1024 ? 2 : 3);
    const numBottomImages = screenWidth < 460 ? 1 : (screenWidth < 1024 ? 2 : 3);
    
    const topImgs = shuffledImages.slice(0, numTopImages);
    const bottomImgs = shuffledImages.slice(numTopImages, numTopImages + numBottomImages);
    
    setTopImages(topImgs);
    setBottomImages(bottomImgs);

    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    setBorderColors(shuffledColors.slice(0, numTopImages + numBottomImages));
  }, [screenWidth]);

  // Cambiar frase cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Determinar número actual de imágenes basado en el tamaño de pantalla
  const numTopImages = screenWidth < 460 ? 1 : (screenWidth < 1024 ? 2 : 3);
  const numBottomImages = screenWidth < 460 ? 1 : (screenWidth < 1024 ? 2 : 3);

  return (
    <div className="w-full">
      {/* Div Superior - Full Width & Height */}
      <div
        className="relative w-full h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/inicio/fondo.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay de Degradado */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, var(--clr5), var(--clr7))',
            opacity: 0.8
          }}
        ></div>

        {/* Galería superior con efecto collage */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${screenWidth < 1024 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 z-1 mb-8 max-w-[1024px] mx-auto px-2`}>
          {topImages.slice(0, numTopImages).map((image, index) => (
            <div
              key={`top-${index}`}
              className={`border-4 rounded-lg overflow-hidden ${borderColors[index] || colors[index % colors.length]} transition-all duration-500 ease-in-out hover:scale-105`}
              style={{
                animation: `fadeIn ${0.5 + Math.random() * 1.5}s forwards`,
                opacity: 0,
                transform: `rotate(${(Math.random() * 6) - 3}deg)`, // Rotación aleatoria entre -3 y +3 grados
                margin: `${(Math.random() * 4) - 2}px ${(Math.random() * 4) - 2}px` // Margen aleatorio para posición
              }}
            >
              <img
                src={image}
                alt={`Top gallery item ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Contenido centrado */}
        <div className="relative z-1 text-center text-white mb-8 max-w-[1024px] mx-auto px-2">
          <h1 className="text-3xl md:text-6xl font-bold text-shadow-md text-(--clr8)">
            {phrases[currentSlide].split(',')[0]},
          </h1>
          <p className="text-xl md:text-2xl">
            {phrases[currentSlide].split(',')[1] || ''}
          </p>
        </div>

        {/* Galería inferior con efecto collage */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${screenWidth < 1024 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 z-1 mt-8 max-w-[1024px] mx-auto px-2`}>
          {bottomImages.slice(0, numBottomImages).map((image, index) => (
            <div
              key={`bottom-${index}`}
              className={`border-4 rounded-lg overflow-hidden ${borderColors[index + topImages.length] || colors[(index + topImages.length) % colors.length]} transition-all duration-500 ease-in-out hover:scale-105`}
              style={{
                animation: `fadeIn ${0.5 + Math.random() * 1.5}s forwards`,
                opacity: 0,
                transform: `rotate(${(Math.random() * 6) - 3}deg)`, // Rotación aleatoria entre -3 y +3 grados
                margin: `${(Math.random() * 4) - 2}px ${(Math.random() * 4) - 2}px` // Margen aleatorio para posición
              }}
            >
              <img
                src={image}
                alt={`Bottom gallery item ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Hero;