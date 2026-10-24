import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import type { Product } from '../../types';
import { Badge } from './Badge';
import { ImageWithFallback } from './ImageWithFallback';
import { useSelectedStore } from '../../context/StoreContext';
import { getProductStoreData } from '../../data/inventory';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { selectedStore } = useSelectedStore();

  const storeData = selectedStore ? getProductStoreData(product.id, selectedStore.id) : null;
  const isAvailableInStore = storeData !== null ? storeData.isAvailable : true;
  const effectivePrice = storeData?.storePrice ?? product.price;
  const effectiveOldPrice = storeData?.storeOldPrice ?? product.oldPrice;
  const effectiveDiscountPercent = storeData?.storeDiscountPercent ?? product.discountPercent;

  const hasValidDiscount = Boolean(
    effectiveDiscountPercent &&
    effectiveOldPrice &&
    effectiveOldPrice > effectivePrice
  );

  const formatPrice = (p: number) => {
    return p.toFixed(3).replace('.', ',');
  };

  return (
    <Link
      to={`/produits/${product.id}`}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden text-left ${
        selectedStore && !isAvailableInStore
          ? 'border-gray-200/60 opacity-80 hover:opacity-100 hover:border-gray-300'
          : 'border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-md'
      }`}
    >
      {/* Top badges row */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between gap-1 pointer-events-none">
        {hasValidDiscount ? (
          <Badge type="discount" className="text-[11px] font-extrabold px-2 py-0.5">
            -{effectiveDiscountPercent}%
          </Badge>
        ) : storeData?.isStorePromo ? (
          <span className="text-[10px] font-extrabold bg-[#E30613] text-white px-2 py-0.5 rounded-full shadow-xs">
            Offre Magasin
          </span>
        ) : <div />}

        {/* Store-specific availability label */}
        {selectedStore && (
          isAvailableInStore ? (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs"
              title={`Disponible au magasin AZIZA ${selectedStore.name}`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Disponible</span>
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs"
              title={`Actuellement indisponible au magasin AZIZA ${selectedStore.name}`}
            >
              <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
              <span>Indisponible</span>
            </span>
          )
        )}
      </div>

      {/* Product Image */}
      <div className="pt-7 px-3 pb-2 bg-gray-50/40 group-hover:bg-gray-50/70 transition-colors">
        <div className={`w-full ${compact ? 'h-28 sm:h-32' : 'h-32 sm:h-38'} flex items-center justify-center overflow-hidden`}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${
              selectedStore && !isAvailableInStore ? 'grayscale-40' : ''
            }`}
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-0.5 truncate">
            {product.packageSize} {product.brand && `• ${product.brand}`}
          </p>
        </div>

        {/* Selected Store Context indicator (if store active) */}
        {selectedStore && (
          <div className="text-[10px] text-gray-400 truncate border-t border-gray-100/80 pt-1.5 flex items-center justify-between">
            <span className="truncate">{selectedStore.name}</span>
            {storeData?.isStorePromo && (
              <span className="text-[#E30613] font-bold shrink-0">Prix local</span>
            )}
          </div>
        )}

        {/* Price & Action */}
        <div className="pt-1.5 border-t border-gray-100 flex items-end justify-between gap-1">
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-black text-[#E30613] tracking-tight leading-none whitespace-nowrap">
              {formatPrice(effectivePrice)} <span className="text-[10px] sm:text-xs font-bold text-[#E30613]">DT</span>
            </div>
            {hasValidDiscount && effectiveOldPrice ? (
              <div className="text-[11px] text-gray-400 line-through mt-0.5 whitespace-nowrap">
                {formatPrice(effectiveOldPrice)} DT
              </div>
            ) : (
              <div className="text-[11px] text-transparent select-none mt-0.5">0</div>
            )}
          </div>

          <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#E30613] group-hover:text-white text-gray-500 flex items-center justify-center transition-colors flex-shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
