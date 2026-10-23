import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Menu,
  ChevronDown,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_NAV_ITEMS } from '../../data/navigation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

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
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-2xs">
        {/* Top Promotional Announcement & Brand Banner */}
        <div className="bg-[#E30613] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>
            {isArabic
              ? 'تخفيضات أسبوعية متميزة في جميع مغازات عزيزة في كامل تراب الجمهورية'
              : 'Offres Choc de la Semaine : Découvrez les nouveaux arrivages et promotions en magasin !'}
          </span>
          <Link
            to="/catalogues"
            className="underline hover:text-amber-200 font-bold transition-colors ml-1 hidden sm:inline"
          >
            {isArabic ? 'تصفح الكتالوج ←' : 'Consulter le catalogue →'}
          </Link>
        </div>

        {/* Primary Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile hamburger & Logo */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo size="md" />
          </div>

          {/* Desktop Search Bar (Prominent & Accessible) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setSearchModalOpen(true)}
                placeholder={isArabic ? 'ابحث عن منتج، علامة تجارية (دليس، وردة، سيكام...)' : 'Rechercher un produit, une marque (Warda, Délice, Sicam...)'}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 rounded-full border border-gray-200 focus:border-[#E30613] focus:outline-hidden focus:ring-3 focus:ring-red-100 transition-all cursor-pointer"
                readOnly
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#E30613] text-white p-1.5 rounded-full hover:bg-[#C0040F] transition-colors"
                title={isArabic ? 'بحث' : 'Rechercher'}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile search trigger button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Nos magasins link */}
            <Link
              to="/magasins"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#E30613] transition-colors px-3 py-2 rounded-xl hover:bg-red-50/60"
            >
              <MapPin className="w-4 h-4 text-[#E30613]" />
              <span>{isArabic ? 'مغازاتنا' : 'Nos magasins'}</span>
            </Link>

            {/* Catalogues link */}
            <Link
              to="/catalogues"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#E30613] transition-colors px-3 py-2 rounded-xl hover:bg-red-50/60"
            >
              <BookOpen className="w-4 h-4 text-[#E30613]" />
              <span>{isArabic ? 'الكتالوجات' : 'Catalogues'}</span>
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-xs font-black text-gray-700 px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Changer de langue"
              >
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50 text-xs"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 font-bold ${
                      language === 'fr' ? 'text-[#E30613] bg-red-50/50' : 'text-gray-700'
                    }`}
                  >
                    Français (FR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ar')}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 font-bold ${
                      language === 'ar' ? 'text-[#E30613] bg-red-50/50' : 'text-gray-700'
                    }`}
                  >
                    عربي (AR)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <div className="hidden lg:block border-t border-gray-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left Nav items */}
            <div className="flex items-center gap-1 py-1">
              <Link
                to="/produits"
                className="flex items-center gap-2 py-2 px-3 text-xs font-bold text-gray-800 hover:text-[#E30613] hover:bg-gray-50 rounded-xl transition-colors border-r border-gray-200 mr-2"
              >
                <Layers className="w-4 h-4 text-[#E30613]" />
                <span>{isArabic ? 'جميع الأقسام' : 'Tous les rayons'}</span>
              </Link>

              {MAIN_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `py-2 px-3 text-xs font-bold transition-all rounded-xl ${
                      isActive
                        ? 'text-[#E30613] bg-red-50/80'
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
                to="/catalogues/catalogue-octobre-2026"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30613] hover:underline bg-red-50/60 px-3 py-1.5 rounded-full border border-red-200/60"
              >
                <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse" />
                <span>{isArabic ? 'كتالوج الخريف (أكتوبر 2026)' : 'Flyer Octobre 2026 en cours'}</span>
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
