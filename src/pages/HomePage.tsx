import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedOffers } from '../components/home/FeaturedOffers';
import { PromoCards } from '../components/home/PromoCards';
import { ShieldCheck, Truck, Sparkles, HeartHandshake, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { isArabic } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
      {/* 1. Hero Promotional Banner */}
      <HeroBanner />

      {/* 2. Supermarket Grocery Categories */}
      <CategoryGrid />

      {/* 3. Featured Offers of the moment (Nos offres du moment) */}
      <FeaturedOffers />

      {/* 4. Promotional Cards (Catalogues & Magasins) */}
      <PromoCards />

      {/* 5. AZIZA Commitments Section */}
      <section className="my-10 bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase text-[#E30613] tracking-wider">
            {isArabic ? 'التزامات عزيزة' : 'Engagements AZIZA'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {isArabic ? 'لماذا تختار مغازات عزيزة؟' : 'Pourquoi choisir AZIZA ?'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {isArabic
              ? 'منذ انطلاقتنا في تونس، نسعى جاهدين لتقديم أفضل علاقة بين الجودة والسعر لكل عائلة تونسية.'
              : 'Depuis notre création en Tunisie, nous nous efforçons d\'offrir le meilleur rapport qualité-prix à chaque foyer tunisien.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E30613] flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {isArabic ? 'أسعار منخفضة يومياً' : 'Prix Bas Quotidiens'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isArabic
                ? 'هوامش ربح مدروسة لضمان أسعار تنافسية طوال السنة.'
                : 'Des marges réduites pour vous garantir les prix les plus compétitifs toute l\'année.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E30613] flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {isArabic ? 'وصول طازج كل صباح' : 'Arrivage Quotidien'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isArabic
                ? 'خضر، غلال، لحوم طازجة وخبز ساخن يخبز في المغازة.'
                : 'Légumes, fruits, viandes fraîches et pains chauds approvisionnés chaque matin.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E30613] flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {isArabic ? 'دعم المنتوج التونسي' : 'Soutien aux Producteurs'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isArabic
                ? 'أولوية للمصنعين والفلاحين التونسيين لدعم الاقتصاد الوطني.'
                : 'Privilégier les marques tunisiennes et l\'agriculture locale pour soutenir notre économie.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E30613] flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {isArabic ? 'قرب حقيقي من المواطن' : 'Vraie Proximité'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isArabic
                ? 'أكثر من 400 مغازة حي لقضاء حاجياتكم بسرعة بالقرب من منازلكم.'
                : 'Plus de 400 magasins de quartier pour des courses rapides à deux pas de chez vous.'}
            </p>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="mt-8 p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500 flex items-center justify-center gap-2 max-w-xl mx-auto text-center">
          <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>
            {isArabic
              ? 'موقع تجريبي تفاعلي للواجهة الأمامية فقط (Frontend-only) — لا يتطلب أي خادم خارجي.'
              : 'Prototype UI/UX interactif purement frontend — fonctionne 100% dans le navigateur sans backend.'}
          </span>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/a-propos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30613] hover:underline"
          >
            {isArabic ? 'اكتشف المزيد عن تاريخنا ←' : 'En savoir plus sur notre histoire →'}
          </Link>
        </div>
      </section>
    </div>
  );
};
