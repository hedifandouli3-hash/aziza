import React from 'react';
import { Badge } from '../common/Badge';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import type { CataloguePage } from '../../types';

interface CatalogueFlyerPageProps {
  page: CataloguePage;
  pageNumber: number;
  totalPages: number;
}

export const CatalogueFlyerPage: React.FC<CatalogueFlyerPageProps> = ({
  page,
  pageNumber,
  totalPages
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] sm:min-h-[580px] bg-white rounded-lg shadow-inner overflow-hidden flex flex-col justify-between border border-gray-200 select-none">
      {/* Top Flyer Header with Red AZIZA bar */}
      <div className="bg-[#E30613] text-white p-3 sm:p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          {/* Logo mini */}
          <div className="flex items-center gap-1.5 font-black text-lg tracking-tight">
            <span>AZIZA</span>
            <span className="text-xs font-bold font-arabic">عزيزة</span>
          </div>
        </div>

        <div className="text-center">
          <div className="font-extrabold text-xs sm:text-sm tracking-wide uppercase text-amber-300">
            {page.theme}
          </div>
        </div>

        <div className="text-[11px] font-semibold bg-black/20 px-2.5 py-1 rounded-full">
          Page {pageNumber} / {totalPages}
        </div>
      </div>

      {/* Main Promo Visual Banner */}
      <div className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-black text-[#E30613] uppercase tracking-wide">
          Des prix qui font plaisir !
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold text-gray-500">
          Offres de démonstration UI/UX
        </span>
      </div>

      {/* Page Content / Interactive Products Grid */}
      <div className="p-4 flex-1 flex flex-col justify-around">
        {page.products && page.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.products.map((item) => (
              <Link
                key={item.id}
                to={`/produits/${item.id}`}
                className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#E30613] p-3 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 text-left"
              >
                {/* Discount Badge */}
                {item.discount && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <Badge type="discount">{item.discount}</Badge>
                  </div>
                )}

                {/* Product Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info & Price */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E30613] transition-colors truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-gray-500">
                    {item.brand} • {item.unit}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-[#E30613]">
                      {item.price.toFixed(3)} <span className="text-[10px]">DT</span>
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {item.oldPrice.toFixed(3)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow view */}
                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#E30613] group-hover:text-white text-gray-500 flex items-center justify-center transition-colors flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* General flyer editorial layout for remaining pages */
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-xs border border-gray-100">
              <ImageWithFallback
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-gray-800">{page.title}</h3>
            <p className="text-xs text-gray-500 max-w-sm">
              Consultez les remises exceptionnelles et nouveautés en rayon dans votre magasin AZIZA le plus proche.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Flyer Footer */}
      <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 px-4">
        <span>www.aziza.tn • Prototype Démonstration UI/UX</span>
        <span className="font-bold text-[#E30613]">AZIZA Tunisie</span>
      </div>
    </div>
  );
};
