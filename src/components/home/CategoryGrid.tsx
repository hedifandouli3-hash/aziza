import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const CategoryGrid: React.FC = () => {
  const { isArabic } = useLanguage();
  // Take first 7 categories, and the 8th slot is "Plus de rayons"
  const mainCategories = CATEGORIES.slice(0, 7);

  return (
    <section className="my-8 sm:my-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {isArabic ? 'اكتشفوا أقسامنا' : 'Explorez nos rayons'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {isArabic
              ? 'تجدون كل ضرورياتكم اليومية بأفضل الأسعار'
              : 'Trouvez rapidement tous vos indispensables du quotidien au meilleur prix'}
          </p>
        </div>
        <Link
          to="/produits"
          className="text-xs sm:text-sm font-bold text-[#E30613] hover:underline flex items-center gap-1"
        >
          {isArabic ? 'جميع الأقسام ←' : 'Tous les rayons →'}
        </Link>
      </div>

      {/* Grid matching Panel 1 of Design Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
        {mainCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/produits?cat=${cat.slug}`}
            className="group flex flex-col items-center p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md hover:border-red-200 transition-all text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 bg-gray-50 p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <ImageWithFallback
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#E30613] transition-colors leading-tight line-clamp-2">
              {isArabic && cat.nameAr ? cat.nameAr : cat.name}
            </span>
          </Link>
        ))}

        {/* 8th item: Plus de rayons */}
        <Link
          to="/produits"
          className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md hover:border-red-200 transition-all text-center min-h-[120px]"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50 text-[#E30613] flex items-center justify-center mb-2 group-hover:scale-105 group-hover:bg-[#E30613] group-hover:text-white transition-all">
            <MoreHorizontal className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800 group-hover:text-[#E30613] transition-colors leading-tight">
            {isArabic ? 'بقية الأقسام' : 'Plus de rayons'}
          </span>
        </Link>
      </div>
    </section>
  );
};
