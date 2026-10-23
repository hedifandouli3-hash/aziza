import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'fruits-legumes',
    name: 'Fruits & Légumes',
    nameAr: 'غلال وخضر',
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
    itemCount: 48,
    slug: 'fruits-legumes',
    description: 'Arrivage frais chaque matin, fruits et légumes locaux de saison sélectionnés pour vous.'
  },
  {
    id: 'produits-laitiers',
    name: 'Produits laitiers',
    nameAr: 'مشتقات الحليب',
    iconName: 'Milk',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
    itemCount: 64,
    slug: 'produits-laitiers',
    description: 'Laits tunisiens, fromages, yaourts et crèmes fraîches au meilleur prix garanti.'
  },
  {
    id: 'epicerie',
    name: 'Épicerie',
    nameAr: 'مواد غذائية',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    itemCount: 152,
    slug: 'epicerie',
    description: 'Pâtes, couscous, riz, sauces tomates, conserves de thon et condiments traditionnels.'
  },
  {
    id: 'boissons',
    name: 'Boissons',
    nameAr: 'مشروبات',
    iconName: 'CupSoda',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
    itemCount: 78,
    slug: 'boissons',
    description: 'Eaux minérales tunisiennes, jus de fruits naturels, sodas et boissons gazeuses rafraîchissantes.'
  },
  {
    id: 'hygiene-beaute',
    name: 'Hygiène & Beauté',
    nameAr: 'نظافة وعناية',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    itemCount: 95,
    slug: 'hygiene-beaute',
    description: 'Soins du corps, gels douche, shampoings, savons et hygiène bucco-dentaire pour toute la famille.'
  },
  {
    id: 'entretien',
    name: 'Entretien',
    nameAr: 'مواد تنظيف',
    iconName: 'SprayCan',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
    itemCount: 82,
    slug: 'entretien',
    description: 'Lessives, adoucissants, liquides vaisselle, nettoyants ménagers et produits désinfectants.'
  },
  {
    id: 'bebe',
    name: 'Bébé',
    nameAr: 'عالم الرضيع',
    iconName: 'Baby',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
    itemCount: 42,
    slug: 'bebe',
    description: 'Couches culottes douces, lingettes hypoallergéniques, laits infantiles et petits pots.'
  },
  {
    id: 'boucherie-volaille',
    name: 'Boucherie & Volaille',
    nameAr: 'لحوم ودواجن',
    iconName: 'Beef',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80',
    itemCount: 36,
    slug: 'boucherie-volaille',
    description: 'Viandes fraîches tunisiennes sélectionnées avec soin, découpe sur place en magasin.'
  }
];
