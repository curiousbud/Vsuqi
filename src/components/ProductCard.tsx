
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import ProductPriceDisplay from './ProductPriceDisplay';
import { Button } from './ui/button';
import { ArrowRight, Eye } from 'lucide-react'; // Using Eye for a "View" or "Quick View" feel

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full overflow-hidden bg-card rounded-sm border border-border/70 product-card-hover transform-style-3d">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-[3/4] bg-secondary/20 relative overflow-hidden rounded-t-sm">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 backface-hidden"
            data-ai-hint={product.dataAiHint || "mens fashion product"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-4 text-left flex flex-col flex-grow"> {/* Text align left for LP style */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-1 hover:text-primary transition-colors truncate" title={product.name}>
            {product.name}
          </h3>
        </Link>
        {/* LP style usually doesn't have short description on card, focusing on name and price */}
        {/* <p className="text-xs text-muted-foreground mb-2 line-clamp-2 h-8"> 
          {product.shortDescription}
        </p> */}
        <ProductPriceDisplay priceUSD={product.price} className="text-sm font-semibold text-foreground mt-1 mb-3" />
        
        <div className="mt-auto pt-2">
           <Link href={`/products/${product.slug}`} passHref>
            <Button 
              variant="outline" 
              className="w-full text-xs uppercase tracking-wider text-primary border-primary hover:bg-primary hover:text-primary-foreground rounded-sm py-2 h-auto"
            >
              View Product <Eye className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
