export interface ProductOption {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  options: ProductOption[];
  description?: string;
}

export const CATEGORIES = [
  "Rice",
  "Beans",
  "Wheat",
  "Oils",
  "Spices",
  "Eggs",
  "Drinks",
  "Beers",
  "Fruit Juice"
];

export const PRODUCTS: Product[] = [
  // RICE
  {
    id: "mama-gold-rice",
    name: "Mama Gold Rice",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1kg", price: 4 },
      { weight: "2kg", price: 8 },
      { weight: "3kg", price: 12 },
      { weight: "4kg", price: 16 },
      { weight: "5kg", price: 18 },
    ]
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice (Raw Grains)",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1kg", price: 5 },
      { weight: "2kg", price: 10 },
      { weight: "3kg", price: 14 },
      { weight: "4kg", price: 17 },
      { weight: "5kg", price: 20 },
    ]
  },
  // BEANS
  {
    id: "honey-beans",
    name: "Honey Beans (Oloyin)",
    category: "Beans",
    image: "https://images.unsplash.com/photo-1551462147-37885acc3c41?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1kg", price: 4 },
      { weight: "2kg", price: 8 },
      { weight: "3kg", price: 11 },
      { weight: "4kg", price: 14 },
      { weight: "5kg", price: 18 },
    ]
  },
  // WHEAT
  {
    id: "golden-penny-wheat",
    name: "Golden Penny Wheat",
    category: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1kg", price: 3 },
      { weight: "2kg", price: 6 },
      { weight: "3kg", price: 9 },
      { weight: "4kg", price: 12 },
      { weight: "5kg", price: 15 },
    ]
  },
  // OILS
  {
    id: "palm-oil",
    name: "Premium Palm Oil",
    category: "Oils",
    image: "https://images.unsplash.com/photo-1620706122100-616aa048a43f?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1 Litre", price: 6 },
      { weight: "2 Litre", price: 11 },
      { weight: "3 Litre", price: 15 },
      { weight: "4 Litre", price: 20 },
      { weight: "5 Litre", price: 24 },
    ]
  },
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "1 Litre", price: 7 },
      { weight: "2 Litre", price: 13 },
      { weight: "3 Litre", price: 18 },
      { weight: "4 Litre", price: 24 },
      { weight: "5 Litre", price: 29 },
    ]
  },
  // SPICES
  {
    id: "curry-sachet",
    name: "Curry Sachet",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Sachet", price: 2 }]
  },
  {
    id: "thyme-sachet",
    name: "Thyme Sachet",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1591850053270-888d00278f31?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Sachet", price: 2 }]
  },
  {
    id: "knorr-sachet",
    name: "Knorr Seasoning Sachet",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Sachet", price: 3 }]
  },
  {
    id: "maggi-sachet",
    name: "Maggi Seasoning Sachet",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Sachet", price: 3 }]
  },
  {
    id: "pepper-soup-spice",
    name: "Pepper Soup Spice",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Sachet", price: 3 }]
  },
  // EGGS
  {
    id: "eggs-crate",
    name: "Fresh Farm Eggs",
    category: "Eggs",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "6 eggs", price: 2 },
      { weight: "15 eggs", price: 4 },
      { weight: "30 eggs", price: 7 },
    ]
  },
  // DRINKS
  {
    id: "coca-cola",
    name: "Coca Cola",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "Can", price: 2 },
      { weight: "Bottle", price: 3 },
    ]
  },
  {
    id: "fanta",
    name: "Fanta Orange",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "Can", price: 2 },
      { weight: "Bottle", price: 3 },
    ]
  },
  {
    id: "pepsi",
    name: "Pepsi",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "Can", price: 2 },
      { weight: "Bottle", price: 3 },
    ]
  },
  {
    id: "maltina",
    name: "Maltina",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    options: [
      { weight: "Can", price: 3 },
      { weight: "Bottle", price: 4 },
    ]
  },
  // BEERS
  {
    id: "heineken",
    name: "Heineken Beer",
    category: "Beers",
    image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Bottle", price: 4 }]
  },
  {
    id: "guinness",
    name: "Guinness Stout",
    category: "Beers",
    image: "https://images.unsplash.com/photo-1584225064785-c72a790b71ad?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Bottle", price: 5 }]
  },
  {
    id: "star-beer",
    name: "Star Beer",
    category: "Beers",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Bottle", price: 4 }]
  },
  {
    id: "budweiser",
    name: "Budweiser",
    category: "Beers",
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Bottle", price: 4 }]
  },
  // FRUIT JUICE
  {
    id: "chivita",
    name: "Chivita Juice",
    category: "Fruit Juice",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Carton", price: 3 }]
  },
  {
    id: "ribena",
    name: "Ribena Juice",
    category: "Fruit Juice",
    image: "https://images.unsplash.com/photo-1525904097882-44f59830c3ed?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Carton", price: 4 }]
  },
  {
    id: "five-alive",
    name: "Five Alive Juice",
    category: "Fruit Juice",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Carton", price: 3 }]
  },
  {
    id: "lucozade",
    name: "Lucozade",
    category: "Fruit Juice",
    image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=800&auto=format&fit=crop",
    options: [{ weight: "Bottle", price: 3 }]
  },
];
