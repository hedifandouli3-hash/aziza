import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORES } from '../data/stores';
import { ProductCard } from '../components/common/ProductCard';
import { StoreSelectorModal } from '../components/stores/StoreSelectorModal';
import { useSelectedStore } from '../context/StoreContext';
import { getProductStoreData, INVENTORY_DISCLAIMER } from '../data/inventory';
import {
  Search,
  Percent,
  ArrowUpDown,
  X,
  ShoppingBag,
  Info,
  MapPin,
  CheckCircle2,
  Store as StoreIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product, Category } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isArabic } = useLanguage();
  const {
    selectedStore,
    selectedStoreId,
    selectStore,
    clearStore,
    isStoreSelectorOpen,
    openStoreSelector,
    closeStoreSelector
  } = useSelectedStore();

  const currentCategory = searchParams.get('cat') || 'all';
  const currentSearch = searchParams.get('q') || '';
  const onlyPromos = searchParams.get('promos') === 'true';
  const onlyAvailable = searchParams.get('dispo') === 'true';
  const urlStoreId = searchParams.get('magasin');

  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [localSearch, setLocalSearch] = useState<string | null>(null);

  const searchValue = localSearch !== null ? localSearch : currentSearch;

  // Synchronize URL ?magasin=<store-id> with StoreContext
  useEffect(() => {
    if (urlStoreId) {
      const validStore = STORES.find((s) => s.id === urlStoreId);
      if (validStore && selectedStoreId !== urlStoreId) {
        selectStore(urlStoreId);
      } else if (!validStore) {
        // Remove invalid store parameter from URL without crashing
        const next = new URLSearchParams(searchParams);
        next.delete('magasin');
        setSearchParams(next, { replace: true });
      }
    }
  }, [urlStoreId, selectedStoreId, selectStore, searchParams, setSearchParams]);

  // Keep URL ?magasin in sync when store changes through UI
  useEffect(() => {
    const currentMagasinParam = searchParams.get('magasin');
    if (selectedStoreId && currentMagasinParam !== selectedStoreId) {
      const next = new URLSearchParams(searchParams);
      next.set('magasin', selectedStoreId);
      setSearchParams(next, { replace: true });
    } else if (!selectedStoreId && currentMagasinParam) {
      const next = new URLSearchParams(searchParams);
      next.delete('magasin');
      next.delete('dispo');
      setSearchParams(next, { replace: true });
    }
  }, [selectedStoreId, searchParams, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p: Product) => {
      // Category filter
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }

      // Store-specific inventory data
      const storeData = selectedStore ? getProductStoreData(p.id, selectedStore.id) : null;

      // Promos filter (product-level promo or store-level promo)
      const isPromo = p.isPromo || storeData?.isStorePromo;
      if (onlyPromos && !isPromo) {
        return false;
      }

      // Store availability filter (only active when a store is selected and onlyAvailable is true)
      if (selectedStore && onlyAvailable) {
        const isAvailable = storeData !== null ? storeData.isAvailable : true;
        if (!isAvailable) {
          return false;
        }
      }

      // Search query filter
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
      const aStoreData = selectedStore ? getProductStoreData(a.id, selectedStore.id) : null;
      const bStoreData = selectedStore ? getProductStoreData(b.id, selectedStore.id) : null;
      const aPrice = aStoreData?.storePrice ?? a.price;
      const bPrice = bStoreData?.storePrice ?? b.price;

      if (sortBy === 'price-asc') return aPrice - bPrice;
      if (sortBy === 'price-desc') return bPrice - aPrice;
      return 0;
    });
  }, [currentCategory, currentSearch, onlyPromos, onlyAvailable, selectedStore, sortBy]);

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

  const handleAvailabilityToggle = () => {
    if (!selectedStore) {
      // User must choose a store first
      openStoreSelector();
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    if (onlyAvailable) {
      newParams.delete('dispo');
    } else {
      newParams.set('dispo', 'true');
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

  const handleClearStore = () => {
    clearStore();
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('magasin');
    newParams.delete('dispo');
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setLocalSearch(null);
    const newParams = new URLSearchParams();
    if (selectedStoreId) {
      newParams.set('magasin', selectedStoreId);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isArabic ? 'منتجات وأقسام مغازات عزيزة' : 'Rayons & Produits AZIZA'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {isArabic ? 'جميع منتجاتنا' : 'Tous nos produits'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            {isArabic
              ? 'تصفحوا تشكيلة المواد الغذائية والمنتجات الطازجة ومواد التنظيف بأسعار الدينار التونسي (DT).'
              : 'Explorez notre assortiment de produits frais, d\'épicerie et d\'articles ménagers avec vérification de disponibilité en magasin.'}
          </p>
        </div>

        {/* Total products count indicator */}
        <div className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl self-start md:self-end shrink-0">
          <span className="text-[#E30613] font-black">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* =======================================================================
          STORE SELECTION BANNER (CLEAR STORE SELECTOR & LOCAL CONTEXT)
          ======================================================================= */}
      {selectedStore ? (
        <div className="bg-gradient-to-r from-red-50/80 via-white to-red-50/40 border border-red-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#E30613] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <StoreIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 font-semibold">
                  {isArabic ? 'المغازة المحددة :' : 'Magasin sélectionné :'}
                </span>
                <span className="text-xs sm:text-sm font-black text-gray-900 truncate">
                  {selectedStore.name} ({selectedStore.city})
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.2 rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Stocks locaux actifs
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                {selectedStore.address} • {selectedStore.openingHours}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button
              type="button"
              onClick={openStoreSelector}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-50 text-gray-800 hover:text-[#E30613] border border-gray-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              Changer de magasin
            </button>
            <button
              type="button"
              onClick={handleClearStore}
              title="Effacer la sélection (Catalogue général)"
              aria-label="Effacer le magasin sélectionné"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <Link
              to="/magasins"
              className="text-[11px] text-[#E30613] hover:underline font-bold px-1 hidden md:inline"
            >
              Voir la carte →
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                {isArabic ? 'تحديد المغازة لعرض التوفر والأسعار' : 'Choisissez votre magasin AZIZA'}
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {isArabic
                  ? 'اختر مغازتكم القريبة لمعرفة توفر المنتجات في الرفوف والاستفادة من العروض المحلية.'
                  : 'Sélectionnez un magasin pour filtrer les produits en stock et découvrir les promotions de votre quartier.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openStoreSelector}
            className="px-4 py-2 bg-[#E30613] hover:bg-[#c20510] text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isArabic ? 'اختيار مغازة' : 'Choisir un magasin'}</span>
          </button>
        </div>
      )}

      {/* Demonstration disclaimer */}
      <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Prototype de démonstration :</strong> {INVENTORY_DISCLAIMER}
        </span>
      </div>

      {/* =======================================================================
          FILTER AND SEARCH BAR
          ======================================================================= */}
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
            {/* Store Availability Filter */}
            <button
              type="button"
              onClick={handleAvailabilityToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                onlyAvailable && selectedStore
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : selectedStore
                  ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-800 border border-dashed border-gray-300'
              }`}
              title={
                selectedStore
                  ? `Afficher uniquement les produits disponibles chez AZIZA ${selectedStore.name}`
                  : 'Sélectionnez un magasin pour activer ce filtre'
              }
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  onlyAvailable && selectedStore ? 'text-white' : selectedStore ? 'text-emerald-600' : 'text-gray-400'
                }`}
              />
              <span>{isArabic ? 'متوفر في هذه المغازة' : 'Disponible dans ce magasin'}</span>
              {!selectedStore && (
                <span className="text-[10px] text-gray-400 hidden sm:inline">(choisir)</span>
              )}
            </button>

            {/* Promotions Filter */}
            <button
              type="button"
              onClick={handlePromoToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
      {(currentCategory !== 'all' || currentSearch || onlyPromos || onlyAvailable || selectedStore) && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span>{isArabic ? 'الفلاتر النشطة :' : 'Filtres actifs :'}</span>

          {/* Selected Store Indicator */}
          {selectedStore && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-[#E30613] rounded-lg font-bold border border-red-200/60">
              <StoreIcon className="w-3.5 h-3.5" />
              <span>{selectedStore.name}</span>
              <button
                type="button"
                onClick={handleClearStore}
                title="Effacer le magasin"
                className="hover:text-red-900 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Store Availability Indicator */}
          {onlyAvailable && selectedStore && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Disponible en rayon</span>
              <button
                type="button"
                onClick={handleAvailabilityToggle}
                className="hover:text-emerald-950 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Category Indicator */}
          {currentCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 rounded-lg font-bold">
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

          {/* Promo Indicator */}
          {onlyPromos && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-[#E30613] rounded-lg font-bold">
              {isArabic ? 'تخفيضات' : 'Promotions'}
              <button type="button" onClick={handlePromoToggle} className="hover:text-red-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Search Query Indicator */}
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
            className="text-xs text-gray-400 hover:text-[#E30613] underline ml-2 cursor-pointer"
          >
            {isArabic ? 'إعادة ضبط الفلاتر' : 'Réinitialiser les filtres'}
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500 space-y-3">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30613] flex items-center justify-center mx-auto mb-2">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            {isArabic ? 'لا توجد منتجات تطابق بحثكم' : 'Aucun produit ne correspond à vos critères'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            {selectedStore && onlyAvailable
              ? `Aucun produit disponible chez AZIZA ${selectedStore.name} avec les filtres actuels. Désactivez le filtre de disponibilité pour consulter l'assortiment complet ou explorez un autre rayon.`
              : isArabic
              ? 'يرجى تغيير كلمات البحث أو اختيار قسم آخر.'
              : 'Veuillez ajuster vos critères de recherche ou explorer un autre rayon AZIZA.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            {onlyAvailable && (
              <button
                type="button"
                onClick={handleAvailabilityToggle}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Désactiver le filtre de disponibilité
              </button>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-4 py-2 bg-[#E30613] hover:bg-[#c20510] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              {isArabic ? 'إلغاء جميع الفلاتر' : 'Réinitialiser tous les filtres'}
            </button>
          </div>
        </div>
      )}

      {/* Interactive Store Selector Modal */}
      <StoreSelectorModal isOpen={isStoreSelectorOpen} onClose={closeStoreSelector} />
    </div>
  );
};
