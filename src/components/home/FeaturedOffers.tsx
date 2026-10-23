import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useLanguage } from '../../context/LanguageContext';

export const FeaturedOffers: React.FC = () => {
  const { isArabic } = useLanguage();
  // Take the first 6 items which correspond exactly to the board
  const featured = PRODUCTS.slice(0, 6);

  return (
    <section className="my-10 sm:my-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-100/70 text-[#E30613] flex items-center justify-center">
            <Flame className="w-5 h-5 fill-[#E30613]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {isArabic ? 'عروض اللحظة الترويجية' : 'Nos offres du moment'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {isArabic
                ? 'تخفيضات فورية متوفرة اليوم في جميع مغازات عزيزة في تونس'
                : 'Des réductions immédiates disponibles dès aujourd\'hui dans vos magasins AZIZA'}
            </p>
          </div>
        </div>

        <Link
          to="/produits?promos=true"
          className="text-xs sm:text-sm font-bold text-[#E30613] hover:underline flex items-center gap-1 group"
        >
          <span>{isArabic ? 'عرض الكل' : 'Voir tout'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Cards Grid: 2 on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
