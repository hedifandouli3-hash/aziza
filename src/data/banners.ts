export interface HeroSlide {
  id: number;
  tag: string;
  tagAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink: string;
  image: string;
  badge: string;
  badgeAr: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'Offres de la semaine',
    tagAr: 'عروض الأسبوع',
    title: 'Les meilleures offres pour votre quotidien',
    titleAr: 'أفضل العروض ليومياتكم وتخفيضات استثنائية',
    description: 'Des produits de qualité à prix toujours avantageux ! Découvrez les remises exclusives en magasin AZIZA.',
    descriptionAr: 'منتجات عالية الجودة بأسعار مناسبة دائماً! اكتشف التخفيضات الحصرية في جميع مغازات عزيزة.',
    ctaText: 'Voir le catalogue',
    ctaTextAr: 'تصفح الكتالوج',
    ctaLink: '/catalogues',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    badge: 'BONS PLANS cette semaine !',
    badgeAr: 'تخفيضات هذا الأسبوع !'
  },
  {
    id: 2,
    tag: 'Marché Frais',
    tagAr: 'سوق طازج',
    title: 'Fruits & Légumes frais de nos terroirs',
    titleAr: 'غلال وخضر طازجة من أراضينا التونسية',
    description: 'Sélection rigoureuse auprès des producteurs tunisiens du Cap Bon, de Béja et du Sahel.',
    descriptionAr: 'اختيار دقيق من الفلاحين التونسيين في الوطن القبلي، باجة والساحل بأسعار الفلاح.',
    ctaText: 'Découvrir le rayon',
    ctaTextAr: 'اكتشف القسم',
    ctaLink: '/produits?cat=fruits-legumes',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
    badge: '100% FRAÎCHEUR GARANTIE',
    badgeAr: '100% طازج ومضمون'
  },
  {
    id: 3,
    tag: 'Boucherie AZIZA',
    tagAr: 'قصابة عزيزة',
    title: 'Viandes locales découpées avec passion',
    titleAr: 'لحوم تونسية محلية مقطوعة يومياً بعناية',
    description: 'Bœuf, volaille et agneau contrôlés et préparés chaque jour par nos maîtres bouchers.',
    descriptionAr: 'لحوم بقر، دواجن وضأن مراقبة ومحضرة كل صباح من قبل جزارين محترفين.',
    ctaText: 'Voir les offres boucherie',
    ctaTextAr: 'عروض القصابة',
    ctaLink: '/produits?cat=boucherie-volaille',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
    badge: 'QUALITÉ SUPÉRIEURE',
    badgeAr: 'جودة ممتازة'
  }
];

export const PROMO_CARDS_DATA = {
  catalogues: {
    tag: 'Catalogues & Promos',
    tagAr: 'الكتالوجات والتخفيضات',
    title: 'Nos catalogues',
    titleAr: 'كتالوجاتنا',
    description: 'Consultez toutes nos offres promotionnelles, feuilletez les pages en ligne et ne manquez aucun bon plan !',
    descriptionAr: 'اطلع على جميع عروضنا الترويجية، تصفح الكتالوج مباشرة ولا تفوت أي فرصة توفير !',
    ctaText: 'Voir les catalogues',
    ctaTextAr: 'عرض الكتالوجات',
    ctaLink: '/catalogues'
  },
  stores: {
    tag: 'Réseau National',
    tagAr: 'شبكة وطنية',
    title: 'Nos magasins',
    titleAr: 'مغازاتنا',
    description: 'Trouvez le magasin AZIZA le plus proche de chez vous, découvrez ses horaires et vérifiez la disponibilité des articles.',
    descriptionAr: 'ابحث عن أقرب مغازة عزيزة إليك، تعرف على أوقات العمل واكتشف الخدمات المتوفرة.',
    ctaText: 'Localiser un magasin',
    ctaTextAr: 'تحديد موقع مغازة',
    ctaLink: '/magasins'
  }
};
