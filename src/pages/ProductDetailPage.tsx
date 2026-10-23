import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Check,
  ChevronRight,
  Share2,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORES } from '../data/stores';
import { Badge } from '../components/common/Badge';
import { ProductCard } from '../components/common/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import type { Product, Category, Store } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p: Product) => p.id === id) || PRODUCTS[2]; // Default to Pâtes Warda matching design board

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.additionalImages?.[0] || product?.image || ''
  );
  const [selectedCity, setSelectedCity] = useState<string>('Tunis');
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Category info
  const category = CATEGORIES.find((c: Category) => c.slug === product.category);

  // Available images
  const allImages = product.additionalImages?.length
    ? product.additionalImages
    : [product.image];

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
        text: `Découvrez ${product.name} à ${product.price.toFixed(3)} DT chez AZIZA !`,
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
      {/* 1. Breadcrumb navigation matching Panel 4 */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-[#E30613] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <Link to="/produits" className="hover:text-[#E30613] transition-colors">
          Produits
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <Link
          to={`/produits?cat=${product.category}`}
          className="hover:text-[#E30613] transition-colors"
        >
          {category?.name || 'Épicerie'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
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
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 bg-gray-50 border-2 transition-all flex items-center justify-center flex-shrink-0 ${
                  selectedImage === img
                    ? 'border-[#E30613] shadow-xs'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} vue ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Large Main Image Preview */}
          <div className="relative flex-1 aspect-square rounded-2xl bg-gray-50/70 p-4 flex items-center justify-center overflow-hidden border border-gray-100">
            {product.discountPercent && (
              <div className="absolute top-3 left-3 z-10">
                <Badge type="discount">-{product.discountPercent}%</Badge>
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
        <div className="lg:col-span-4 space-y-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
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
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#E30613] tracking-tight">
                {product.price.toFixed(3)} <span className="text-sm font-bold">DT</span>
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {product.oldPrice.toFixed(3)} DT
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </div>

          {/* Product Specifications Table matching design board */}
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
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
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

        {/* Store Availability Card with Explicit Demonstration Labeling */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E30613] flex items-center justify-center">
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

          <p className="text-xs text-gray-500">
            Simulez la vérification de stock dans le réseau de magasins AZIZA de votre région.
          </p>

          {/* City Selection Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-700">Sélectionner votre ville</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setHasCheckedAvailability(true);
              }}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#E30613]"
            >
              <option value="Tunis">Tunis (Grand Tunis)</option>
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

          <button
            type="button"
            onClick={() => setHasCheckedAvailability(true)}
            className="w-full py-2.5 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Vérifier la disponibilité (Simulé)
          </button>

          {/* Store Availability Results List */}
          {hasCheckedAvailability && (
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Magasins à {selectedCity} :</span>
                <span className="text-[10px] text-amber-600 font-semibold">Exemple simulé</span>
              </div>
              {cityStores.length > 0 ? (
                cityStores.map((store: Store) => (
                  <div
                    key={store.id}
                    className="p-2.5 rounded-xl bg-gray-50/80 border border-gray-200 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-gray-900">{store.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{store.address}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md flex-shrink-0">
                      <Check className="w-3 h-3" /> En stock
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                  Plusieurs magasins AZIZA disponibles dans le gouvernorat.
                </div>
              )}

              <div className="p-2 bg-amber-50/70 rounded-xl text-[10px] text-amber-800 flex items-start gap-1.5 border border-amber-200/50 mt-1">
                <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  * Ce prototype ne se connecte à aucun système ERP centralisé : les stocks réels peuvent varier en rayon.
                </span>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link
              to="/magasins"
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Voir la carte complète</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Produits similaires
              </h2>
              <p className="text-xs text-gray-500">
                D&apos;autres articles du rayon {category?.name || 'Épicerie'} à découvrir
              </p>
            </div>
            <Link
              to={`/produits?cat=${product.category}`}
              className="text-xs font-bold text-[#E30613] hover:underline"
            >
              Voir tout le rayon &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
