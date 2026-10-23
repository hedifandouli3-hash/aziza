import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, ArrowRight, Clock, Navigation } from 'lucide-react';
import { PROMO_CARDS_DATA } from '../../data/banners';
import { CATALOGUES } from '../../data/catalogues';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const PromoCards: React.FC = () => {
  const { isArabic } = useLanguage();
  const { catalogues, stores } = PROMO_CARDS_DATA;
  const currentCatalogue = CATALOGUES[0];

  return (
    <section className="my-10 sm:my-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {/* 1. Catalogues Banner Card with Real Active Flyer Preview */}
      <div className="relative rounded-3xl bg-linear-to-br from-red-50 via-white to-orange-50/60 border border-red-200/90 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md transition-all">
        <div className="relative z-10 space-y-3 max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E30613] text-white text-[11px] font-bold rounded-full shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isArabic ? catalogues.tagAr : catalogues.tag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {isArabic ? catalogues.titleAr : catalogues.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isArabic ? catalogues.descriptionAr : catalogues.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pt-1">
            <Clock className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{currentCatalogue.period}</span>
          </div>

          <div className="pt-2">
            <Link
              to={catalogues.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors group active:scale-95"
            >
              <span>{isArabic ? catalogues.ctaTextAr : catalogues.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Real Flyer Cover Visual on right */}
        <div className="absolute right-4 -bottom-6 w-32 sm:w-44 aspect-3/4 rounded-xl shadow-xl border-2 border-white overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden xs:block">
          <ImageWithFallback
            src={currentCatalogue.coverImage}
            alt={currentCatalogue.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-amber-400 text-gray-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
            En cours
          </div>
        </div>
      </div>

      {/* 2. Store Locator Banner Card with Store Network Visual */}
      <div className="relative rounded-3xl bg-linear-to-br from-slate-50 via-white to-gray-100/70 border border-gray-200/90 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md transition-all">
        <div className="relative z-10 space-y-3 max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-full shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{isArabic ? stores.tagAr : stores.tag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {isArabic ? stores.titleAr : stores.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isArabic ? stores.descriptionAr : stores.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pt-1">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plus de 500 magasins sur 24 gouvernorats</span>
          </div>

          <div className="pt-2">
            <Link
              to={stores.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors group active:scale-95"
            >
              <span>{isArabic ? stores.ctaTextAr : stores.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Storefront Graphic matching supermarket brand */}
        <div className="absolute right-0 bottom-0 w-36 sm:w-48 h-28 sm:h-36 rounded-tl-3xl overflow-hidden shadow-lg border-t-2 border-l-2 border-white bg-linear-to-br from-[#E30613] to-[#B70B19] hidden xs:flex flex-col items-center justify-center p-4 text-white text-center">
          <span className="font-black text-2xl tracking-tight leading-none drop-shadow-xs">AZIZA</span>
          <span className="text-xs font-bold font-arabic mt-0.5">عزيزة</span>
          <div className="mt-2 text-[10px] bg-white text-[#E30613] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
            {isArabic ? 'مفتوح 7/7' : 'Ouvert 7j/7'}
          </div>
        </div>
      </div>
    </section>
  );
};
