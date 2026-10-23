import React from 'react';
import { X, Trash2, Printer, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useShoppingList } from '../../context/ShoppingListContext';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router-dom';

export const ShoppingListDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, clearList, totalItems, totalPrice, isOpen, setIsOpen } =
    useShoppingList();
  const { isArabic } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  {isArabic ? 'قائمة مشترياتي' : 'Ma liste de courses'}
                </h2>
                <p className="text-xs text-gray-500">
                  {totalItems} {totalItems > 1 ? (isArabic ? 'منتجات مختارة' : 'articles sélectionnés') : (isArabic ? 'منتج مختار' : 'article sélectionné')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demonstration Notice */}
          <div className="px-4 py-2 bg-amber-50/60 border-b border-amber-100/80 text-[11px] text-amber-800 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>
              {isArabic
                ? 'قائمة محفوظة محلياً في المتصفح (localStorage) دون الحاجة لحساب.'
                : 'Liste sauvegardée localement dans votre navigateur (localStorage).'}
            </span>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-800 text-base">
                  {isArabic ? 'قائمتكم فارغة' : 'Votre liste est vide'}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  {isArabic
                    ? 'أضيفوا منتجات أو عروض من الكتالوج لإعداد مشترياتكم في مغازة عزيزة.'
                    : 'Ajoutez des produits ou des offres depuis le catalogue et préparez vos achats en magasin AZIZA.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 bg-[#E30613] text-white text-xs font-bold rounded-xl hover:bg-[#C0040F] transition-colors"
                >
                  {isArabic ? 'اكتشف العروض' : 'Découvrir les offres'}
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center gap-3 first:pt-0 last:pb-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-lg bg-gray-50 p-1 flex-shrink-0 border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/produits/${product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="font-bold text-xs text-gray-900 hover:text-[#E30613] truncate block"
                    >
                      {product.name}
                    </Link>
                    <div className="text-[11px] text-gray-500">
                      {product.packageSize} • {(product.price).toFixed(3)} DT/u
                    </div>
                    <div className="text-xs font-bold text-[#E30613] mt-0.5">
                      {(product.price * quantity).toFixed(3)} DT
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-700 shadow-2xs hover:bg-gray-200"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-700 shadow-2xs hover:bg-gray-200"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {isArabic ? 'المجموع المقدر في المغازة :' : 'Total estimé en magasin :'}
                </span>
                <span className="text-lg font-black text-[#E30613]">
                  {totalPrice.toFixed(3)} DT
                </span>
              </div>
              <div className="text-[11px] text-gray-400">
                * Les prix peuvent varier selon les stocks et les magasins participants.
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-gray-500" /> {isArabic ? 'طباعة' : 'Imprimer'}
                </button>
                <button
                  type="button"
                  onClick={clearList}
                  className="py-2.5 px-3 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> {isArabic ? 'تفريغ' : 'Vider'}
                </button>
              </div>

              <Link
                to="/magasins"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-[#E30613] hover:bg-[#C0040F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>{isArabic ? 'البحث عن مغازة عزيزة' : 'Trouver mon magasin AZIZA'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
