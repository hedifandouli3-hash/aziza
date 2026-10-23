import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ShoppingBag, BookOpen, MapPin, Info, Phone, Globe, ChevronRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_NAV_ITEMS } from '../../data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, isArabic } = useLanguage();

  if (!isOpen) return null;

  const getIcon = (to: string) => {
    switch (to) {
      case '/produits':
        return ShoppingBag;
      case '/catalogues':
        return BookOpen;
      case '/magasins':
        return MapPin;
      case '/a-propos':
        return Info;
      case '/contact':
        return Phone;
      default:
        return ShoppingBag;
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Logo size="sm" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {MAIN_NAV_ITEMS.map((link) => {
              const Icon = getIcon(link.to);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors ${
                      isActive
                        ? 'bg-red-50 text-[#E30613] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{isArabic ? link.labelAr : link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer Area: Language & Help */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/70 space-y-3">
          {/* Language Switch */}
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <Globe className="w-4 h-4 text-gray-500" />
              <span>Langue / اللغة</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'fr'
                    ? 'bg-[#E30613] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Français
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'ar'
                    ? 'bg-[#E30613] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                عربي
              </button>
            </div>
          </div>

          {/* Quick Store Locator CTA */}
          <NavLink
            to="/magasins"
            onClick={onClose}
            className="w-full py-2.5 bg-[#E30613] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <MapPin className="w-4 h-4" />
            <span>{isArabic ? 'تحديد موقع مغازة عزيزة' : 'Localiser un magasin AZIZA'}</span>
          </NavLink>

          <div className="text-center text-[11px] text-gray-400">
            AZIZA Tunisie • Prototype Démonstration UI/UX
          </div>
        </div>
      </div>
    </div>
  );
};
