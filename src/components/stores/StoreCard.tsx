import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useSelectedStore } from '../../context/StoreContext';

interface StoreCardProps {
  store: Store;
  isSelected?: boolean;
  onSelect: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, isSelected = false, onSelect }) => {
  const navigate = useNavigate();
  const { selectedStoreId, selectStore } = useSelectedStore();
  const isGlobalSelected = selectedStoreId === store.id;

  const handleViewProducts = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectStore(store.id);
    navigate(`/produits?magasin=${encodeURIComponent(store.id)}`);
  };

  return (
    <div
      onClick={() => onSelect(store)}
      className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white text-left ${
        isSelected || isGlobalSelected
          ? 'border-[#E30613] shadow-md ring-2 ring-red-100'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isSelected || isGlobalSelected ? 'bg-[#E30613] text-white' : 'bg-red-50 text-[#E30613]'
            }`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 leading-tight flex items-center gap-1.5 flex-wrap">
              <span>{store.name}</span>
              {(isSelected || isGlobalSelected) && (
                <span className="text-[10px] font-black text-[#E30613] bg-red-100/80 px-2 py-0.2 rounded-full inline-flex items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613]" /> Magasin actif
                </span>
              )}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{store.address}</p>
          </div>
        </div>

        {store.distanceKm && (
          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
            {store.distanceKm} km
          </span>
        )}
      </div>

      {/* Info details */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <a
            href={`tel:${store.phone.replace(/\s+/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#E30613] transition-colors"
          >
            {store.phone}
          </a>
        </div>

        <div className="flex items-center gap-1 text-emerald-700 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{store.openingHours}</span>
        </div>
      </div>

      {/* Services pills */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {store.services.map((svc) => (
          <span
            key={svc}
            className="text-[10px] font-medium bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-md"
          >
            {svc}
          </span>
        ))}
      </div>

      {/* Actions: View Store Products & Google Maps */}
      <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleViewProducts}
          className="px-3.5 py-2 bg-[#E30613] hover:bg-[#c20510] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Voir les produits de ce magasin</span>
        </button>

        <a
          href={`https://maps.google.com/?q=${store.lat},${store.lng}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold text-gray-500 hover:text-[#E30613] flex items-center justify-center gap-1 py-1"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Itinéraire Google Maps</span>
        </a>
      </div>
    </div>
  );
};
