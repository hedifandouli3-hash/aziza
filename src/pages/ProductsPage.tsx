import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { Search, Filter, Percent, ArrowUpDown, X, ShoppingBag, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product, Category } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isArabic } = useLanguage();

  const currentCategory = searchParams.get('cat') || 'all';
  const currentSearch = searchParams.get('q') || '';
  const onlyPromos = searchParams.get('promos') === 'true';

  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [localSearch, setLocalSearch] = useState<string | null>(null);

  const searchValue = localSearch !== null ? localSearch : currentSearch;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p: Product) => {
      // Category filter
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }
      // Promos filter
      if (onlyPromos && !p.isPromo) {
        return false;
      }
      // Search filter
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [currentCategory, currentSearch, onlyPromos, sortBy]);

  const handleCategoryChange = (catSlug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('cat');
    } else {
      newParams.set('cat', catSlug);
    }
    setSearchParams(newParams);
  };

  const handlePromoToggle = () => {
    const newParams = new URLSearchParams(searchParams);
    if (onlyPromos) {
      newParams.delete('promos');
    } else {
      newParams.set('promos', 'true');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue.trim();
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
    setLocalSearch(null);
  };

  const clearAllFilters = () => {
    setLocalSearch(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Banner */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isArabic ? 'منتجات وأقسام مغازات عزيزة' : 'Rayons & Produits AZIZA'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isArabic ? 'جميع منتجاتنا' : 'Tous nos produits'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {isArabic
            ? 'تصفحوا تشكيلة المواد الغذائية والمنتجات الطازجة ومواد التنظيف بأسعار الدينار التونسي (DT).'
            : 'Explorez notre assortiment de produits frais, d\'épicerie et d\'articles ménagers au meilleur prix en Tunisie.'}
        </p>
      </div>

      {/* Demonstration disclaimer */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Catalogue de démonstration :</strong> Tous les prix en Dinars Tunisiens (DT) et fiches produits sont stockés localement dans le frontend pour explorer le catalogue, la recherche et la découverte des offres.
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={isArabic ? 'البحث بالاسم أو العلامة التجارية...' : 'Filtrer par nom ou marque...'}
              className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#E30613] focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch(null);
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePromoToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                onlyPromos
                  ? 'bg-[#E30613] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>{isArabic ? 'العروض الترويجية فقط' : 'Promotions uniquement'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-gray-700 focus:outline-hidden cursor-pointer"
              >
                <option value="default">{isArabic ? 'الترتيب الافتراضي' : 'Tri par défaut'}</option>
                <option value="price-asc">{isArabic ? 'السعر: تصاعدي' : 'Prix croissant'}</option>
                <option value="price-desc">{isArabic ? 'السعر: تنازلي' : 'Prix décroissant'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isArabic ? 'جميع الأقسام' : 'Tous les rayons'} ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat: Category) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                currentCategory === cat.slug
                  ? 'bg-[#E30613] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isArabic && cat.nameAr ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters indicators */}
      {(currentCategory !== 'all' || currentSearch || onlyPromos) && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span>{isArabic ? 'الفلاتر النشطة :' : 'Filtres actifs :'}</span>
          {currentCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-[#E30613] rounded-lg font-bold">
              {CATEGORIES.find((c: Category) => c.slug === currentCategory)?.name || currentCategory}
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="hover:text-red-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {onlyPromos && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-[#E30613] rounded-lg font-bold">
              {isArabic ? 'تخفيضات' : 'Promotions'}
              <button type="button" onClick={handlePromoToggle} className="hover:text-red-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentSearch && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-200 text-gray-800 rounded-lg font-bold">
              &quot;{currentSearch}&quot;
              <button
                type="button"
                onClick={() => {
                  setLocalSearch(null);
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-gray-400 hover:text-[#E30613] underline ml-2"
          >
            {isArabic ? 'إعادة ضبط الكل' : 'Réinitialiser tout'}
          </button>
        </div>
      )}

      {/* Products Grid (2 on mobile, 3 on tablet, 5 on desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center text-gray-500 space-y-3">
          <Filter className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">
            {isArabic ? 'لا توجد منتجات تطابق بحثكم' : 'Aucun produit ne correspond à vos critères'}
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {isArabic
              ? 'يرجى تغيير كلمات البحث أو اختيار قسم آخر.'
              : 'Veuillez ajuster vos filtres de recherche ou explorer un autre rayon.'}
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-2 px-4 py-2 bg-[#E30613] text-white text-xs font-bold rounded-xl"
          >
            {isArabic ? 'إلغاء الفلاتر' : 'Réinitialiser les filtres'}
          </button>
        </div>
      )}
    </div>
  );
};
