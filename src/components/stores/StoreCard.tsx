import React from 'react';
import { Store } from '../../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  isSelected?: boolean;
  onSelect: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, isSelected = false, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(store)}
      className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white text-left ${
        isSelected
          ? 'border-[#E30613] shadow-md ring-2 ring-red-100'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isSelected ? 'bg-[#E30613] text-white' : 'bg-red-50 text-[#E30613]'
            }`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 leading-tight flex items-center gap-1.5">
              <span>{store.name}</span>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#E30613]" />}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{store.address}</p>
          </div>
        </div>

        {store.distanceKm && (
          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
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

      {/* Navigation action */}
      <div className="mt-3 flex items-center justify-end">
        <a
          href={`https://maps.google.com/?q=${store.lat},${store.lng}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold text-[#E30613] hover:underline flex items-center gap-1"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Itinéraire Google Maps</span>
        </a>
      </div>
    </div>
  );
};
