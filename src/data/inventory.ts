import type { StoreInventoryRecord } from '../types';

export const INVENTORY_DISCLAIMER =
  "Données d'inventaire et disponibilités simulées localement à titre indicatif pour ce prototype de démonstration UI/UX.";

/**
 * Structured local mock inventory mapping product IDs to store IDs.
 * Contains a realistic mix of available and unavailable products across the 12 AZIZA stores.
 * Also supports optional store-specific prices and promotional discounts.
 */
export const STORE_INVENTORY: StoreInventoryRecord[] = [
  // =========================================================================
  // 1. AZIZA Tunis Centre (id: 'tunis-centre') - No butchery
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'tunis-centre', isAvailable: false }, // Store has no fresh butchery
  { productId: 'concentre-tomate-sicam-800g', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'tunis-centre', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'tunis-centre', isAvailable: false }, // Compact city store out of bulk packs

  // =========================================================================
  // 2. AZIZA Ariana (id: 'ariana') - Flagship store, full fresh services
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'ariana', isAvailable: true },
  {
    productId: 'lait-delice-1l',
    storeId: 'ariana',
    isAvailable: true,
    storePrice: 2.650,
    storeOldPrice: 2.850,
    storeDiscountPercent: 7,
    isStorePromo: true
  },
  { productId: 'pates-warda-500g', storeId: 'ariana', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'ariana', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'ariana', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'ariana', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'ariana', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'ariana', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'ariana', isAvailable: false }, // Temporarily awaiting daily morning delivery
  { productId: 'harissa-berbere-sicam-380g', storeId: 'ariana', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'ariana', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'ariana', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'ariana', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'ariana', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'ariana', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'ariana', isAvailable: true },

  // =========================================================================
  // 3. AZIZA Sousse (id: 'sousse') - Regional flagship near Sahel
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'sousse', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'sousse', isAvailable: true },
  {
    productId: 'pates-warda-500g',
    storeId: 'sousse',
    isAvailable: true,
    storePrice: 1.050,
    storeOldPrice: 1.190,
    storeDiscountPercent: 12,
    isStorePromo: true
  },
  { productId: 'nescafe-classic-200g', storeId: 'sousse', isAvailable: false },
  { productId: 'huile-ghalia-1l', storeId: 'sousse', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'sousse', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'sousse', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'sousse', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'sousse', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'sousse', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'sousse', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'sousse', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'sousse', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'sousse', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'sousse', isAvailable: false },
  { productId: 'couches-peaudouce-t4', storeId: 'sousse', isAvailable: true },

  // =========================================================================
  // 4. AZIZA Sfax (id: 'sfax') - Sfax Avenue 14 Janvier
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'sfax', isAvailable: false },
  { productId: 'lait-delice-1l', storeId: 'sfax', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'sfax', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'sfax', isAvailable: true },
  {
    productId: 'huile-ghalia-1l',
    storeId: 'sfax',
    isAvailable: true,
    storePrice: 4.290,
    storeOldPrice: 4.600,
    storeDiscountPercent: 7,
    isStorePromo: true
  },
  { productId: 'lilas-lessive-3kg', storeId: 'sfax', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'sfax', isAvailable: false },
  { productId: 'viande-bovine-1kg', storeId: 'sfax', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'sfax', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'sfax', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'sfax', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'sfax', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'sfax', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'sfax', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'sfax', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'sfax', isAvailable: false },

  // =========================================================================
  // 5. AZIZA Lafayette (id: 'tunis-lafayette') - Compact city center store
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'tunis-lafayette', isAvailable: false },
  { productId: 'huile-ghalia-1l', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'tunis-lafayette', isAvailable: false },
  { productId: 'thon-sidi-daoud-160g', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'tunis-lafayette', isAvailable: false }, // No fresh butchery
  { productId: 'concentre-tomate-sicam-800g', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'tunis-lafayette', isAvailable: false },
  { productId: 'fromage-president-24p', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'tunis-lafayette', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'tunis-lafayette', isAvailable: false },

  // =========================================================================
  // 6. AZIZA El Manar 2 (id: 'el-manar')
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'el-manar', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'el-manar', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'el-manar', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'el-manar', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'el-manar', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'el-manar', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'el-manar', isAvailable: false },
  { productId: 'viande-bovine-1kg', storeId: 'el-manar', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'el-manar', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'el-manar', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'el-manar', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'el-manar', isAvailable: false },
  { productId: 'yaourt-delice-brasse', storeId: 'el-manar', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'el-manar', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'el-manar', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'el-manar', isAvailable: true },

  // =========================================================================
  // 7. AZIZA La Marsa (id: 'la-marsa')
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'la-marsa', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'la-marsa', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'la-marsa', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'la-marsa', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'la-marsa', isAvailable: false },
  { productId: 'lilas-lessive-3kg', storeId: 'la-marsa', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'la-marsa', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'la-marsa', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'la-marsa', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'la-marsa', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'la-marsa', isAvailable: true },
  {
    productId: 'fromage-president-24p',
    storeId: 'la-marsa',
    isAvailable: true,
    storePrice: 5.190,
    storeOldPrice: 5.800,
    storeDiscountPercent: 11,
    isStorePromo: true
  },
  { productId: 'yaourt-delice-brasse', storeId: 'la-marsa', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'la-marsa', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'la-marsa', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'la-marsa', isAvailable: true },

  // =========================================================================
  // 8. AZIZA Nabeul (id: 'nabeul') - No butchery
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'nabeul', isAvailable: false },
  { productId: 'lait-delice-1l', storeId: 'nabeul', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'nabeul', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'nabeul', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'nabeul', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'nabeul', isAvailable: false },
  { productId: 'thon-sidi-daoud-160g', storeId: 'nabeul', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'nabeul', isAvailable: false }, // No fresh butchery
  { productId: 'concentre-tomate-sicam-800g', storeId: 'nabeul', isAvailable: true },
  {
    productId: 'harissa-berbere-sicam-380g',
    storeId: 'nabeul',
    isAvailable: true,
    storePrice: 1.850,
    storeOldPrice: 2.100,
    storeDiscountPercent: 12,
    isStorePromo: true
  },
  { productId: 'eau-safia-pack', storeId: 'nabeul', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'nabeul', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'nabeul', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'nabeul', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'nabeul', isAvailable: false },
  { productId: 'couches-peaudouce-t4', storeId: 'nabeul', isAvailable: true },

  // =========================================================================
  // 9. AZIZA Bizerte (id: 'bizerte')
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'bizerte', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'bizerte', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'bizerte', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'bizerte', isAvailable: false },
  { productId: 'huile-ghalia-1l', storeId: 'bizerte', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'bizerte', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'bizerte', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'bizerte', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'bizerte', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'bizerte', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'bizerte', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'bizerte', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'bizerte', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'bizerte', isAvailable: false },
  { productId: 'shampoing-cadum-400ml', storeId: 'bizerte', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'bizerte', isAvailable: false },

  // =========================================================================
  // 10. AZIZA Monastir (id: 'monastir')
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'monastir', isAvailable: true },
  { productId: 'lait-delice-1l', storeId: 'monastir', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'monastir', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'monastir', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'monastir', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'monastir', isAvailable: false },
  { productId: 'thon-sidi-daoud-160g', storeId: 'monastir', isAvailable: false },
  { productId: 'viande-bovine-1kg', storeId: 'monastir', isAvailable: false },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'monastir', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'monastir', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'monastir', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'monastir', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'monastir', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'monastir', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'monastir', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'monastir', isAvailable: true },

  // =========================================================================
  // 11. AZIZA Kairouan (id: 'kairouan') - No butchery
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'kairouan', isAvailable: false },
  { productId: 'lait-delice-1l', storeId: 'kairouan', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'kairouan', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'kairouan', isAvailable: true },
  { productId: 'huile-ghalia-1l', storeId: 'kairouan', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'kairouan', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'kairouan', isAvailable: true },
  { productId: 'viande-bovine-1kg', storeId: 'kairouan', isAvailable: false }, // No fresh butchery
  { productId: 'concentre-tomate-sicam-800g', storeId: 'kairouan', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'kairouan', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'kairouan', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'kairouan', isAvailable: false },
  { productId: 'yaourt-delice-brasse', storeId: 'kairouan', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'kairouan', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'kairouan', isAvailable: false },
  { productId: 'couches-peaudouce-t4', storeId: 'kairouan', isAvailable: false },

  // =========================================================================
  // 12. AZIZA Gabès (id: 'gabes')
  // =========================================================================
  { productId: 'banane-le-kg', storeId: 'gabes', isAvailable: false },
  { productId: 'lait-delice-1l', storeId: 'gabes', isAvailable: true },
  { productId: 'pates-warda-500g', storeId: 'gabes', isAvailable: true },
  { productId: 'nescafe-classic-200g', storeId: 'gabes', isAvailable: false },
  { productId: 'huile-ghalia-1l', storeId: 'gabes', isAvailable: true },
  { productId: 'lilas-lessive-3kg', storeId: 'gabes', isAvailable: true },
  { productId: 'thon-sidi-daoud-160g', storeId: 'gabes', isAvailable: false },
  { productId: 'viande-bovine-1kg', storeId: 'gabes', isAvailable: true },
  { productId: 'concentre-tomate-sicam-800g', storeId: 'gabes', isAvailable: true },
  { productId: 'harissa-berbere-sicam-380g', storeId: 'gabes', isAvailable: true },
  { productId: 'eau-safia-pack', storeId: 'gabes', isAvailable: true },
  { productId: 'fromage-president-24p', storeId: 'gabes', isAvailable: true },
  { productId: 'yaourt-delice-brasse', storeId: 'gabes', isAvailable: true },
  { productId: 'couscous-diari-1kg', storeId: 'gabes', isAvailable: true },
  { productId: 'shampoing-cadum-400ml', storeId: 'gabes', isAvailable: true },
  { productId: 'couches-peaudouce-t4', storeId: 'gabes', isAvailable: false }
];

/**
 * Fast lookup map: key is `${storeId}::${productId}`
 */
const INVENTORY_MAP = new Map<string, StoreInventoryRecord>();
for (const item of STORE_INVENTORY) {
  INVENTORY_MAP.set(`${item.storeId}::${item.productId}`, item);
}

/**
 * Returns the inventory record for a specific store and product.
 * If storeId is null or not found, returns null.
 */
export function getProductStoreData(
  productId: string,
  storeId: string | null
): StoreInventoryRecord | null {
  if (!storeId) return null;
  return INVENTORY_MAP.get(`${storeId}::${productId}`) || null;
}

/**
 * Returns all inventory records for a given store.
 */
export function getStoreInventory(storeId: string): StoreInventoryRecord[] {
  return STORE_INVENTORY.filter((item) => item.storeId === storeId);
}
