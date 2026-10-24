import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { STORES } from '../data/stores';
import type { Store } from '../types';

const STORAGE_KEY = 'aziza_selected_store_id';

interface StoreContextType {
  selectedStoreId: string | null;
  selectedStore: Store | null;
  selectStore: (storeId: string | null) => void;
  clearStore: () => void;
  isStoreSelectorOpen: boolean;
  setIsStoreSelectorOpen: (open: boolean) => void;
  openStoreSelector: () => void;
  closeStoreSelector: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && STORES.some((s) => s.id === stored)) {
        return stored;
      }
    } catch {
      // localStorage may fail in private mode
    }
    return null;
  });

  const [isStoreSelectorOpen, setIsStoreSelectorOpen] = useState(false);

  // Derive active Store object
  const selectedStore = useMemo(() => {
    if (!selectedStoreId) return null;
    return STORES.find((s) => s.id === selectedStoreId) || null;
  }, [selectedStoreId]);

  // Update selection & persist
  const selectStore = useCallback((storeId: string | null) => {
    if (!storeId) {
      setSelectedStoreId(null);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return;
    }

    const exists = STORES.some((s) => s.id === storeId);
    if (exists) {
      setSelectedStoreId(storeId);
      try {
        localStorage.setItem(STORAGE_KEY, storeId);
      } catch {
        // ignore
      }
    }
  }, []);

  const clearStore = useCallback(() => {
    selectStore(null);
  }, [selectStore]);

  const openStoreSelector = useCallback(() => {
    setIsStoreSelectorOpen(true);
  }, []);

  const closeStoreSelector = useCallback(() => {
    setIsStoreSelectorOpen(false);
  }, []);

  // Sync state if storage event occurs in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const newId = e.newValue;
        if (newId && STORES.some((s) => s.id === newId)) {
          setSelectedStoreId(newId);
        } else {
          setSelectedStoreId(null);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        selectedStoreId,
        selectedStore,
        selectStore,
        clearStore,
        isStoreSelectorOpen,
        setIsStoreSelectorOpen,
        openStoreSelector,
        closeStoreSelector
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useSelectedStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useSelectedStore must be used within a StoreProvider');
  }
  return context;
};
