
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import ProductPriceDisplay from './ProductPriceDisplay';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-[3/4] bg-secondary/30 relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "fashion product"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="pt-4 text-center flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg md:text-xl font-medium text-foreground mb-1 hover:text-foreground/70 transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 h-10">
          {product.shortDescription}
        </p>
        <ProductPriceDisplay priceUSD={product.price} className="text-base font-medium text-foreground my-2" />
        <div className="mt-auto pt-2">
           <Link href={`/products/${product.slug}`} passHref>
            <Button variant="ghost" className="text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-transparent px-0">
              View Details <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
