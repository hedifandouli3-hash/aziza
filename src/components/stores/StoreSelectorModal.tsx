import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, X, Check, Store as StoreIcon, Clock, ChevronRight } from 'lucide-react';
import { STORES } from '../../data/stores';
import { useSelectedStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Store } from '../../types';

interface StoreSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreSelectorModal: React.FC<StoreSelectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedStoreId, selectStore, clearStore } = useSelectedStore();
  const { isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('Tous');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Governorates for filter pills
  const governorates = ['Tous', 'Tunis', 'Ariana', 'Sousse', 'Sfax', 'Nabeul', 'Bizerte', 'Monastir', 'Kairouan', 'Gabès'];

  const filteredStores = useMemo(() => {
    return STORES.filter((store: Store) => {
      if (selectedGovernorate !== 'Tous') {
        if (store.governorate.toLowerCase() !== selectedGovernorate.toLowerCase()) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          store.name.toLowerCase().includes(q) ||
          store.city.toLowerCase().includes(q) ||
          store.address.toLowerCase().includes(q) ||
          store.governorate.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedGovernorate]);

  if (!isOpen) return null;

  const handleSelect = (storeId: string) => {
    selectStore(storeId);
    onClose();
  };

  const handleClear = () => {
    clearStore();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-red-50/60 to-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E30613] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-200">
              <StoreIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 id="store-modal-title" className="text-base sm:text-lg font-black text-gray-900 tracking-tight truncate">
                {isArabic ? 'اختر مغازة عزيزة' : 'Choisir votre magasin AZIZA'}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {isArabic
                  ? 'عرض توفر المواد والأسعار الخاصة بمغازتكم'
                  : 'Consultez la disponibilité des produits et offres locales'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Governorate Filters */}
        <div className="p-3.5 sm:p-5 border-b border-gray-100 space-y-3 bg-gray-50/50">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isArabic
                  ? 'ابحث باسم المغازة أو المدينة (تونس، سوسة، صفاقس...)'
                  : 'Rechercher par nom de magasin, ville ou gouvernorat...'
              }
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-[#E30613] focus:ring-2 focus:ring-red-100 transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Governorate Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {governorates.map((gov) => (
              <button
                key={gov}
                type="button"
                onClick={() => setSelectedGovernorate(gov)}
                className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                  selectedGovernorate === gov
                    ? 'bg-[#E30613] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {gov}
              </button>
            ))}
          </div>
        </div>

        {/* Stores List */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-2.5 min-h-[220px] max-h-[380px]">
          {filteredStores.length > 0 ? (
            filteredStores.map((store: Store) => {
              const isSelected = selectedStoreId === store.id;

              return (
                <div
                  key={store.id}
                  onClick={() => handleSelect(store.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                    isSelected
                      ? 'bg-red-50/50 border-[#E30613] shadow-xs ring-1 ring-[#E30613]'
                      : 'bg-white hover:bg-gray-50/80 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#E30613] text-white' : 'bg-red-50 text-[#E30613]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs sm:text-sm font-black text-gray-900 truncate">
                          {store.name}
                        </h3>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.2 rounded-full">
                          {store.city} ({store.governorate})
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-black text-[#E30613] bg-red-100/80 px-2 py-0.2 rounded-full inline-flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Sélectionné
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mt-0.5 truncate">{store.address}</p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <Clock className="w-3 h-3" /> {store.openingHours}
                        </span>
                        {store.distanceKm && <span>• ~{store.distanceKm} km</span>}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(store.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#E30613] text-white'
                        : 'bg-gray-100 hover:bg-[#E30613] text-gray-700 hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Actif' : 'Choisir'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <MapPin className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-xs sm:text-sm font-bold text-gray-700">
                {isArabic ? 'لم نتمكن من العثور على مغازة' : 'Aucun magasin trouvé'}
              </p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {isArabic
                  ? 'يرجى تجربة كلمات بحث أخرى أو اختيار جميع الولايات.'
                  : 'Essayez un autre nom de ville ou sélectionnez "Tous" les gouvernorats.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer with Clear Store Option & Demonstration Notice */}
        <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="text-[11px] text-gray-400 text-center sm:text-left">
            <span>Prototype démonstration • 12 magasins testés avec inventaire local</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {selectedStoreId && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#E30613] hover:bg-red-50 rounded-xl transition-colors border border-gray-200"
              >
                {isArabic ? 'إلغاء تحديد المغازة' : 'Effacer la sélection (Catalogue général)'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
