import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATALOGUES } from '../data/catalogues';
import { CatalogueViewer } from '../components/catalogue/CatalogueViewer';
import { ArrowLeft, AlertCircle, Calendar } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Badge } from '../components/common/Badge';
import type { Catalogue } from '../types';

export const CatalogueReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Look up exact catalogue by id from route params - do not fallback to arbitrary catalogue
  const catalogue = CATALOGUES.find((c: Catalogue) => c.id === id);

  // Unknown catalogue slug: clean, accessible not-found state
  if (!catalogue) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30613] flex items-center justify-center mb-4 shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Catalogue introuvable</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-md leading-relaxed">
          Le catalogue demandé (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{id}</code>) n&apos;existe pas ou a expiré.
        </p>
        <Link
          to="/catalogues"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#E30613] hover:bg-[#c20510] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Retourner aux catalogues
        </Link>
      </div>
    );
  }

  const getBadgeType = (status: Catalogue['status']) => {
    switch (status) {
      case 'current':
        return 'status-current';
      case 'upcoming':
        return 'status-upcoming';
      case 'past':
        return 'status-past';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="h-screen h-[100dvh] max-h-[100dvh] flex flex-col bg-[#0F172A] overflow-hidden">
      {/* =======================================================================
          COMPACT DEDICATED HEADER (H-11/H-12 SHRINK-0 FOR MAXIMUM READING VIEWPORT)
          ======================================================================= */}
      <header className="h-11 sm:h-12 shrink-0 bg-white border-b border-gray-200/90 shadow-2xs z-40 px-3 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Back to Catalogues */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <Link to="/" className="shrink-0" title="Accueil AZIZA">
            <Logo />
          </Link>

          <div className="h-5 w-[1px] bg-gray-200 hidden sm:block" />

          <Link
            to="/catalogues"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#E30613] px-2 py-1 rounded-lg hover:bg-red-50/70 transition-all shrink-0"
            title="Retourner à la liste des catalogues"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E30613]" />
            <span className="hidden sm:inline">Retour aux catalogues</span>
            <span className="sm:hidden">Catalogues</span>
          </Link>
        </div>

        {/* Center: Subtle Breadcrumb Navigation */}
        <nav aria-label="Fil d'Ariane" className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
          <Link to="/" className="hover:text-[#E30613] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/catalogues" className="hover:text-[#E30613] transition-colors">
            Catalogues
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold truncate max-w-xs">{catalogue.title}</span>
        </nav>

        {/* Right: Catalogue Title & Validity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-black text-gray-900 truncate max-w-[200px]">
              {catalogue.title}
            </div>
            <div className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>{catalogue.period}</span>
            </div>
          </div>

          <Badge type={getBadgeType(catalogue.status)}>
            {catalogue.statusLabel}
          </Badge>
        </div>
      </header>

      {/* =======================================================================
          MAIN VIEWER AREA - FILLS ALL REMAINING VIEWPORT HEIGHT EXACTLY
          ======================================================================= */}
      <main className="flex-1 min-h-0 w-full flex flex-col overflow-hidden p-1 sm:p-2">
        <CatalogueViewer catalogue={catalogue} />
      </main>
    </div>
  );
};
