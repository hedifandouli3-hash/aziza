import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Percent } from 'lucide-react';
import { HERO_SLIDES } from '../../data/banners';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isArabic } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#D70512] via-[#E30613] to-[#EB1D2A] text-white shadow-xl">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 z-10 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span>{isArabic ? slide.tagAr : slide.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-tight text-white drop-shadow-xs">
              {isArabic ? slide.titleAr : slide.title}
            </h1>

            <p className="text-sm sm:text-base text-red-50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {isArabic ? slide.descriptionAr : slide.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to={slide.ctaLink}
                className="px-6 py-3.5 bg-white text-[#E30613] hover:bg-red-50 font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group active:scale-95"
              >
                <span>{isArabic ? slide.ctaTextAr : slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/magasins"
                className="px-5 py-3.5 bg-black/20 hover:bg-black/30 backdrop-blur-xs text-white font-bold text-sm rounded-2xl transition-colors border border-white/20"
              >
                {isArabic ? 'البحث عن مغازة' : 'Trouver un magasin'}
              </Link>
            </div>
          </div>

          {/* Right Image / Hero Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Circular promotional sticker matching design board */}
            <div className="absolute -top-3 -right-2 sm:top-2 sm:right-4 z-20 bg-[#FFCB05] text-[#1E293B] font-black rounded-full w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center p-2 text-center shadow-lg transform rotate-6 border-4 border-white animate-pulse">
              <Percent className="w-5 h-5 text-[#E30613]" />
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase leading-tight">
                {isArabic ? slide.badgeAr : slide.badge}
              </span>
            </div>

            {/* Main Product/Cart Image Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform hover:scale-102 transition-transform duration-500">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Diapositive précédente"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white text-white hover:text-[#E30613] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Diapositive suivante"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white text-white hover:text-[#E30613] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Aller à la diapositive ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
