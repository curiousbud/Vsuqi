export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  images?: string[]; 
  category?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'modern-minimalist-lamp',
    name: 'Modern Minimalist Lamp',
    shortDescription: 'Sleek and stylish lighting.',
    description: 'Illuminate your space with this modern minimalist lamp. Featuring clean lines and a contemporary design, it provides soft, ambient lighting perfect for any room. Made with high-quality materials for durability and a premium feel.',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern lamp',
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    category: 'Lighting',
  },
  {
    id: '2',
    slug: 'ergonomic-office-chair',
    name: 'Ergonomic Office Chair',
    shortDescription: 'Comfortable and supportive.',
    description: 'Upgrade your workspace with our ergonomic office chair. Designed for maximum comfort and support, it features adjustable height, lumbar support, and breathable mesh fabric. Ideal for long hours of work or study.',
    price: 249.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'office chair',
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    category: 'Furniture',
  },
  {
    id: '3',
    slug: 'wireless-noise-cancelling-headphones',
    name: 'Wireless Noise-Cancelling Headphones',
    shortDescription: 'Immersive audio experience.',
    description: 'Experience pure sound with these wireless noise-cancelling headphones. Featuring advanced noise cancellation technology, plush earcups, and long battery life, they are perfect for music, calls, and travel.',
    price: 199.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'headphones audio',
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    category: 'Electronics',
  },
  {
    id: '4',
    slug: 'artisanal-ceramic-mug-set',
    name: 'Artisanal Ceramic Mug Set',
    shortDescription: 'Handcrafted coffee mugs.',
    description: 'Enjoy your favorite beverages in style with this artisanal ceramic mug set. Each mug is handcrafted with unique glazes, making them a beautiful addition to your kitchen. Set of four.',
    price: 45.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ceramic mugs',
    category: 'Kitchenware',
  },
  {
    id: '5',
    slug: 'smart-fitness-tracker',
    name: 'Smart Fitness Tracker',
    shortDescription: 'Monitor your health goals.',
    description: 'Stay on top of your fitness goals with this smart fitness tracker. It monitors steps, heart rate, sleep patterns, and more. Syncs with your smartphone for easy data access and notifications.',
    price: 89.95,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'fitness tracker',
    images: [
      'https://placehold.co/800x600.png',
    ],
    category: 'Wearables',
  },
  {
    id: '6',
    slug: 'organic-cotton-throw-blanket',
    name: 'Organic Cotton Throw Blanket',
    shortDescription: 'Cozy and eco-friendly.',
    description: 'Wrap yourself in comfort with this organic cotton throw blanket. Soft, breathable, and eco-friendly, it\'s perfect for snuggling on the couch or adding a touch of warmth to your bed. Generously sized.',
    price: 65.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cotton blanket',
    category: 'Home Decor',
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
