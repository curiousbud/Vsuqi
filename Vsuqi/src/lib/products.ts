
import productsData from '@/config/products.json';

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
  dataAiHint?: string; // Added dataAiHint here to match JSON structure
}

// The products are now imported from the JSON file
const products: Product[] = productsData;

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
