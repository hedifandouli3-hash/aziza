import React, { useState } from 'react';
import { STORES } from '../data/stores';
import { StoreCard } from '../components/stores/StoreCard';
import { StoreMap } from '../components/stores/StoreMap';
import { Search, MapPin, List, Map as MapIcon, X, Info } from 'lucide-react';
import type { Store } from '../types';

export const StoresPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('Tous');
  const [selectedStore, setSelectedStore] = useState<Store | null>(STORES[0]);
  const [mobileView, setMobileView] = useState<'both' | 'map' | 'list'>('list');

  // Governorates list
  const governorates = ['Tous', 'Tunis', 'Ariana', 'Sousse', 'Sfax', 'Nabeul', 'Bizerte', 'Monastir', 'Kairouan', 'Gabès'];

  const filteredStores = STORES.filter((store: Store) => {
    // Governorate filter
    if (selectedGovernorate !== 'Tous') {
      if (store.governorate.toLowerCase() !== selectedGovernorate.toLowerCase()) {
        return false;
      }
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        store.name.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Réseau National AZIZA • Démonstration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Nos magasins
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            Retrouvez tous les magasins AZIZA en Tunisie. Consultez les coordonnées, itinéraires, horaires d&apos;ouverture et services proposés.
          </p>
        </div>

        {/* Mobile View Toggle Buttons */}
        <div className="flex md:hidden items-center bg-gray-100 p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setMobileView('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              mobileView === 'list'
                ? 'bg-white text-[#E30613] shadow-xs'
                : 'text-gray-600'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Liste ({filteredStores.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              mobileView === 'map'
                ? 'bg-white text-[#E30613] shadow-xs'
                : 'text-gray-600'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Carte</span>
          </button>
        </div>
      </div>

      {/* Demonstration Notice */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Démonstration Frontend :</strong> Cette liste et la carte affichent des exemples de magasins AZIZA en Tunisie stockés localement. Les données sont fournies à titre indicatif pour ce prototype interactif.
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une ville, un quartier (ex: Lafayette, Sousse, Marsa...)"
              className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#E30613]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Governorate Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {governorates.map((gov) => (
            <button
              key={gov}
              type="button"
              onClick={() => setSelectedGovernorate(gov)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedGovernorate === gov
                  ? 'bg-[#E30613] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {gov}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Left Map, Right List matching panel 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Column */}
        <div
          className={`lg:col-span-7 h-[500px] lg:h-[650px] ${
            mobileView === 'list' ? 'hidden md:block' : 'block'
          }`}
        >
          <StoreMap
            stores={filteredStores}
            selectedStore={selectedStore}
            onSelectStore={handleSelectStore}
          />
        </div>

        {/* Store List Column */}
        <div
          className={`lg:col-span-5 space-y-3 max-h-[650px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 ${
            mobileView === 'map' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
            <span>{filteredStores.length} magasin(s) trouvé(s)</span>
            <span className="text-[11px] text-gray-400">Cliquez pour situer sur la carte</span>
          </div>

          {filteredStores.length > 0 ? (
            filteredStores.map((store: Store) => (
              <StoreCard
                key={store.id}
                store={store}
                isSelected={selectedStore?.id === store.id}
                onSelect={handleSelectStore}
              />
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-800">Aucun magasin trouvé</p>
              <p className="text-xs text-gray-400 mt-1">
                Essayez d&apos;élargir votre recherche ou de sélectionner un autre gouvernorat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
