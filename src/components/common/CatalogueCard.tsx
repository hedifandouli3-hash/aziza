import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen } from 'lucide-react';
import { Badge } from './Badge';
import type { Catalogue } from '../../types';

interface CatalogueCardProps {
  catalogue: Catalogue;
}

export const CatalogueCard: React.FC<CatalogueCardProps> = ({ catalogue }) => {
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
    <div className="group bg-white rounded-2xl border border-gray-150 p-3 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image & Badge */}
        <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            <Badge type={getBadgeType(catalogue.status)}>
              {catalogue.statusLabel}
            </Badge>
          </div>
          {catalogue.highlightDiscount && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-amber-400 text-gray-900 font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
                {catalogue.highlightDiscount}
              </span>
            </div>
          )}
          <img
            src={catalogue.coverImage}
            alt={catalogue.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-gray-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
              <BookOpen className="w-3.5 h-3.5 text-[#E30613]" /> Feuilleter
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-1">
          <h3 className="font-bold text-base text-gray-900 group-hover:text-[#E30613] transition-colors leading-tight">
            {catalogue.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{catalogue.period}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
            {catalogue.subtitle}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-2">
        <Link
          to={`/catalogues/${catalogue.id}`}
          className="w-full py-2.5 px-4 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.98]"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Voir le catalogue (Interactif)</span>
        </Link>
      </div>
    </div>
  );
};
