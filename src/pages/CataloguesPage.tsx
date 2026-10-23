import React, { useState } from 'react';
import { CATALOGUES } from '../data/catalogues';
import { CatalogueCard } from '../components/common/CatalogueCard';
import { BookOpen, Sparkles, Filter, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Catalogue } from '../types';

export const CataloguesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'upcoming' | 'past'>('all');
  const { isArabic } = useLanguage();

  const filteredCatalogues = CATALOGUES.filter((item: Catalogue) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Introduction matching panel 2 */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isArabic ? 'الكتالوجات والعروض الترويجية' : 'Prospectus & Catalogues Officiels'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isArabic ? 'كتالوجاتنا وعروضنا' : 'Nos catalogues'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
          {isArabic
            ? 'اكتشفوا جميع عروضنا وتخفيضاتنا في مغازاتنا في كامل تراب الجمهورية التونسية. تصفحوا الكتالوج التفاعلي صفحة بصفحة.'
            : 'Découvrez toutes nos offres et promotions dans nos magasins à travers toute la Tunisie. Feuilletez nos dépliants interactifs page par page.'}
        </p>
      </div>

      {/* Demonstration Banner */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Démonstration UI/UX :</strong> Ces catalogues et dépliants sont des maquettes interactives de démonstration stockées localement. Cliquez sur un catalogue pour lancer le lecteur interactif en mode double-page.
        </span>
      </div>

      {/* Tabs Filter matching panel 2 */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#E30613] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isArabic ? 'الكل' : 'Tous'} ({CATALOGUES.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'current'
              ? 'bg-[#E30613] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isArabic ? 'الحالي' : 'En cours'} ({CATALOGUES.filter((c: Catalogue) => c.status === 'current').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#E30613] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isArabic ? 'القادم' : 'À venir'} ({CATALOGUES.filter((c: Catalogue) => c.status === 'upcoming').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-[#E30613] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isArabic ? 'السابق' : 'Précédents'} ({CATALOGUES.filter((c: Catalogue) => c.status === 'past').length})
        </button>
      </div>

      {/* Catalogues Grid */}
      {filteredCatalogues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCatalogues.map((catalogue: Catalogue) => (
            <CatalogueCard key={catalogue.id} catalogue={catalogue} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <Filter className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-sm font-bold">Aucun catalogue dans cette catégorie</p>
          <p className="text-xs text-gray-400 mt-1">Revenez bientôt pour de nouveaux arrivages.</p>
        </div>
      )}

      {/* Helpful note */}
      <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-5 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="font-bold">Astuce AZIZA :</strong> Les offres présentées dans nos catalogues sont valables dans la limite des stocks disponibles dans l&apos;ensemble des magasins AZIZA participants en Tunisie. Cliquez sur les articles pour voir leurs caractéristiques détaillées.
        </div>
      </div>
    </div>
  );
};
