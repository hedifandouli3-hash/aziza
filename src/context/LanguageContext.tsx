import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isArabic: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    products: 'Produits',
    catalogues: 'Catalogues',
    stores: 'Nos magasins',
    about: 'À propos',
    contact: 'Contact',
    searchPlaceholder: 'Rechercher un produit, une marque...',
    viewCatalogue: 'Voir le catalogue',
    viewAllOffers: 'Voir tout',
    offersOfTheMoment: 'Nos offres du moment',
    currentCatalogues: 'Nos catalogues',
    consultAllOffers: 'Consultez toutes nos offres',
    findStore: 'Trouvez le magasin AZIZA le plus proche de chez vous',
    locateStore: 'Localiser un magasin',
    storeAvailability: 'Disponibilité en magasin',
    all: 'Tous',
    current: 'En cours',
    upcoming: 'À venir',
    previous: 'Précédents',
    help: 'Aide'
  },
  ar: {
    products: 'المنتجات',
    catalogues: 'الكتالوجات',
    stores: 'مغازاتنا',
    about: 'من نحن',
    contact: 'اتصل بنا',
    searchPlaceholder: 'ابحث عن منتج، علامة تجارية...',
    viewCatalogue: 'تصفح الكتالوج',
    viewAllOffers: 'عرض الكل',
    offersOfTheMoment: 'عروض اللحظة',
    currentCatalogues: 'كتالوجاتنا',
    consultAllOffers: 'اطلع على جميع عروضنا وتخفيضاتنا',
    findStore: 'ابحث عن أقرب مغازة عزيزة إليك',
    locateStore: 'تحديد موقع مغازة',
    storeAvailability: 'التوفر في المغازة',
    all: 'الكل',
    current: 'الحالي',
    upcoming: 'القادم',
    previous: 'السابق',
    help: 'مساعدة'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isArabic = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isArabic, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
