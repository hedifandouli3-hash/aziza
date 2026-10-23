import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import type { Product } from '../../types';
import { Badge } from './Badge';
import { ImageWithFallback } from './ImageWithFallback';
import { useShoppingList } from '../../context/ShoppingListContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addItem, removeItem, isInList } = useShoppingList();
  const inList = isInList(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inList) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const formatPrice = (p: number) => {
    return p.toFixed(3).replace('.', ',');
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/75 hover:border-red-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top action row: Promo badge & Heart icon */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div>
          {product.discountPercent ? (
            <Badge type="discount" className="pointer-events-auto text-[11px] font-extrabold px-2 py-0.5">
              -{product.discountPercent}%
            </Badge>
          ) : (
            <div />
          )}
        </div>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={inList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-2xs ${
            inList
              ? 'bg-[#E30613] text-white hover:bg-[#C0040F]'
              : 'bg-white/90 text-gray-400 hover:text-[#E30613] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inList ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        to={`/produits/${product.id}`}
        className="block pt-8 px-3 pb-2 bg-gray-50/40 hover:bg-gray-50/70 transition-colors"
      >
        <div className={`w-full ${compact ? 'h-28 sm:h-32' : 'h-32 sm:h-38'} flex items-center justify-center overflow-hidden`}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <Link to={`/produits/${product.id}`} className="block group-hover:text-[#E30613] transition-colors">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
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
            {product.oldPrice ? (
              <div className="text-[11px] text-gray-400 line-through mt-0.5 whitespace-nowrap">
                {formatPrice(product.oldPrice)} DT
              </div>
            ) : (
              <div className="text-[11px] text-transparent select-none mt-0.5">0</div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToList}
            title={inList ? 'Dans ma liste (cliquer pour ajouter +1)' : 'Ajouter à ma liste'}
            className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center transition-all flex-shrink-0 ${
              inList
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'bg-red-50 text-[#E30613] hover:bg-[#E30613] hover:text-white'
            }`}
          >
            {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
