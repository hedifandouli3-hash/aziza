import React from 'react';
import { Link } from 'react-router-dom';
import {
  Store as StoreIcon,
  MapPin,
  Heart,
  TrendingDown,
  ShoppingBag,
  ArrowRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_CONTACT_INFO } from '../data/navigation';

export const AboutPage: React.FC = () => {
  const { isArabic } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full">
          <StoreIcon className="w-3.5 h-3.5" />
          <span>{isArabic ? 'من نحن ؟' : 'Qui sommes-nous ?'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          {isArabic
            ? 'عزيزة، مغازات القرب في قلب الحياة اليومية للتونسيين'
            : 'AZIZA, le supermarché de proximité au cœur du quotidien des Tunisiens'}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {isArabic
            ? 'انطلقت عزيزة من فكرة تمكين جميع العائلات التونسية من اقتناء المواد الاستهلاكية بأعدل الأسعار، وتعتبر اليوم أول شبكة مغازات قرب ديسكاونت في تونس.'
            : 'Née de la volonté de rendre accessible à tous les foyers tunisiens des produits de grande consommation au prix le plus juste, AZIZA est aujourd\'hui le premier réseau de magasins discount de quartier en Tunisie.'}
        </p>
      </div>

      {/* Key Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-center">
          <div className="text-3xl sm:text-4xl font-black text-[#E30613]">{COMPANY_CONTACT_INFO.storeCount}</div>
          <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
            {isArabic ? 'مغازة في تونس' : 'Magasins en Tunisie'}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {isArabic ? 'متواجدون في أحيائكم' : 'Présents dans tous vos quartiers'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-center">
          <div className="text-3xl sm:text-4xl font-black text-[#E30613]">{COMPANY_CONTACT_INFO.governoratesCount}</div>
          <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
            {isArabic ? 'ولاية مغطاة' : 'Gouvernorats couverts'}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {isArabic ? 'من الشمال إلى الجنوب' : 'Du Nord au Sud de la Tunisie'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-center">
          <div className="text-3xl sm:text-4xl font-black text-[#E30613]">{COMPANY_CONTACT_INFO.employeesCount}</div>
          <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
            {isArabic ? 'عون وإطار' : 'Collaborateurs'}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {isArabic ? 'فريق مجند لخدمتكم' : 'Une équipe dévouée à votre service'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-center">
          <div className="text-3xl sm:text-4xl font-black text-[#E30613]">100%</div>
          <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
            {isArabic ? 'تونسي 100%' : 'Engagement Tunisien'}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {isArabic ? 'رأس مال وشراكات محلية' : 'Groupe Slama & partenaires locaux'}
          </p>
        </div>
      </div>

      {/* Story & Philosophy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xs">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase text-[#E30613] tracking-wider">
            {isArabic ? 'رسالتنا' : 'Notre Mission'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            {isArabic
              ? 'أسعار تفرح العائلة كل يوم دون أي مساومة على الجودة'
              : 'Des prix qui font plaisir, chaque jour, sans compromis sur la qualité'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isArabic
              ? 'يرتكز مفهوم عزيزة على الفعالية والتحكم في تكاليف اللوجستيك والتوزيع لنقدم للمواطن التونسي أوفر الأسعار.'
              : 'Chez AZIZA, notre concept repose sur un modèle d\'efficacité rigoureuse : éliminer les coûts superflus de logistique et d\'intermédiation pour répercuter directement ces économies sur le ticket de caisse de nos clients.'}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isArabic
              ? 'نختار أشهر العلامات التونسية (ديليس، وردة، سيكام، ليلاس، غالية، صافية...) لتأمين قفة العائلة بأقل كلفة.'
              : 'Nous sélectionnons les marques tunisiennes les plus réputées (Délice, Warda, Sicam, Lilas, Ghalia, Safia...) ainsi que nos gammes exclusives pour offrir aux familles un panier complet au tarif le plus avantageux.'}
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/catalogues"
              className="px-5 py-2.5 bg-[#E30613] hover:bg-[#C0040F] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>{isArabic ? 'اكتشف عروضنا' : 'Découvrir nos promotions'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
            alt="Magasin AZIZA et rayons frais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
            <span className="text-white font-bold text-sm">
              Proximité • Qualité • Pouvoir d&apos;achat
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of AZIZA */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {isArabic ? 'أركان عملنا الأساسية' : 'Nos 4 Piliers Fondamentaux'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isArabic ? 'القيم التي توجه فريق عزيزة يومياً' : 'Les valeurs qui guident chaque collaborateur AZIZA au quotidien'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">
              {isArabic ? 'القدرة الشرائية' : 'Le Pouvoir d\'Achat'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isArabic
                ? 'عمل يومي ضد التضخم للحفاظ على ميزانية العائلات التونسية.'
                : 'Nous menons une bataille quotidienne contre l\'inflation pour préserver le budget des ménages tunisiens.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">
              {isArabic ? 'الطراوة والجودة' : 'Fraîcheur & Arrivage'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isArabic
                ? 'وصول صباحي للغلال، الخضر، اللحوم الطازجة والخبز المطهو على عين المكان.'
                : 'Des arrivages matinaux de fruits, légumes, viandes fraîches et pains pétris et cuits sur place.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">
              {isArabic ? 'دعم المنتوج المحلي' : 'Soutien au Terroir'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isArabic
                ? 'أكثر من 85% من منتجاتنا تصنع أو تنتج في تونس من قبل شركاء ثقة.'
                : 'Plus de 85% de nos références sont produites ou transformées en Tunisie par des partenaires de confiance.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">
              {isArabic ? 'القرب الحقيقي' : 'Vraie Proximité'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isArabic
                ? 'مغازات قريبة منكم لشراء سريع، مريح وممتع.'
                : 'Des magasins à taille humaine, proches de chez vous, pour des courses simples, rapides et agréables.'}
            </p>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500 flex items-center justify-center gap-2 max-w-xl mx-auto text-center">
          <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>
            {isArabic
              ? 'موقع تجريبي تفاعلي للواجهة الأمامية فقط (Frontend-only).'
              : 'Prototype frontend UI/UX autonome — fonctionne sans serveur distant ni API.'}
          </span>
        </div>
      </div>
    </div>
  );
};
