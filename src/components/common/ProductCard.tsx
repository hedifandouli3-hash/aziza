import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from './Badge';
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
    <div className="group relative bg-white rounded-2xl border border-gray-150/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top action row: Promo badge & Heart icon */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div>
          {product.discountPercent ? (
            <Badge type="discount" className="pointer-events-auto">
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
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            inList
              ? 'bg-[#E30613] text-white hover:bg-[#C0040F]'
              : 'bg-white/90 text-gray-400 hover:text-[#E30613] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inList ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/produits/${product.id}`} className="block pt-8 px-4 pb-2 bg-gray-50/50">
        <div className={`w-full ${compact ? 'h-32' : 'h-40'} flex items-center justify-center overflow-hidden`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/produits/${product.id}`} className="block group-hover:text-[#E30613] transition-colors">
            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mt-0.5">
            {product.packageSize} {product.brand && `• ${product.brand}`}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-end justify-between">
          <div>
            <div className="text-lg font-black text-[#E30613] tracking-tight leading-none">
              {formatPrice(product.price)} <span className="text-xs font-bold text-[#E30613]">DT</span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-gray-400 line-through mt-0.5">
                {formatPrice(product.oldPrice)} DT
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToList}
            title={inList ? 'Déjà dans ma liste (cliquer pour ajouter +1)' : 'Ajouter à ma liste'}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
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
