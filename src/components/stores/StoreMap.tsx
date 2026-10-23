import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Clock, Navigation, Map, Compass } from 'lucide-react';
import type { Store } from '../../types';

interface StoreMapProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
}

// Custom Red Pin for AZIZA Supermarkets
const createStoreIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'aziza-marker',
    html: `
      <div style="
        background-color: ${isSelected ? '#99000C' : '#E30613'};
        width: ${isSelected ? '36px' : '30px'};
        height: ${isSelected ? '36px' : '30px'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.35);
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-family: sans-serif;
          font-weight: 900;
          font-size: ${isSelected ? '14px' : '11px'};
          line-height: 1;
        ">A</div>
      </div>
    `,
    iconSize: [isSelected ? 36 : 30, isSelected ? 36 : 30],
    iconAnchor: [isSelected ? 18 : 15, isSelected ? 36 : 30],
    popupAnchor: [0, isSelected ? -36 : -30]
  });
};

// Component to recenter map when selected store changes
const MapController: React.FC<{ selectedStore: Store | null }> = ({ selectedStore }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedStore) {
      map.flyTo([selectedStore.lat, selectedStore.lng], 13, {
        duration: 1.2
      });
    }
  }, [selectedStore, map]);

  return null;
};

export const StoreMap: React.FC<StoreMapProps> = ({ stores, selectedStore, onSelectStore }) => {
  const [mapMode, setMapMode] = useState<'tiles' | 'stylized'>('tiles');
  const defaultCenter: [number, number] = [36.8065, 10.1815]; // Tunis
  const defaultZoom = 8;

  return (
    <div className="w-full h-full min-h-[450px] sm:min-h-[550px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0 flex flex-col">
      {/* Mode Switcher on top right */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-xs rounded-xl shadow-md p-1 border border-gray-200 flex items-center gap-1 text-xs font-bold text-gray-700">
        <button
          type="button"
          onClick={() => setMapMode('tiles')}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            mapMode === 'tiles' ? 'bg-[#E30613] text-white shadow-2xs' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Carte OpenStreetMap</span>
        </button>
        <button
          type="button"
          onClick={() => setMapMode('stylized')}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            mapMode === 'stylized' ? 'bg-[#E30613] text-white shadow-2xs' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Vue Schématique</span>
        </button>
      </div>

      {mapMode === 'tiles' ? (
        <MapContainer
          center={selectedStore ? [selectedStore.lat, selectedStore.lng] : defaultCenter}
          zoom={selectedStore ? 12 : defaultZoom}
          scrollWheelZoom={false}
          className="w-full h-full flex-1"
          style={{ height: '100%', minHeight: '450px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController selectedStore={selectedStore} />

          {stores.map((store) => {
            const isSelected = selectedStore?.id === store.id;
            return (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={createStoreIcon(isSelected)}
                eventHandlers={{
                  click: () => onSelectStore(store)
                }}
              >
                <Popup className="aziza-popup">
                  <div className="p-1 min-w-[200px]">
                    <div className="font-black text-sm text-gray-900 leading-tight">
                      {store.name}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{store.address}</p>

                    <div className="mt-2 pt-2 border-t border-gray-150 space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{store.openingHours}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <a href={`tel:${store.phone}`} className="hover:underline">
                          {store.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-3">
                      <a
                        href={`https://maps.google.com/?q=${store.lat},${store.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1.5 bg-[#E30613] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#C0040F] transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Ouvrir dans Google Maps</span>
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        /* Stylized Schematic Map of Tunisia matching the Design Board */
        <div className="w-full h-full flex-1 bg-linear-to-b from-sky-50 via-amber-50/40 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="text-center max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-200 space-y-3 z-10">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30613] flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6 animate-spin duration-3000" />
            </div>
            <h3 className="text-base font-black text-gray-900">
              Réseau AZIZA Tunisie • Vue Territoire
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sélectionnez un magasin dans la liste pour voir sa fiche d&apos;informations ou basculez en mode <strong>Carte OpenStreetMap</strong> pour zoomer rue par rue.
            </p>
            {selectedStore && (
              <div className="p-3 bg-red-50 rounded-2xl border border-red-150 text-left">
                <div className="font-black text-sm text-[#E30613]">{selectedStore.name}</div>
                <div className="text-xs text-gray-600 mt-0.5">{selectedStore.address}</div>
                <div className="text-[11px] font-bold text-gray-500 mt-1">
                  Gouvernorat : {selectedStore.governorate} • {selectedStore.openingHours}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMapMode('tiles')}
              className="mt-2 w-full py-2 bg-[#E30613] text-white text-xs font-bold rounded-xl hover:bg-[#C0040F] transition-colors"
            >
              Afficher la carte interactive détaillée
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
