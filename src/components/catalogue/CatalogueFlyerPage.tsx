import React from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../common/ImageWithFallback';
import type { CataloguePage } from '../../types';

interface CatalogueFlyerPageProps {
  page: CataloguePage;
  pageNumber: number;
  totalPages: number;
  catalogueTitle?: string;
  cataloguePeriod?: string;
}

export const CatalogueFlyerPage = React.forwardRef<HTMLDivElement, CatalogueFlyerPageProps>(
  ({ page, pageNumber, totalPages, catalogueTitle, cataloguePeriod }, ref) => {
    const isCover = pageNumber === 1;
    const isBackCover = pageNumber === totalPages;

    // =========================================================================
    // 1. FRONT COVER (PAGE 1)
    // =========================================================================
    if (isCover) {
      return (
        <div
          ref={ref}
          className="relative w-full h-full min-h-[560px] sm:min-h-[640px] bg-[#FAF9F5] text-gray-900 select-none overflow-hidden flex flex-col justify-between p-3 sm:p-5 border border-amber-900/10 shadow-xs"
          style={{
            backgroundImage:
              'radial-gradient(#00000005 1px, transparent 1px), linear-gradient(to bottom, #FFFDF9 0%, #F9F6F0 100%)',
            backgroundSize: '16px 16px, 100% 100%'
          }}
        >
          {/* Cover Masthead Banner */}
          <div className="bg-[#E30613] text-white p-3.5 sm:p-4 rounded-xl shadow-md text-center relative overflow-hidden border-b-4 border-amber-400">
            {/* Background accent rays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl sm:text-3xl tracking-tighter">AZIZA</span>
                <span className="text-sm sm:text-base font-bold font-arabic">عزيزة</span>
              </div>
              <div className="bg-amber-400 text-[#E30613] text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs truncate max-w-[150px]">
                {catalogueTitle || 'Catalogue Officiel'}
              </div>
            </div>

            <div className="text-amber-200 text-xs sm:text-sm font-black tracking-widest uppercase mt-0.5">
              Des prix qui font plaisir !
            </div>

            {/* Date Ribbon */}
            <div className="mt-2 inline-block bg-black/25 px-3 py-1 rounded-full text-[11px] font-semibold text-white/95 border border-white/20">
              {cataloguePeriod ? `Offres valables ${cataloguePeriod}` : 'Offres valables du 22 au 30 Octobre 2026'}
            </div>
          </div>

          {/* Big Discount Starburst Badge */}
          <div className="my-2 flex items-center justify-between px-2">
            <div className="bg-gradient-to-r from-amber-400 to-amber-300 text-[#E30613] px-3 py-1 rounded-lg font-black text-xs sm:text-sm uppercase tracking-tight shadow-xs border border-amber-500/30">
              ★ Les Grands Bons Plans de la Semaine ★
            </div>
            <div className="bg-[#E30613] text-white font-black text-xs sm:text-sm px-2.5 py-1 rounded-md shadow-xs animate-pulse">
              Jusqu&apos;à -40%
            </div>
          </div>

          {/* Featured Hero Product Showcase (Printed Flyer Layout) */}
          <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3 my-1">
            {page.products && page.products.slice(0, 3).map((item, idx) => (
              <Link
                key={item.id}
                to={`/produits/${item.id}`}
                className={`group relative bg-white rounded-xl p-2 sm:p-2.5 shadow-xs border border-amber-900/10 hover:border-[#E30613] transition-all flex flex-col justify-between ${
                  idx === 0 ? 'col-span-2 flex-row items-center gap-3 bg-gradient-to-r from-white to-red-50/40' : ''
                }`}
              >
                {/* Discount Ribbon */}
                {item.discount && (
                  <div className="absolute top-2 left-2 z-10 bg-[#E30613] text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-sm shadow-xs">
                    {item.discount}
                  </div>
                )}

                {/* Product Photo */}
                <div
                  className={`${
                    idx === 0 ? 'w-28 sm:w-36 h-28 sm:h-36' : 'w-full h-24 sm:h-32'
                  } flex items-center justify-center p-1 bg-white rounded-lg flex-shrink-0`}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details & Printed Supermarket Price Tag */}
                <div className={`flex-1 min-w-0 ${idx === 0 ? 'text-left' : 'text-center mt-1'}`}>
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                    {item.brand}
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#E30613] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-[10px] text-gray-500 font-medium">{item.unit}</div>

                  {/* Supermarket Price Tag */}
                  <div className="mt-1.5 flex items-baseline justify-center sm:justify-start gap-1.5 flex-wrap">
                    <span className="bg-[#E30613] text-white font-black text-sm sm:text-lg px-2 py-0.5 rounded-sm shadow-xs">
                      {item.price.toFixed(3)} <span className="text-[10px]">DT</span>
                    </span>
                    {item.oldPrice && (
                      <span className="text-[11px] text-gray-400 line-through font-semibold">
                        {item.oldPrice.toFixed(3)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Discreet Printed Flyer Bottom Margin */}
          <div className="pt-2 border-t border-gray-300/60 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500">
            <span>aziza.tn • Offres promotionnelles de démonstration UI/UX</span>
            <span className="font-mono font-bold text-gray-700">Page 1 / {totalPages}</span>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 2. BACK COVER (PAGE 16)
    // =========================================================================
    if (isBackCover) {
      return (
        <div
          ref={ref}
          className="relative w-full h-full min-h-[560px] sm:min-h-[640px] bg-[#FAF9F5] text-gray-900 select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6 border border-amber-900/10 shadow-xs"
          style={{
            backgroundImage:
              'radial-gradient(#00000005 1px, transparent 1px), linear-gradient(to bottom, #FFFDF9 0%, #F9F6F0 100%)',
            backgroundSize: '16px 16px, 100% 100%'
          }}
        >
          {/* Header */}
          <div className="text-center py-2 border-b border-gray-200">
            <div className="inline-flex items-center gap-2 font-black text-2xl text-[#E30613]">
              <span>AZIZA</span>
              <span className="text-base font-arabic font-bold text-gray-800">عزيزة</span>
            </div>
            <div className="text-xs font-bold text-gray-600 font-arabic mt-0.5">
              ديمة قريبة ليك — Toujours proche de vous
            </div>
          </div>

          {/* Information & Store Network */}
          <div className="my-auto py-4 space-y-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-[#E30613] flex items-center justify-center font-black text-2xl shadow-inner border border-red-100">
              🏪
            </div>

            <h3 className="text-base sm:text-lg font-black text-gray-900">
              Plus de 350 Magasins à Travers la Tunisie
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Grand Tunis, Sousse, Monastir, Sfax, Nabeul, Bizerte, Kairouan, Gabès, Médenine...
              Retrouvez nos arrivages quotidiens au meilleur prix près de chez vous.
            </p>

            {/* Practical Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-left max-w-sm mx-auto bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
              <div className="p-2 border-r border-gray-100">
                <div className="text-[10px] text-gray-400 font-bold uppercase">Horaires 7j/7</div>
                <div className="text-xs font-black text-gray-800 mt-0.5">8h30 — 20h30</div>
              </div>
              <div className="p-2">
                <div className="text-[10px] text-gray-400 font-bold uppercase">Service Client</div>
                <div className="text-xs font-black text-[#E30613] mt-0.5">71 123 456</div>
              </div>
            </div>

            {/* Digital channels */}
            <div className="text-[11px] text-gray-500">
              Site officiel : <span className="font-bold text-gray-800">www.aziza.tn</span> • Application disponible sur Android & iOS
            </div>
          </div>

          {/* Legal / Bottom note */}
          <div className="pt-2 border-t border-gray-300/60 text-center text-[9px] text-gray-400 space-y-0.5">
            <div>Catalogue de démonstration UI/UX • Ne pas jeter sur la voie publique</div>
            <div className="font-mono font-bold text-gray-600">Page {totalPages} / {totalPages}</div>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 3. INSIDE DEPARTMENT SPREAD PAGES (PAGES 2 TO 15)
    // =========================================================================
    return (
      <div
        ref={ref}
        className="relative w-full h-full min-h-[560px] sm:min-h-[640px] bg-[#FAF9F5] text-gray-900 select-none overflow-hidden flex flex-col justify-between p-3 sm:p-4 border border-amber-900/10 shadow-xs"
        style={{
          backgroundImage:
            'radial-gradient(#00000005 1px, transparent 1px), linear-gradient(to bottom, #FFFDF9 0%, #F9F6F0 100%)',
          backgroundSize: '16px 16px, 100% 100%'
        }}
      >
        {/* Department Banner Header (Printed Supermarket Flyer Style) */}
        <div className="flex items-center justify-between border-b-2 border-[#E30613] pb-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#E30613] text-white font-black text-[10px] px-1.5 py-0.5 rounded-xs tracking-tighter">
              AZIZA
            </span>
            <h2 className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight truncate max-w-[200px] sm:max-w-xs">
              {page.title.replace(/^Rayon\s+/i, '').replace(/^Couverture\s+-\s+/i, '')}
            </h2>
          </div>
          <div className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            P. {pageNumber}
          </div>
        </div>

        {/* Thematic Subtitle Banner */}
        <div className="bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md mb-2 flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-extrabold text-[#E30613] uppercase tracking-wide truncate">
            {page.theme}
          </span>
          <span className="text-[9px] font-bold text-amber-700 bg-amber-200/50 px-1.5 py-0.2 rounded-xs flex-shrink-0">
            PROMO
          </span>
        </div>

        {/* Products Grid (Seamless Printed Flyer Items) */}
        <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-2.5 content-start">
          {page.products && page.products.map((item) => (
            <Link
              key={item.id}
              to={`/produits/${item.id}`}
              className="group relative bg-white rounded-lg p-2 sm:p-2.5 border border-gray-200/80 hover:border-[#E30613] hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              {/* Discount Sticker */}
              {item.discount && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-[#E30613] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-xs shadow-xs">
                  {item.discount}
                </div>
              )}

              {/* Product Photo */}
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-1 bg-white rounded-md mb-1">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate">
                  {item.brand}
                </div>
                <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#E30613] transition-colors">
                  {item.name}
                </h4>
                <div className="text-[9px] text-gray-500 font-medium mt-0.5">{item.unit}</div>
              </div>

              {/* Authentic Tunisian Supermarket Price Tag */}
              <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-baseline justify-between flex-wrap gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-black text-[#E30613]">
                    {item.price.toFixed(3)}
                  </span>
                  <span className="text-[9px] font-bold text-[#E30613]">DT</span>
                </div>
                {item.oldPrice && (
                  <span className="text-[10px] text-gray-400 line-through font-semibold">
                    {item.oldPrice.toFixed(3)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Discreet Editorial Footer */}
        <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[9px] text-gray-400 mt-2">
          <span>Offres valables selon stocks disponibles • Démonstration UI/UX</span>
          <span className="font-mono font-bold text-gray-600">Page {pageNumber} / {totalPages}</span>
        </div>
      </div>
    );
  }
);

CatalogueFlyerPage.displayName = 'CatalogueFlyerPage';
