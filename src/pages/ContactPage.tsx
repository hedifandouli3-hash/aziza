import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Info
} from 'lucide-react';
import { STORES } from '../data/stores';
import { COMPANY_CONTACT_INFO } from '../data/navigation';
import type { Store } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'information',
    storeId: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Veuillez saisir votre nom et prénom';
    }
    if (!formData.email.trim()) {
      errs.email = 'Veuillez saisir une adresse email valide';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Format d\'email non valide';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Veuillez renseigner un numéro de téléphone';
    } else if (!/^[0-9\s+]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Numéro de téléphone non valide (8 chiffres en Tunisie)';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Votre message doit contenir au moins 10 caractères';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'Quels sont les horaires d\'ouverture habituels des magasins AZIZA ?',
      a: 'La majorité de nos magasins AZIZA sont ouverts 7 jours sur 7, généralement du lundi au dimanche de 8h00 ou 8h30 jusqu\'à 20h30 ou 21h00 selon les localités. Vous pouvez vérifier les horaires précis sur notre page "Nos magasins".'
    },
    {
      q: 'Quels sont les modes de paiement acceptés en caisse ?',
      a: 'Nous acceptons les paiements en espèces (Dinars Tunisiens) ainsi que toutes les cartes bancaires nationales tunisiennes (GIE Monétique Tunisie). Certains magasins acceptent également les bons d\'achat et tickets restaurant conventionnés.'
    },
    {
      q: 'Comment être informé des nouveaux catalogues et promotions AZIZA ?',
      a: 'Vous pouvez consulter l\'ensemble de nos flyers et catalogues directement en ligne sur ce site web dans la rubrique "Catalogues", ou suivre nos publications quotidiennes sur notre page Facebook officielle AZIZA Tunisie.'
    },
    {
      q: 'Comment postuler pour rejoindre les équipes AZIZA ?',
      a: 'Vous pouvez déposer votre CV directement auprès du responsable de votre magasin AZIZA le plus proche ou simuler l\'envoi d\'une candidature via ce formulaire en sélectionnant "Recrutement / Candidature".'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Service Client & Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Contactez-nous
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Coordonnées de démonstration pour ce prototype interactif AZIZA Tunisie et formulaire avec validation instantanée côté client.
        </p>
      </div>

      {/* Demonstration disclaimer */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Prototype de démonstration :</strong> Les numéros, horaires, adresses et emails ci-dessous sont présentés à titre indicatif pour la maquette frontend. Le formulaire ci-après fonctionne à 100% dans votre navigateur sans envoi réel de message ni traitement serveur.
        </span>
      </div>

      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30613] flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">Téléphone (Exemple)</h3>
            <p className="text-xs text-gray-500 mt-0.5">{COMPANY_CONTACT_INFO.openingHours}</p>
            <div className="mt-2 space-y-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Numéro Vert Indicatif :</span>
                <span className="text-base font-black text-[#E30613]">
                  {COMPANY_CONTACT_INFO.tollFree}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <span>Siège : </span>
                <span className="font-bold text-gray-700">
                  {COMPANY_CONTACT_INFO.phoneDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30613] flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">Email (Démonstration)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Assistance générale prototype</p>
            <span className="text-sm font-bold text-[#E30613] mt-2 inline-block">
              {COMPANY_CONTACT_INFO.email}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30613] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">Siège Social (Exemple)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Direction Générale AZIZA</p>
            <p className="text-xs font-semibold text-gray-800 mt-2">
              {COMPANY_CONTACT_INFO.address}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on left, FAQ on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="text-xl font-black text-gray-900">Envoyez-nous un message</h2>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Validation Frontend
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Testez la validation du formulaire côté navigateur.
          </p>

          <div className="mb-6 p-3 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Note de démonstration :</strong> Ce formulaire fonctionne à 100% côté client sans serveur ni base de données. Les messages ne sont pas envoyés sur un serveur réel.
            </span>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">
                Validation locale réussie ! (Mode Démonstration)
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Toutes les règles de validation frontend ont été satisfaites pour <strong>{formData.fullName}</strong> ({formData.email}, {formData.phone}).
              </p>
              <div className="p-3 bg-white/80 rounded-xl text-[11px] text-emerald-700 max-w-sm mx-auto border border-emerald-200">
                Comme il s&apos;agit d&apos;un prototype frontend-only sans serveur de messagerie, aucune transmission réseau n&apos;a eu lieu.
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    subject: 'information',
                    storeId: '',
                    message: ''
                  });
                }}
                className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Tester une autre saisie
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom & Prénom */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="ex: Mohamed Ben Ali"
                    className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:bg-white ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-[#E30613]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ex: mohamed@email.tn"
                    className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:bg-white ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#E30613]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="ex: 71 123 456 / 98 123 456"
                    className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:bg-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#E30613]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#E30613]"
                  >
                    <option value="information">Demande d&apos;information générale</option>
                    <option value="reclamation">Réclamation concernant un produit</option>
                    <option value="magasin">Suggestion sur un magasin</option>
                    <option value="recrutement">Recrutement / Candidature</option>
                    <option value="partenariat">Partenariat & Fournisseurs</option>
                  </select>
                </div>
              </div>

              {/* Magasin concerné */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Magasin concerné (facultatif)
                </label>
                <select
                  value={formData.storeId}
                  onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#E30613]"
                >
                  <option value="">Sélectionnez un magasin si applicable</option>
                  {STORES.map((s: Store) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Votre Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre demande en détail..."
                  className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:bg-white resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-200 focus:border-[#E30613]'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-[#E30613] hover:bg-[#C0040F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Valider le formulaire (Démonstration)</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-[#E30613]" />
              <h2 className="text-base font-black text-gray-900">Foire Aux Questions (FAQ)</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-gray-800 hover:text-[#E30613] transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-[#E30613]' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social connection banner */}
          <div className="bg-red-50 p-6 rounded-3xl border border-red-150 text-center space-y-2">
            <span className="font-bold text-xs text-[#E30613]">Rejoignez la communauté AZIZA</span>
            <p className="text-xs text-gray-600">
              Retrouvez nos promotions en avant-première et nouveautés sur nos pages officielles.
            </p>
            <div className="pt-1 flex items-center justify-center gap-2 text-xs font-bold text-[#E30613]">
              <span>#AZIZATunisie</span> • <span>#DesPrixQuiFontPlaisir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
