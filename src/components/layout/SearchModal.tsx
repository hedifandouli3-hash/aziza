import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Tag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p: Product) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (productId: string) => {
    navigate(`/produits/${productId}`);
    onClose();
  };

  const handleSearchAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/produits?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchAll} className="relative border-b border-gray-150 flex items-center px-4">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une marque (ex: Warda, Délice, Huile...)"
            className="w-full py-4 pl-3 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-semibold text-gray-400 hover:text-gray-700 px-2 py-1 bg-gray-100 rounded-lg"
          >
            Échap
          </button>
        </form>

        {/* Results / Suggestions */}
        <div className="max-h-96 overflow-y-auto p-3">
          {query.trim() === '' ? (
            <div className="p-4 space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Recherches populaires
              </div>
              <div className="flex flex-wrap gap-2">
                {['Lait Délice', 'Pâtes Warda', 'Huile Ghalia', 'Thon Sidi Daoud', 'Lessive Lilas', 'Banane'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-[#E30613] text-gray-700 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-gray-400" />
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 flex items-center justify-between">
                <span>{results.length} produit(s) trouvé(s)</span>
                <button
                  type="button"
                  onClick={handleSearchAll}
                  className="text-[#E30613] hover:underline flex items-center gap-1"
                >
                  Tout voir <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {results.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.brand} • {product.packageSize}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#E30613]">
                      {product.price.toFixed(3)} DT
                    </div>
                    {product.oldPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        {product.oldPrice.toFixed(3)} DT
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">Aucun produit ne correspond à &quot;{query}&quot;</p>
              <p className="text-xs text-gray-400 mt-1">
                Essayez un autre mot-clé ou consultez nos rayons.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
