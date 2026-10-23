import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATALOGUES } from '../data/catalogues';
import { CatalogueViewer } from '../components/catalogue/CatalogueViewer';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import type { Catalogue } from '../types';

export const CatalogueReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find the selected catalogue or default to the first active one
  const catalogue = CATALOGUES.find((c: Catalogue) => c.id === id) || CATALOGUES[0];

  if (!catalogue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-[#E30613] mx-auto mb-3" />
        <h1 className="text-xl font-bold text-gray-900">Catalogue introuvable</h1>
        <p className="text-sm text-gray-500 mt-1">
          Le catalogue demandé n&apos;est pas disponible actuellement.
        </p>
        <Link
          to="/catalogues"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E30613] text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux catalogues
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Link to="/" className="hover:text-[#E30613]">
          Accueil
        </Link>
        <span>/</span>
        <Link to="/catalogues" className="hover:text-[#E30613]">
          Catalogues
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-xs">{catalogue.title}</span>
      </nav>

      {/* Interactive Catalogue Reader */}
      <CatalogueViewer catalogue={catalogue} />

      {/* Reader Guidance Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 bg-white p-4 rounded-2xl border border-gray-150">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#E30613]" />
          <span>
            Feuilleter : Utilisez les flèches du clavier ou les boutons latéraux pour tourner les pages.
          </span>
        </div>
        <div>
          <Link to="/catalogues" className="text-[#E30613] font-bold hover:underline">
            Voir tous les autres catalogues &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
