// Trustindex Testimonials Component
import React, { useEffect } from 'react';

const Testimonials = () => {
  useEffect(() => {
    // Optional: Add any additional initialization if needed
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-center text-[var(--clr4)] text-3xl font-bold mb-5">Lo que dicen de nosotros</h2>

        <div className="flex justify-center">
          <iframe className='taggbox overflow-auto h-[380px] max-w-[1024px]' src="https://widget.taggbox.com/307862?website=1" ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;