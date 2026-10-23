import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  HelpCircle,
  ShoppingBag,
  Menu,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { useShoppingList } from '../../context/ShoppingListContext';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_NAV_ITEMS } from '../../data/navigation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const { totalItems, setIsOpen: setDrawerOpen } = useShoppingList();
  const { language, setLanguage, isArabic } = useLanguage();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/produits?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-150 shadow-2xs">
        {/* Top Promotional Announcement & Prototype Demonstration Bar */}
        <div className="bg-[#E30613] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>
            {isArabic
              ? 'نموذج تجريبي تفاعلي لموقع عزيزة تونس — تصفح العروض والكتالوجات'
              : 'Bons plans de la semaine : Découvrez les nouveaux arrivages et promotions en magasin !'}
          </span>
          <span className="bg-white/20 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full hidden sm:inline ml-1">
            Frontend Prototype
          </span>
          <Link
            to="/catalogues"
            className="underline hover:text-amber-200 transition-colors ml-1 hidden md:inline"
          >
            {isArabic ? 'تصفح الكتالوج ←' : 'Consulter le flyer →'}
          </Link>
        </div>

        {/* Primary Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          {/* Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Logo size="md" />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setSearchModalOpen(true)}
                placeholder={isArabic ? 'ابحث عن منتج، علامة تجارية...' : 'Rechercher un produit, une marque...'}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100/90 hover:bg-gray-100 focus:bg-white text-sm text-gray-800 placeholder-gray-400 rounded-full border border-transparent focus:border-red-300 focus:outline-hidden focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
                readOnly
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E30613] text-white p-1.5 rounded-full hover:bg-[#C0040F] transition-colors"
                title={isArabic ? 'بحث' : 'Rechercher'}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile search trigger button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Nos magasins link */}
            <Link
              to="/magasins"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#E30613] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <MapPin className="w-4 h-4 text-[#E30613]" />
              <span>{isArabic ? 'مغازاتنا' : 'Nos magasins'}</span>
            </Link>

            {/* Aide link */}
            <Link
              to="/contact"
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#E30613] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <HelpCircle className="w-4 h-4 text-gray-500" />
              <span>{isArabic ? 'مساعدة' : 'Aide'}</span>
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-xs font-bold text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-lg border border-gray-150 py-1 z-50 text-xs"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 font-medium ${
                      language === 'fr' ? 'text-[#E30613] font-bold' : 'text-gray-700'
                    }`}
                  >
                    Français (FR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ar')}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 font-medium ${
                      language === 'ar' ? 'text-[#E30613] font-bold' : 'text-gray-700'
                    }`}
                  >
                    عربي (AR)
                  </button>
                </div>
              )}
            </div>

            {/* Shopping List Drawer Trigger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#E30613] rounded-xl hover:bg-red-50/60 transition-colors"
              aria-label={isArabic ? 'قائمة مشترياتي' : 'Ma liste de courses'}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E30613] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <div className="hidden lg:block border-t border-gray-150 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left Nav items */}
            <div className="flex items-center gap-1">
              <Link
                to="/produits"
                className="flex items-center gap-2 py-3 px-4 text-xs font-bold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border-r border-gray-150 mr-2"
              >
                <Layers className="w-4 h-4 text-[#E30613]" />
                <span>{isArabic ? 'جميع الأقسام' : 'Tous les rayons'}</span>
              </Link>

              {MAIN_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `py-3 px-3 text-xs font-bold transition-colors rounded-lg ${
                      isActive
                        ? 'text-[#E30613] bg-red-50/70'
                        : 'text-gray-700 hover:text-[#E30613] hover:bg-gray-50'
                    }`
                  }
                >
                  {isArabic ? item.labelAr : item.label}
                </NavLink>
              ))}
            </div>

            {/* Right highlight CTA */}
            <div className="flex items-center gap-3">
              <Link
                to="/catalogues"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30613] hover:underline"
              >
                <span className="w-2 h-2 rounded-full bg-[#E30613] animate-ping" />
                <span>{isArabic ? 'الكتالوج الحالي (أكتوبر 2026)' : 'Flyer en cours (Octobre 2026)'}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
