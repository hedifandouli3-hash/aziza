import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { PROMO_CARDS_DATA } from '../../data/banners';
import { useLanguage } from '../../context/LanguageContext';

export const PromoCards: React.FC = () => {
  const { isArabic } = useLanguage();
  const { catalogues, stores } = PROMO_CARDS_DATA;

  return (
    <section className="my-10 sm:my-14 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Catalogues Banner Card */}
      <div className="relative rounded-3xl bg-linear-to-br from-red-50 to-orange-50 border border-red-150 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E30613] text-white text-[11px] font-bold rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isArabic ? catalogues.tagAr : catalogues.tag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {isArabic ? catalogues.titleAr : catalogues.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 max-w-sm">
            {isArabic ? catalogues.descriptionAr : catalogues.description}
          </p>

          <div className="pt-2">
            <Link
              to={catalogues.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors group"
            >
              <span>{isArabic ? catalogues.ctaTextAr : catalogues.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Decorative Graphic on right */}
        <div className="absolute right-4 -bottom-4 w-32 sm:w-40 opacity-90 pointer-events-none transform rotate-6">
          <div className="w-28 h-36 bg-white rounded-xl shadow-xl border-2 border-red-200 overflow-hidden relative">
            <div className="h-10 bg-[#E30613] flex items-center justify-center text-white font-black text-xs">
              AZIZA
            </div>
            <div className="p-2 space-y-1">
              <div className="h-2 bg-red-100 rounded-sm w-3/4" />
              <div className="h-2 bg-gray-100 rounded-sm w-full" />
              <div className="h-2 bg-gray-100 rounded-sm w-5/6" />
            </div>
            <div className="absolute bottom-2 right-2 bg-amber-400 text-gray-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm">
              -40%
            </div>
          </div>
        </div>
      </div>

      {/* Store Locator Banner Card */}
      <div className="relative rounded-3xl bg-linear-to-br from-slate-50 to-gray-100 border border-gray-200 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{isArabic ? stores.tagAr : stores.tag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {isArabic ? stores.titleAr : stores.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 max-w-sm">
            {isArabic ? stores.descriptionAr : stores.description}
          </p>

          <div className="pt-2">
            <Link
              to={stores.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors group"
            >
              <span>{isArabic ? stores.ctaTextAr : stores.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Storefront Graphic matching design board */}
        <div className="absolute right-0 bottom-0 w-36 sm:w-44 h-28 sm:h-32 rounded-tl-2xl overflow-hidden shadow-md border-t-2 border-l-2 border-white">
          <div className="relative w-full h-full bg-[#E30613] flex flex-col items-center justify-center p-3 text-white text-center">
            <span className="font-black text-xl tracking-tight leading-none">AZIZA</span>
            <span className="text-[10px] font-bold">عزيزة</span>
            <div className="mt-2 text-[9px] bg-white text-[#E30613] font-bold px-2 py-0.5 rounded-full">
              {isArabic ? 'مفتوح 7/7' : 'Ouvert 7j/7'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
