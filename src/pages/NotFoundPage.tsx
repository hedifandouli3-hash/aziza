import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      <div className="space-y-2">
        <span className="text-6xl font-black text-[#E30613]">404</span>
        <h1 className="text-2xl font-black text-gray-900">Page introuvable</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée. Vous pouvez retourner à l&apos;accueil ou explorer nos rayons.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l&apos;accueil</span>
        </Link>
        <Link
          to="/produits"
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explorer les rayons</span>
        </Link>
      </div>
    </div>
  );
};
