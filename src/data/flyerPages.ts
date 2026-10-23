import { CataloguePage } from '../types';

export const CATALOGUE_PAGES: CataloguePage[] = [
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
        id: 'pates-warda-500g',
        name: 'Pâtes Warda Spaghetti N°2',
        brand: 'Warda',
        price: 1.190,
        unit: '500 g',
        image: '/products/pates-warda.svg',
        top: 60,
        left: 25
      },
      {
        id: 'thon-sidi-daoud-160g',
        name: 'Thon Entier Sidi Daoud',
        brand: 'Sidi Daoud',
        price: 3.490,
        oldPrice: 3.990,
        discount: '-12%',
        unit: '160 g',
        image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=400&q=80',
        top: 60,
        left: 70
      }
    ]
  },
  {
    pageNumber: 3,
    title: 'Marché Frais & Primeur',
    theme: 'Fruits et Légumes de Saison',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'banane-le-kg',
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
        id: 'concentre-tomate-sicam-800g',
        name: 'Tomates fraîches primeur',
        brand: 'Cap Bon',
        price: 1.450,
        unit: 'Le kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        top: 30,
        left: 70
      }
    ]
  },
  {
    pageNumber: 4,
    title: 'Rayon Produits Laitiers & Fromages',
    theme: 'Pour des petits déjeuners riches et sains',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'fromage-president-24p',
        name: 'Fromage Fondu 24 portions',
        brand: 'Président',
        price: 5.850,
        unit: 'Boîte 24p',
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 30
      },
      {
        id: 'yaourt-delice-brasse',
        name: 'Pack Yaourt Délice Brassé',
        brand: 'Délice Danone',
        price: 1.980,
        oldPrice: 2.300,
        discount: '-14%',
        unit: 'Pack 4 x 110g',
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      }
    ]
  },
  {
    pageNumber: 5,
    title: 'Épicerie Sucrée & Boissons Chaudes',
    theme: 'Café, Thé et Biscuits pour la Pause',
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
        top: 40,
        left: 30
      }
    ]
  },
  {
    pageNumber: 6,
    title: 'Tradition & Condiments Tunisiens',
    theme: 'Les incontournables de la cuisine tunisienne',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'harissa-berbere-sicam-380g',
        name: 'Harissa Berbère',
        brand: 'Sicam',
        price: 2.150,
        unit: '380 g',
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
      }
    ]
  },
  {
    pageNumber: 7,
    title: 'Boissons & Eaux Minérales',
    theme: 'Hydratation au quotidien',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'eau-safia-pack',
        name: 'Pack Eau Safia 6x1.5L',
        brand: 'Safia',
        price: 3.900,
        oldPrice: 4.500,
        discount: '-13%',
        unit: '6 x 1.5 L',
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80',
        top: 40,
        left: 50
      }
    ]
  },
  {
    pageNumber: 8,
    title: 'Hygiène, Beauté & Soin Bébé',
    theme: 'Prenez soin de vous à petit prix',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'shampoing-cadum-400ml',
        name: 'Shampoing Cadum Bio',
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
        name: 'Couches Bébé Peaudouce T4',
        brand: 'Peaudouce',
        price: 26.900,
        oldPrice: 31.500,
        discount: '-14%',
        unit: '48 pcs',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
        top: 35,
        left: 70
      }
    ]
  },
  {
    pageNumber: 9,
    title: 'Entretien Maison & Lessives',
    theme: 'Maison propre et parfumée',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    products: [
      {
        id: 'lilas-lessive-3kg',
        name: 'Lessive Lilas Automatique',
        brand: 'Lilas',
        price: 14.900,
        oldPrice: 17.500,
        discount: '-15%',
        unit: '3 kg',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
        top: 40,
        left: 50
      }
    ]
  },
  {
    pageNumber: 10,
    title: 'Bazar Utile & Vaisselle',
    theme: 'Accessoires indispensables du quotidien',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 11,
    title: 'Surgelés & Glaces',
    theme: 'Fraîcheur express et praticité',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 12,
    title: 'Gourmandises & Biscuits',
    theme: 'Le goûter préféré des petits et grands',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 13,
    title: 'Pains & Viennoiseries Cuits sur Place',
    theme: 'La bonne odeur du pain chaud chaque matin',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 14,
    title: 'Conserves & Poissons',
    theme: 'Prêt à servir pour des salades fraîches',
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 15,
    title: 'Offres Spéciales Fidélité',
    theme: 'Avantages exclusifs avec votre carte AZIZA',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    products: []
  },
  {
    pageNumber: 16,
    title: 'Dernière Page - Vos Magasins AZIZA',
    theme: 'Trouvez le magasin le plus proche de chez vous',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    products: []
  }
];
