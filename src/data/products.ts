import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'banane-le-kg',
    name: 'Banane',
    brand: 'Import Frais',
    category: 'fruits-legumes',
    subCategory: 'Fruits frais',
    packageSize: 'Le kg',
    price: 2.490,
    oldPrice: 3.100,
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Bananes fraîches mûres à point, riches en potassium et vitamines. Idéales pour le petit-déjeuner ou le goûter des enfants.',
    features: ['Riche en fibres et potassium', 'Origine contrôlée', 'Calibre 1ère catégorie'],
    origin: 'Équateur / Sélection AZIZA',
    isPromo: true,
    isPopular: true,
    barcode: '619100010012',
    inStock: true
  },
  {
    id: 'lait-delice-1l',
    name: 'Lait Demi-Écrémé',
    brand: 'Délice',
    category: 'produits-laitiers',
    subCategory: 'Laits & Boissons lactées',
    packageSize: '1 L',
    price: 2.850,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Lait demi-écrémé UHT 100% tunisien de la marque Délice. Source naturelle de calcium et de vitamine D pour toute la famille.',
    features: ['100% Lait tunisien collecté localement', 'UHT stérilisé', 'Sans conservateur ajouté'],
    origin: 'Soliman, Nabeul - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100020024',
    inStock: true
  },
  {
    id: 'pates-warda-500g',
    name: 'Pâtes Warda Spaghetti N°2',
    brand: 'Warda',
    category: 'epicerie',
    subCategory: 'Pâtes & Féculents',
    packageSize: '500 g',
    price: 1.190,
    image: '/products/pates-warda.svg',
    additionalImages: [
      '/products/pates-warda.svg',
      'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Pâtes de qualité supérieure, idéales pour tous vos plats du quotidien. Fabriquées à base de 100% semoule de blé dur sélectionné pour une tenue de cuisson irréprochable.',
    features: ['100% Semoule de blé dur tunisienne', 'Excellente tenue à la cuisson', 'Sans additifs ni colorants'],
    origin: 'Sousse - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100030036',
    inStock: true
  },
  {
    id: 'nescafe-classic-200g',
    name: 'Nescafé Classic',
    brand: 'Nescafé',
    category: 'epicerie',
    subCategory: 'Petit-déjeuner & Café',
    packageSize: '200 g',
    price: 17.900,
    oldPrice: 19.900,
    discountPercent: 10,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Café soluble 100% pur café avec un arôme riche et généreux. La formule classique pour bien démarrer votre matinée en Tunisie.',
    features: ['Café instantané pur grain', 'Bocal en verre recyclable 200g', 'Saveur intense et veloutée'],
    origin: 'Importé et distribué en Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100040048',
    inStock: true
  },
  {
    id: 'huile-ghalia-1l',
    name: 'Huile Ghalia',
    brand: 'Ghalia',
    category: 'epicerie',
    subCategory: 'Huiles & Condiments',
    packageSize: '1 L',
    price: 6.490,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Huile végétale raffinée pure graine, parfaite pour les fritures dorées, les cuissons traditionnelles et les vinaigrettes.',
    features: ['Riche en vitamine E', 'Haute résistance à la chaleur', 'Saveur neutre et légère'],
    origin: 'Sfax - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100050050',
    inStock: true
  },
  {
    id: 'lilas-lessive-3kg',
    name: 'Lilas Lessive',
    brand: 'Lilas',
    category: 'entretien',
    subCategory: 'Entretien du linge',
    packageSize: '3 kg',
    price: 14.900,
    oldPrice: 17.500,
    discountPercent: 15,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Lessive concentrée Lilas pour machine automatique et lavage à la main. Élimine les taches tenaces dès 30°C tout en laissant un parfum frais longue durée.',
    features: ['Formule active anti-taches', 'Parfum fraîcheur printanière', 'Convient au blanc et aux couleurs'],
    origin: 'Mégrine, Ben Arous - Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100060062',
    inStock: true
  },
  {
    id: 'thon-sidi-daoud-160g',
    name: 'Thon Entier à l\'Huile d\'Olive',
    brand: 'Sidi Daoud',
    category: 'epicerie',
    subCategory: 'Conserves de poisson',
    packageSize: '160 g',
    price: 3.490,
    oldPrice: 3.990,
    discountPercent: 12,
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Le thon mythique des côtes tunisiennes de Sidi Daoud. Filets de thon rouge pêchés de manière responsable et préparés artisanalement dans l\'huile d\'olive.',
    features: ['Filets entiers à l\'huile d\'olive vierge', 'Riche en oméga 3', 'Savoir-faire tunisien séculaire'],
    origin: 'Sidi Daoud, Cap Bon - Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100070074',
    inStock: true
  },
  {
    id: 'viande-bovine-1kg',
    name: 'Viande Bovine sans os',
    brand: 'Boucherie AZIZA',
    category: 'boucherie-volaille',
    subCategory: 'Viandes fraîches',
    packageSize: 'Le kg',
    price: 27.900,
    oldPrice: 34.000,
    discountPercent: 18,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Viande bovine tunisienne de qualité supérieure, découpée chaque matin par nos maîtres bouchers. Idéale pour vos ragoûts, couscous et tajines.',
    features: ['100% Viande locale contrôlée', 'Viande tendre et savoureuse', 'Découpe fraîche quotidienne'],
    origin: 'Élevage tunisien contrôlé',
    isPromo: true,
    isPopular: false,
    barcode: '619100080086',
    inStock: true
  },
  {
    id: 'concentre-tomate-sicam-800g',
    name: 'Double Concentré de Tomate',
    brand: 'Sicam',
    category: 'epicerie',
    subCategory: 'Conserves & Sauces',
    packageSize: '800 g',
    price: 4.250,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Le concentré de tomate emblématique de la cuisine tunisienne. Élaboré avec les tomates mûries sous le soleil de la Medjerda.',
    features: ['28% d\'extrait sec minimum', 'Tomates fraîches 100% tunisiennes', 'Boîte ouverture facile'],
    origin: 'Béja - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100090098',
    inStock: true
  },
  {
    id: 'harissa-berbere-sicam-380g',
    name: 'Harissa Berbère Traditionnelle',
    brand: 'Sicam',
    category: 'epicerie',
    subCategory: 'Condiments & Épices',
    packageSize: '380 g',
    price: 2.150,
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'La véritable harissa tunisienne labellisée au patrimoine immatériel de l\'UNESCO. Piments rouges séchés pilés à l\'ail et au carvi.',
    features: ['Piments du Cap Bon', 'Recette traditionnelle authentique', 'Pot en verre préservant les arômes'],
    origin: 'Cap Bon - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100100019',
    inStock: true
  },
  {
    id: 'eau-safia-pack',
    name: 'Eau Minérale Naturelle',
    brand: 'Safia',
    category: 'boissons',
    subCategory: 'Eaux plates',
    packageSize: 'Pack 6 x 1.5 L',
    price: 3.900,
    oldPrice: 4.500,
    discountPercent: 13,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Eau minérale naturelle jaillissant des sources pures de Ksour. Faiblement minéralisée, recommandée pour les bébés et toute la famille.',
    features: ['Pureté originelle de source', 'Pack économique 6 bouteilles', 'Bouteilles 100% recyclables'],
    origin: 'Aïn M\'dheker, Zaghouan - Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100110020',
    inStock: true
  },
  {
    id: 'fromage-president-24p',
    name: 'Fromage Fondu en Portions',
    brand: 'Président',
    category: 'produits-laitiers',
    subCategory: 'Fromages',
    packageSize: '24 portions',
    price: 5.850,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Délicieux triangles de fromage fondu crémeux, facile à tartiner sur la baguette ou le pain tabouna. Source essentielle de calcium.',
    features: ['Riche en calcium et vitamines A & D', 'Idéal pour le casse-croûte scolaire', 'Emballage fraîcheur individuel'],
    origin: 'Fabriqué en Tunisie sous licence',
    isPromo: false,
    isPopular: true,
    barcode: '619100120031',
    inStock: true
  },
  {
    id: 'yaourt-delice-brasse',
    name: 'Yaourt Brassé Fraise & Fruits Rouges',
    brand: 'Délice Danone',
    category: 'produits-laitiers',
    subCategory: 'Yaourts & Desserts',
    packageSize: 'Pack 4 x 110 g',
    price: 1.980,
    oldPrice: 2.300,
    discountPercent: 14,
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Yaourt brassé aux délicieux morceaux de fraises tunisiennes. Texture onctueuse et gourmande.',
    features: ['Sans conservateur', 'Ferments lactiques vivants', 'Fruits sélectionnés'],
    origin: 'Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100130042',
    inStock: true
  },
  {
    id: 'couscous-diari-1kg',
    name: 'Couscous Traditionnel Fin',
    brand: 'Diari',
    category: 'epicerie',
    subCategory: 'Pâtes & Féculents',
    packageSize: '1 kg',
    price: 1.850,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Le couscous fin traditionnel tunisien Diari. Grains roulés à la vapeur, ne collent jamais pour un couscous au poisson ou à l\'agneau réussi.',
    features: ['100% Semoule de blé dur de haute qualité', 'Cuisson facile et légère', 'Format familial 1 kg'],
    origin: 'Sousse - Tunisie',
    isPromo: false,
    isPopular: true,
    barcode: '619100140053',
    inStock: true
  },
  {
    id: 'shampoing-cadum-400ml',
    name: 'Shampoing Douceur Amande Bio',
    brand: 'Cadum',
    category: 'hygiene-beaute',
    subCategory: 'Soins des cheveux',
    packageSize: '400 ml',
    price: 6.950,
    oldPrice: 8.200,
    discountPercent: 15,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Shampoing nourrissant à l\'huile d\'amande douce bio. Lave délicatement sans agresser le cuir chevelu.',
    features: ['Sans paraben ni silicone', 'pH neutre testé dermatologiquement', 'Bouteille grand format familiale'],
    origin: 'Distribué en Tunisie',
    isPromo: true,
    isPopular: false,
    barcode: '619100150064',
    inStock: true
  },
  {
    id: 'couches-peaudouce-t4',
    name: 'Couches Bébé Confort Maxi T4',
    brand: 'Peaudouce',
    category: 'bebe',
    subCategory: 'Change & Hygiène',
    packageSize: 'Paquet de 48 couches',
    price: 26.900,
    oldPrice: 31.500,
    discountPercent: 14,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Couches pour bébés de 7 à 18 kg avec technologie ultra-absorbante 12h au sec et attaches élastiques douces.',
    features: ['Absorption renforcée jour et nuit', 'Voile doux respirant micro-aéré', 'Hypoallergénique'],
    origin: 'Ksar Saïd, Tunis - Tunisie',
    isPromo: true,
    isPopular: true,
    barcode: '619100160075',
    inStock: true
  }
];
