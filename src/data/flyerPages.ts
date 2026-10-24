import { CataloguePage } from '../types';

export const CATALOGUE_PAGES: CataloguePage[] = [
  // =========================================================================
  // PAGE 1: COUVERTURE DU CATALOGUE (3 PRODUITS VEDETTES)
  // =========================================================================
  {
    pageNumber: 1,
    title: 'Couverture - Des prix qui font plaisir !',
    theme: 'Offres Choc de la Semaine',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'banane-le-kg',
        name: 'Banane d\'importation',
        brand: 'Frais',
        price: 2.490,
        oldPrice: 3.100,
        discount: '-20%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
        top: 25,
        left: 20
      },
      {
        id: 'lait-delice-1l',
        name: 'Lait Demi-Écrémé Délice',
        brand: 'Délice',
        price: 2.850,
        unit: '1 L',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
        top: 55,
        left: 65
      },
      {
        id: 'huile-ghalia-1l',
        name: 'Huile Végétale Ghalia',
        brand: 'Ghalia',
        price: 6.490,
        unit: '1 L',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
        top: 60,
        left: 20
      }
    ]
  },

  // =========================================================================
  // PAGE 2: BOUCHERIE & VOLAILLE FRAÎCHE (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 2,
    title: 'Boucherie & Volaille Fraîche',
    theme: 'Arrivage Quotidien Viandes 100% Tunisiennes',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'viande-bovine-1kg',
        name: 'Viande bovine sans os',
        brand: 'Boucherie AZIZA',
        price: 27.900,
        oldPrice: 34.000,
        discount: '-18%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80',
        top: 25,
        left: 30
      },
      {
        id: 'escalope-dinde-1kg',
        name: 'Escalope de dinde fraîche',
        brand: 'Volaille AZIZA',
        price: 15.800,
        oldPrice: 18.500,
        discount: '-15%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
        top: 25,
        left: 70
      },
      {
        id: 'poulet-fermier-entier',
        name: 'Poulet fermier prêt à cuire',
        brand: 'El Mazraa',
        price: 8.490,
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
        top: 60,
        left: 25
      },
      {
        id: 'merguez-pur-boeuf',
        name: 'Merguez pur bœuf artisanales',
        brand: 'Boucherie AZIZA',
        price: 22.900,
        oldPrice: 26.500,
        discount: '-14%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80',
        top: 60,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 3: MARCHÉ FRAIS & PRIMEUR (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 3,
    title: 'Marché Frais & Primeur',
    theme: 'Fruits et Légumes de Saison Récoltés en Tunisie',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'pommes-golden-1kg',
        name: 'Pommes Golden Tunisiennes',
        brand: 'Kasserine',
        price: 3.250,
        oldPrice: 3.900,
        discount: '-16%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80',
        top: 30,
        left: 25
      },
      {
        id: 'tomates-fraiches-1kg',
        name: 'Tomates fraîches primeur',
        brand: 'Cap Bon',
        price: 1.450,
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        top: 30,
        left: 70
      },
      {
        id: 'oranges-maltaises-1kg',
        name: 'Oranges Maltaises de Tunisie',
        brand: 'Nabeul',
        price: 2.100,
        oldPrice: 2.600,
        discount: '-19%',
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 25
      },
      {
        id: 'pommes-de-terre-1kg',
        name: 'Pommes de terre nouvelles',
        brand: 'Sélection Frais',
        price: 1.350,
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 4: PRODUITS LAITIERS & FROMAGES (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 4,
    title: 'Produits Laitiers & Fromages',
    theme: 'Pour des Petits Déjeuners Riches et Équilibrés',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'fromage-president-24p',
        name: 'Fromage Fondu en Portions',
        brand: 'Président',
        price: 5.850,
        unit: 'Boîte 24p',
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'yaourt-delice-brasse',
        name: 'Pack Yaourt Brassé Fraise',
        brand: 'Délice Danone',
        price: 1.980,
        oldPrice: 2.300,
        discount: '-14%',
        unit: 'Pack 4 x 110g',
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'beurre-delice-200g',
        name: 'Beurre Traditionnel Doux',
        brand: 'Délice',
        price: 4.350,
        oldPrice: 4.900,
        discount: '-11%',
        unit: 'Plaquette 200g',
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'ricotta-fraiche-250g',
        name: 'Ricotta Fraîche Tunisienne',
        brand: 'Fromagerie du Nord',
        price: 2.890,
        unit: 'Pot 250g',
        image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 5: ÉPICERIE SUCRÉE & CAFÉ (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 5,
    title: 'Épicerie Sucrée & Boissons Chaudes',
    theme: 'Café, Thé et Biscuits pour la Pause Gourmande',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'nescafe-classic-200g',
        name: 'Nescafé Classic Bocal',
        brand: 'Nescafé',
        price: 17.900,
        oldPrice: 19.900,
        discount: '-10%',
        unit: '200 g',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'biscuits-major-choco',
        name: 'Pack Biscuits Fourrés Chocolat',
        brand: 'Major',
        price: 1.650,
        oldPrice: 2.100,
        discount: '-21%',
        unit: 'Paquet 180g',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'confiture-sicam-fraise',
        name: 'Confiture Fraises du Cap Bon',
        brand: 'Sicam',
        price: 3.450,
        unit: 'Bocal 450g',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'gaufrettes-saida-vanille',
        name: 'Gaufrettes Croustillantes Vanille',
        brand: 'Saïda',
        price: 1.250,
        unit: 'Paquet 150g',
        image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 6: TRADITION & CONDIMENTS TUNISIENS (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 6,
    title: 'Tradition & Condiments Tunisiens',
    theme: 'Les Incontournables de la Cuisine Tunisienne Authentique',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'harissa-berbere-sicam-380g',
        name: 'Harissa Berbère Traditionnelle',
        brand: 'Sicam',
        price: 2.150,
        unit: 'Pot 380 g',
        image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'couscous-diari-1kg',
        name: 'Couscous Diari Fin',
        brand: 'Diari',
        price: 1.850,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'concentre-tomate-sicam-800g',
        name: 'Double Concentré de Tomate',
        brand: 'Sicam',
        price: 4.250,
        unit: 'Boîte 800 g',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'pates-warda-500g',
        name: 'Pâtes Spaghetti N°2',
        brand: 'Warda',
        price: 1.190,
        unit: 'Paquet 500 g',
        image: '/products/pates-warda.svg',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 7: BOISSONS & EAUX MINÉRALES (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 7,
    title: 'Boissons & Eaux Minérales',
    theme: 'Hydratation Quotidienne et Saveurs Rafraîchissantes',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'eau-safia-pack',
        name: 'Pack Eau Minérale Naturelle',
        brand: 'Safia',
        price: 3.900,
        oldPrice: 4.500,
        discount: '-13%',
        unit: 'Pack 6 x 1.5 L',
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'jus-diva-orange',
        name: 'Jus d\'Orange & Pulpe',
        brand: 'Diva',
        price: 2.750,
        unit: 'Brique 1 L',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'eau-garci-gazeuse',
        name: 'Eau Gazeuse Naturelle Garci',
        brand: 'Garci',
        price: 1.150,
        unit: 'Bouteille 1 L',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'sirop-menthe-phenicien',
        name: 'Sirop de Menthe Traditionnel',
        brand: 'Le Phénicien',
        price: 4.800,
        unit: 'Bouteille 750 ml',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 8: HYGIÈNE & SOIN BÉBÉ (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 8,
    title: 'Hygiène, Beauté & Soin Bébé',
    theme: 'Prenez Soin de Votre Famille aux Meilleurs Prix',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'shampoing-cadum-400ml',
        name: 'Shampoing Douceur Amande Bio',
        brand: 'Cadum',
        price: 6.950,
        oldPrice: 8.200,
        discount: '-15%',
        unit: '400 ml',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'couches-peaudouce-t4',
        name: 'Couches Bébé Confort Maxi T4',
        brand: 'Peaudouce',
        price: 26.900,
        oldPrice: 31.500,
        discount: '-14%',
        unit: 'Paquet 48 pcs',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'savon-liquide-dermavit',
        name: 'Savon Mains Antibactérien',
        brand: 'Dermavit',
        price: 3.200,
        unit: 'Flacon pompe 500 ml',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'lingettes-peaudouce-72',
        name: 'Lingettes Douceur Bébé x72',
        brand: 'Peaudouce',
        price: 4.450,
        unit: 'Paquet 72 pcs',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 9: ENTRETIEN MAISON & LESSIVES (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 9,
    title: 'Entretien Maison & Lessives',
    theme: 'Maison Propre, Éclatante et Fraîcheur Longue Durée',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'lilas-lessive-3kg',
        name: 'Lessive Lilas Automatique',
        brand: 'Lilas',
        price: 14.900,
        oldPrice: 17.500,
        discount: '-15%',
        unit: 'Baril 3 kg',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'liquide-vaisselle-oki',
        name: 'Liquide Vaisselle Citron Vert',
        brand: 'Oki',
        price: 3.650,
        unit: 'Flacon 1 L',
        image: 'https://images.unsplash.com/photo-1585670270608-b4be4fbcf05d?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'nettoyant-sol-genie',
        name: 'Nettoyant Sols Lavande',
        brand: 'Génie',
        price: 4.100,
        oldPrice: 4.800,
        discount: '-14%',
        unit: 'Bidon 1.5 L',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'essuie-tout-lilas',
        name: 'Essuie-Tout Absorbant Maxi',
        brand: 'Lilas',
        price: 3.850,
        unit: 'Pack 2 rouleaux',
        image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 10: BAZAR UTILE & ARTS DE LA TABLE (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 10,
    title: 'Bazar Utile & Arts de la Table',
    theme: 'Accessoires Indispensables pour Équiper Votre Cuisine',
    image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'poele-antiadhesive-24cm',
        name: 'Poêle Antiadhésive Granit 24cm',
        brand: 'Bazar AZIZA',
        price: 18.900,
        oldPrice: 24.000,
        discount: '-21%',
        unit: 'Pièce',
        image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'service-verres-the-6p',
        name: 'Service 6 Verres à Thé Tradition',
        brand: 'Cristalina',
        price: 5.490,
        unit: 'Set 6 pcs',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'casserole-inox-18cm',
        name: 'Casserole Inox Poignée Silicone',
        brand: 'Chef Cuisine',
        price: 14.900,
        unit: 'Diamètre 18 cm',
        image: 'https://images.unsplash.com/photo-1584990347449-399127dc5d73?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'essoreuse-salade-aziza',
        name: 'Essoreuse à Salade Express',
        brand: 'Bazar AZIZA',
        price: 9.900,
        unit: 'Capacité 3.5 L',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 11: SURGELÉS & FRAÎCHEUR EXPRESS (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 11,
    title: 'Surgelés & Fraîcheur Express',
    theme: 'Produits de la Mer et Accompagnements Faciles',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'filet-merlu-surgle-1kg',
        name: 'Filets de Merlu Blanc Pêche',
        brand: 'Pêche & Mer',
        price: 14.500,
        oldPrice: 17.000,
        discount: '-15%',
        unit: 'Sachet 1 kg',
        image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'frites-surgeles-1kg',
        name: 'Frites Coupe Classique',
        brand: 'Frite d\'Or',
        price: 4.850,
        unit: 'Sachet 1 kg',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'crevettes-decortiquees',
        name: 'Crevettes Décortiquées Surgelées',
        brand: 'Cap Poisson',
        price: 19.800,
        oldPrice: 24.000,
        discount: '-17%',
        unit: 'Sachet 500 g',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'batonnets-glaces-choc',
        name: 'Bâtonnets Glacés Chocolat x4',
        brand: 'Délice Glaces',
        price: 5.200,
        unit: 'Pack 4 x 70 ml',
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 12: GOURMANDISES, BISCUITS & CHOCOLATS (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 12,
    title: 'Gourmandises & Biscuits',
    theme: 'Le Goûter Préféré des Enfants et de Toute la Famille',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'biscuits-major-choco',
        name: 'Pack Biscuits Fourrés Chocolat',
        brand: 'Major',
        price: 1.650,
        oldPrice: 2.100,
        discount: '-21%',
        unit: 'Paquet 180g',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'chocolat-maestro-100g',
        name: 'Tablette Chocolat au Lait Praliné',
        brand: 'Maestro',
        price: 2.250,
        unit: '100 g',
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'madeleines-oeufs-300g',
        name: 'Madeleines Moelleuses aux Œufs',
        brand: 'Gourmandise',
        price: 2.950,
        unit: 'Paquet 300g',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'bonbons-gelifies-haribo',
        name: 'Bonbons Gélifiés aux Fruits',
        brand: 'Haribo',
        price: 2.400,
        unit: 'Sachet 120g',
        image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 13: FOURNIL, PAINS & VIENNOISERIES (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 13,
    title: 'Fournil, Pains & Viennoiseries',
    theme: 'La Bonne Odeur du Pain Chaud et Croustillant Chaque Jour',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'croissant-beurre-aziza',
        name: 'Croissants Pur Beurre Dorés x4',
        brand: 'Fournil AZIZA',
        price: 2.800,
        oldPrice: 3.400,
        discount: '-18%',
        unit: 'Pack de 4 pièces',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'pain-de-mie-complet',
        name: 'Pain de Mie Moelleux Complet',
        brand: 'Gourmet',
        price: 2.450,
        unit: 'Sachet 500 g',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'ciabatta-olives-noires',
        name: 'Pain Ciabatta aux Olives Noires',
        brand: 'Fournil AZIZA',
        price: 1.400,
        unit: 'Pièce 300 g',
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'brioche-tressee-sucre',
        name: 'Brioche Tressée Pur Sucre',
        brand: 'Fournil AZIZA',
        price: 3.200,
        unit: 'Pièce 400 g',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 14: CONSERVES DE POISSON & CONDIMENTS (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 14,
    title: 'Conserves de Poisson & Condiments',
    theme: 'Prêt à Déguster pour Vos Salades et Recettes Rapides',
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'thon-sidi-daoud-160g',
        name: 'Thon Entier à l\'Huile d\'Olive',
        brand: 'Sidi Daoud',
        price: 4.250,
        oldPrice: 4.800,
        discount: '-11%',
        unit: 'Boîte 160 g',
        image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'sardines-el-manar',
        name: 'Sardines à l\'Huile d\'Olive Vierge',
        brand: 'El Manar',
        price: 1.950,
        unit: 'Boîte 125 g',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'mais-doux-sicam',
        name: 'Maïs Doux Croquant en Grains',
        brand: 'Sicam',
        price: 2.300,
        unit: 'Boîte 340 g',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'haricot-blanc-sicam',
        name: 'Haricots Blancs Cuisinés au Naturel',
        brand: 'Sicam',
        price: 1.850,
        unit: 'Boîte 400 g',
        image: 'https://images.unsplash.com/photo-1588644525273-f37b60d78512?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 15: AVANTAGES CARTE FIDÉLITÉ AZIZA (4 PRODUITS)
  // =========================================================================
  {
    pageNumber: 15,
    title: 'Avantages Fidélité AZIZA',
    theme: 'Cumulez des Points et Économisez avec Votre Carte AZIZA',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'huile-olive-zitouna-1l',
        name: 'Huile d\'Olive Vierge Extra',
        brand: 'Zitouna',
        price: 18.900,
        oldPrice: 22.000,
        discount: '-14%',
        unit: 'Bouteille 1 L',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'cafe-moulu-ben-yedder',
        name: 'Café Moulu Tradition Sélection',
        brand: 'Ben Yedder',
        price: 4.900,
        unit: 'Paquet 250 g',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      },
      {
        id: 'fromage-mozzarella-delice',
        name: 'Fromage Râpé Mozzarella Pur Lait',
        brand: 'Délice',
        price: 5.400,
        unit: 'Sachet 200 g',
        image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 30
      },
      {
        id: 'pack-lessive-liquide-lilas',
        name: 'Pack Lessive Liquide Économique',
        brand: 'Lilas',
        price: 19.900,
        oldPrice: 24.500,
        discount: '-19%',
        unit: 'Bidon 4 L',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
        top: 65,
        left: 70
      }
    ]
  },

  // =========================================================================
  // PAGE 16: QUATRIÈME DE COUVERTURE (RÉSEAU DE MAGASINS & INFOS AZIZA)
  // =========================================================================
  {
    pageNumber: 16,
    title: 'Dernière Page - Vos Magasins AZIZA',
    theme: 'Trouvez Votre Magasin AZIZA le Plus Proche en Tunisie',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    products: []
  }
];
