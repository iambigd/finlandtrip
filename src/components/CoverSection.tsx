import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

const CoverSection = () => {
  useEffect(() => {
    // Parallax effect for cover image
    gsap.to('#cover-image', {
      scrollTrigger: {
        trigger: '#cover',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 100,
      opacity: 0.8,
    });
  }, []);

  return (
    <header
      id="cover"
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between pb-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          id="cover-image"
          src="https://images.unsplash.com/photo-1642022467988-506051e8fe7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGZpbmxhbmQlMjB3aW50ZXJ8ZW58MXx8fHwxNzYzNzE5MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Finland Winter Aurora"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Spacer */}
      <div className="relative z-10 w-full px-8 pt-16" />

      {/* Title Content */}
      <div className="relative z-10 px-8 md:px-16 text-white text-center">
        <p className="font-sans text-xs md:text-sm tracking-[0.4em] mb-4 uppercase">
          WINTER EDITION • DECEMBER 2025 冬季特刊
        </p>
        <h1 className="font-serif text-[18vw] leading-[0.8] italic opacity-90 drop-shadow-2xl">
          FINLAND
        </h1>
        <h2 className="font-sans text-2xl md:text-4xl tracking-widest mt-4 text-[#d4af37] drop-shadow-lg">
          AURORA CHASE JOURNEY 極光追逐之旅
        </h2>
        <a
          href="#map"
          className="mt-12 inline-block border border-white px-6 py-2 text-xs font-sans tracking-widest hover:bg-white hover:text-[#111] transition"
        >
          VIEW ITINERARY MAP 檢視旅程地圖
        </a>
      </div>
    </header>
  );
};

export default CoverSection;