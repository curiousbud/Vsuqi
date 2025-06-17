import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group perspective-1000 transform-style-3d h-full flex flex-col">
      <Card className="bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out transform group-hover:[transform:rotateX(2deg)_rotateY(4deg)_scale(1.03)] flex flex-col flex-grow backface-hidden">
        <CardHeader className="p-0 relative">
          <Link href={`/products/${product.slug}`} className="block aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={product.dataAiHint || "product image"}
            />
          </Link>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Link href={`/products/${product.slug}`}>
            <CardTitle className="text-lg font-semibold mb-1 hover:text-primary-foreground transition-colors">{product.name}</CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.shortDescription}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center border-t">
          <p className="text-lg font-bold text-primary-foreground">${product.price.toFixed(2)}</p>
          <Link href={`/products/${product.slug}`} passHref>
            <Button variant="outline" size="sm">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
