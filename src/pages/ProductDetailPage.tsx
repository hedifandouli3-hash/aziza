import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Share2,
  Store as StoreIcon
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORES } from '../data/stores';
import { Badge } from '../components/common/Badge';
import { ProductCard } from '../components/common/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { StoreSelectorModal } from '../components/stores/StoreSelectorModal';
import { useSelectedStore } from '../context/StoreContext';
import { getProductStoreData, INVENTORY_DISCLAIMER } from '../data/inventory';
import type { Product, Category, Store } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p: Product) => p.id === id) || PRODUCTS[2]; // Fallback if id not found

  const {
    selectedStore,
    selectStore,
    isStoreSelectorOpen,
    openStoreSelector,
    closeStoreSelector
  } = useSelectedStore();

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.additionalImages?.[0] || product?.image || ''
  );
  const [selectedCity, setSelectedCity] = useState<string>(selectedStore ? selectedStore.city : 'Tunis');
  const [copied, setCopied] = useState<boolean>(false);

  // Category info
  const category = CATEGORIES.find((c: Category) => c.slug === product.category);

  // Available images
  const allImages = product.additionalImages?.length
    ? product.additionalImages
    : [product.image];

  // Store-specific inventory data for active selected store
  const activeStoreData = selectedStore ? getProductStoreData(product.id, selectedStore.id) : null;
  const isAvailableInSelectedStore = activeStoreData !== null ? activeStoreData.isAvailable : true;
  const effectivePrice = activeStoreData?.storePrice ?? product.price;
  const effectiveOldPrice = activeStoreData?.storeOldPrice ?? product.oldPrice;
  const effectiveDiscountPercent = activeStoreData?.storeDiscountPercent ?? product.discountPercent;

  // Stores in selected city
  const cityStores = STORES.filter(
    (s: Store) => s.city.toLowerCase() === selectedCity.toLowerCase() || s.governorate.toLowerCase() === selectedCity.toLowerCase()
  );

  // Similar products in same category
  const similarProducts = PRODUCTS.filter(
    (p: Product) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - AZIZA Tunisie`,
        text: `Découvrez ${product.name} à ${effectivePrice.toFixed(3)} DT chez AZIZA !`,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-[#E30613] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <Link to="/produits" className="hover:text-[#E30613] transition-colors">
          Produits
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <Link
          to={`/produits?cat=${product.category}`}
          className="hover:text-[#E30613] transition-colors"
        >
          {category?.name || 'Épicerie'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-gray-900 font-bold">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Column (Thumbnail Strip on left + Large Preview on right) */}
        <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-xs">
          {/* Thumbnails vertical column */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-96">
            {allImages.map((img: string, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 bg-gray-50 border-2 transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  selectedImage === img
                    ? 'border-[#E30613] shadow-xs'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} - vue ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Large Main Image Preview */}
          <div className="relative flex-1 aspect-square rounded-2xl bg-gray-50/70 p-4 flex items-center justify-center overflow-hidden border border-gray-100">
            {effectiveDiscountPercent && (
              <div className="absolute top-3 left-3 z-10">
                <Badge type="discount">-{effectiveDiscountPercent}%</Badge>
              </div>
            )}
            <ImageWithFallback
              src={selectedImage || product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details & Information */}
        <div className="lg:col-span-4 space-y-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-left">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-gray-500 mt-1">
                  {product.packageSize} {product.brand && `• ${product.brand}`}
                </p>
              </div>
            </div>

            {/* Price block */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-[#E30613] tracking-tight">
                {effectivePrice.toFixed(3)} <span className="text-sm font-bold">DT</span>
              </span>
              {effectiveOldPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {effectiveOldPrice.toFixed(3)} DT
                </span>
              )}
              {activeStoreData?.isStorePromo && (
                <span className="text-[10px] font-bold text-white bg-[#E30613] px-2 py-0.5 rounded-full">
                  Offre {selectedStore?.name}
                </span>
              )}
            </div>

            {selectedStore && (
              <div className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1.5">
                <StoreIcon className="w-3.5 h-3.5 text-[#E30613]" />
                <span>
                  Prix affiché pour <strong>{selectedStore.name}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </div>

          {/* Product Specifications Table */}
          <div className="pt-3 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Caractéristiques
            </h3>
            <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50/70 p-3 rounded-xl">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Marque :</span>
                <span className="font-bold text-gray-800">{product.brand}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Format :</span>
                <span className="font-bold text-gray-800">{product.packageSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Catégorie :</span>
                <span className="font-bold text-gray-800">{category?.name || 'Épicerie'}</span>
              </div>
              {product.origin && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400">Origine :</span>
                  <span className="font-bold text-gray-800">{product.origin}</span>
                </div>
              )}
              {product.barcode && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Code EAN :</span>
                  <span className="font-mono text-gray-600">{product.barcode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/magasins"
              className="flex-1 py-3 px-4 bg-[#E30613] hover:bg-[#C0040F] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Trouver en magasin AZIZA</span>
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={handleShare}
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                title="Partager ce produit"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && (
                <span className="absolute -top-8 right-0 bg-[#E30613] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20">
                  Lien copié !
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. Store Availability Card with Structured Local Inventory */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E30613] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 leading-tight">
                Disponibilité en magasin
              </h2>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Données de démonstration UI/UX
              </span>
            </div>
          </div>

          {/* Current Selected Store Status Spotlight */}
          {selectedStore ? (
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span className="truncate">{selectedStore.name}</span>
                <button
                  type="button"
                  onClick={openStoreSelector}
                  className="text-[11px] text-[#E30613] hover:underline shrink-0 font-semibold cursor-pointer"
                >
                  Changer
                </button>
              </div>

              {isAvailableInSelectedStore ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Disponible dans ce magasin</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Actuellement indisponible dans ce magasin</span>
                </div>
              )}
              <div className="text-[10px] text-gray-400">
                {selectedStore.address}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-red-50/50 border border-red-200/80 text-center space-y-2">
              <p className="text-xs text-gray-600">
                Aucun magasin sélectionné. Choisissez votre magasin pour vérifier la disponibilité en rayon.
              </p>
              <button
                type="button"
                onClick={openStoreSelector}
                className="w-full py-2 bg-[#E30613] hover:bg-[#c20510] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Choisir mon magasin
              </button>
            </div>
          )}

          {/* City Selection Dropdown to explore other stores */}
          <div className="pt-2 border-t border-gray-100 space-y-1.5">
            <label className="text-[11px] font-bold text-gray-700">Explorer les magasins par ville</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#E30613] cursor-pointer"
            >
              <option value="Tunis">Tunis</option>
              <option value="Ariana">Ariana</option>
              <option value="Sousse">Sousse</option>
              <option value="Sfax">Sfax</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Monastir">Monastir</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Gabès">Gabès</option>
            </select>
          </div>

          {/* City Stores Availability List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Magasins à {selectedCity} ({cityStores.length}) :
            </div>
            {cityStores.length > 0 ? (
              cityStores.map((store: Store) => {
                const storeRecord = getProductStoreData(product.id, store.id);
                const isAvail = storeRecord !== null ? storeRecord.isAvailable : true;
                const isSelected = selectedStore?.id === store.id;

                return (
                  <div
                    key={store.id}
                    onClick={() => selectStore(store.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
                      isSelected
                        ? 'bg-red-50/60 border-[#E30613] ring-1 ring-[#E30613]'
                        : 'bg-gray-50/70 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate">
                        {store.name}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        {store.address}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isAvail ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Dispo</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Épuisé</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 py-2">Aucun magasin trouvé dans cette ville.</p>
            )}
          </div>

          <div className="text-[10px] text-gray-400 border-t border-gray-100 pt-2">
            {INVENTORY_DISCLAIMER}
          </div>
        </div>
      </div>

      {/* 4. Similar Products Carousel/Grid */}
      {similarProducts.length > 0 && (
        <section className="pt-8 border-t border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              Produits similaires dans le même rayon
            </h2>
            <Link
              to={`/produits?cat=${product.category}`}
              className="text-xs font-bold text-[#E30613] hover:underline"
            >
              Voir tout le rayon &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}

      {/* Store Selector Modal */}
      <StoreSelectorModal isOpen={isStoreSelectorOpen} onClose={closeStoreSelector} />
    </div>
  );
};
