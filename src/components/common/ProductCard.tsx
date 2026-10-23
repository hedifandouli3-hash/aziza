import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Product } from '../../types';
import { Badge } from './Badge';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const hasValidDiscount = Boolean(
    product.discountPercent &&
    product.oldPrice &&
    product.oldPrice > product.price
  );

  const formatPrice = (p: number) => {
    return p.toFixed(3).replace('.', ',');
  };

  return (
    <Link
      to={`/produits/${product.id}`}
      className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden text-left"
    >
      {/* Top action row: Promo badge */}
      {hasValidDiscount && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <Badge type="discount" className="text-[11px] font-extrabold px-2 py-0.5">
            -{product.discountPercent}%
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="pt-6 px-3 pb-2 bg-gray-50/40 group-hover:bg-gray-50/70 transition-colors">
        <div className={`w-full ${compact ? 'h-28 sm:h-32' : 'h-32 sm:h-38'} flex items-center justify-center overflow-hidden`}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 truncate">
            {product.packageSize} {product.brand && `• ${product.brand}`}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-gray-100 flex items-end justify-between gap-1">
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-black text-[#E30613] tracking-tight leading-none whitespace-nowrap">
              {formatPrice(product.price)} <span className="text-[10px] sm:text-xs font-bold text-[#E30613]">DT</span>
            </div>
            {hasValidDiscount && product.oldPrice ? (
              <div className="text-[11px] text-gray-400 line-through mt-0.5 whitespace-nowrap">
                {formatPrice(product.oldPrice)} DT
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
