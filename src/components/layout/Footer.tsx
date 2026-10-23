import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Info } from 'lucide-react';
import { Logo } from '../common/Logo';
import { FOOTER_SECTIONS, COMPANY_CONTACT_INFO } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { isArabic } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-700">
      {/* Top Banner / Perks */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-red-100/70 text-[#E30613] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  {isArabic ? `أكثر من 500 مغازة` : `Plus de 500 magasins`}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isArabic ? 'في كامل تراب الجمهورية التونسية' : 'Partout en Tunisie pour être toujours plus proche de vous'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-red-100/70 text-[#E30613] flex items-center justify-center flex-shrink-0">
                <span className="font-black text-lg text-[#E30613]">%</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  {isArabic ? 'أسعار تفرح العائلة' : 'Des prix qui font plaisir'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isArabic ? 'تخفيضات مستمرة وحفاظ على القدرة الشرائية' : 'Promotions régulières et pouvoir d\'achat préservé'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-red-100/70 text-[#E30613] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  {isArabic ? 'خدمة الحرفاء في الاستماع' : 'Service client à votre écoute'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {COMPANY_CONTACT_INFO.phoneDisplay} ({COMPANY_CONTACT_INFO.openingHours})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              {isArabic
                ? 'عزيزة هي شبكة المغازات المفضلة للعائلات التونسية، تلتزم بتقديم أفضل جودة بأسعار مدروسة كل يوم.'
                : 'AZIZA est l\'enseigne de supermarchés de proximité préférée des familles tunisiennes. Nous nous engageons à vous offrir chaque jour des produits de qualité supérieure aux prix les plus avantageux du marché.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#E30613] hover:text-white flex items-center justify-center transition-colors text-gray-600"
                aria-label="Facebook AZIZA"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#E30613] hover:text-white flex items-center justify-center transition-colors text-gray-600"
                aria-label="Instagram AZIZA"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#E30613] hover:text-white flex items-center justify-center transition-colors text-gray-600"
                aria-label="YouTube AZIZA"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Dynamic Footer Sections from centralized data */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
                {isArabic ? section.titleAr : section.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.to} className="hover:text-[#E30613] transition-colors">
                      {isArabic ? link.labelAr : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Informations */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
              {isArabic ? 'معلومات الاتصال' : 'Contact AZIZA'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E30613] flex-shrink-0 mt-0.5" />
                <span>{isArabic ? COMPANY_CONTACT_INFO.addressAr : COMPANY_CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E30613] flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-900">{COMPANY_CONTACT_INFO.tollFreeDisplay}</span>
                  <div className="text-[11px] text-gray-500">
                    Siège :{' '}
                    <a href={`tel:${COMPANY_CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#E30613]">
                      {COMPANY_CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E30613] flex-shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT_INFO.email}`} className="hover:text-[#E30613]">
                  {COMPANY_CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="mt-10 p-3.5 rounded-2xl bg-gray-100/80 border border-gray-200 text-xs text-gray-600 flex items-center gap-3">
          <Info className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong className="font-bold">Prototype Frontend Démonstratif :</strong> Cette application est une interface utilisateur 100% frontend sans backend ni serveur de données. Toutes les données présentées (produits, prix en DT, disponibilités et magasins) proviennent de fichiers statiques locaux à titre de démonstration UI/UX.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>
            &copy; 2026 AZIZA Tunisie. Prototype UI/UX responsive frontend-only.
          </p>
          <div className="flex items-center gap-1">
            <span>Fait avec</span>
            <Heart className="w-3.5 h-3.5 text-[#E30613] fill-[#E30613]" />
            <span>pour les consommateurs tunisiens</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
