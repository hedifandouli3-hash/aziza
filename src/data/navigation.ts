export interface NavItem {
  to: string;
  label: string;
  labelAr: string;
}

export interface FooterSection {
  title: string;
  titleAr: string;
  links: {
    label: string;
    labelAr: string;
    to: string;
  }[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { to: '/produits', label: 'Produits', labelAr: 'المنتجات' },
  { to: '/catalogues', label: 'Catalogues', labelAr: 'الكتالوجات' },
  { to: '/magasins', label: 'Nos magasins', labelAr: 'مغازاتنا' },
  { to: '/a-propos', label: 'À propos', labelAr: 'من نحن' },
  { to: '/contact', label: 'Contact', labelAr: 'اتصل بنا' }
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Nos Rayons',
    titleAr: 'أقسامنا',
    links: [
      { label: 'Fruits & Légumes', labelAr: 'غلال وخضر', to: '/produits?cat=fruits-legumes' },
      { label: 'Produits laitiers', labelAr: 'مشتقات الحليب', to: '/produits?cat=produits-laitiers' },
      { label: 'Épicerie tunisienne', labelAr: 'مواد غذائية', to: '/produits?cat=epicerie' },
      { label: 'Boissons & Eaux', labelAr: 'مشروبات ومياه', to: '/produits?cat=boissons' },
      { label: 'Entretien & Lessive', labelAr: 'مواد تنظيف', to: '/produits?cat=entretien' },
      { label: 'Hygiène & Beauté', labelAr: 'نظافة وعناية', to: '/produits?cat=hygiene-beaute' }
    ]
  },
  {
    title: 'Navigation',
    titleAr: 'التصفح',
    links: [
      { label: 'Accueil', labelAr: 'الرئيسية', to: '/' },
      { label: 'Tous les produits', labelAr: 'جميع المنتجات', to: '/produits' },
      { label: 'Catalogues & Flyers', labelAr: 'الكتالوجات والعروض', to: '/catalogues' },
      { label: 'Trouver un magasin', labelAr: 'البحث عن مغازة', to: '/magasins' },
      { label: 'Qui sommes-nous ?', labelAr: 'من نحن', to: '/a-propos' },
      { label: 'Nous contacter', labelAr: 'اتصل بنا', to: '/contact' }
    ]
  }
];

export const COMPANY_CONTACT_INFO = {
  name: 'Société Aziza de Commerce de Détail (Groupe Slama)',
  address: '22, Rue de l’Électricité, Z.I. Ben Arous, 2013 Ben Arous, Tunisie',
  addressAr: '22، نهج الكهرباء، المنطقة الصناعية بن عروس، 2013 بن عروس، تونس',
  phone: '+216 71 384 251',
  phoneDisplay: '+216 71 384 251',
  tollFree: '80 10 20 80',
  tollFreeDisplay: '80 10 20 80 (Numéro Vert)',
  email: 'contact@aziza.tn',
  openingHours: 'Lun - Sam, 8h30 - 19h00',
  openingHoursAr: 'الإثنين - السبت، 8:30 - 19:00',
  storeCount: '+500',
  governoratesCount: '24',
  employeesCount: '+3 500'
};
