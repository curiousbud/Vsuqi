
import Image from 'next/image';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import ProductPriceDisplay from '@/components/ProductPriceDisplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, the product you are looking for does not exist.</p>
        <Link href="/products" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const imagesToDisplay = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          {imagesToDisplay.length > 1 ? (
            <Carousel className="w-full rounded-lg overflow-hidden shadow-lg border">
              <CarouselContent>
                {imagesToDisplay.map((imgUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} - image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={product.dataAiHint || "product detail"}
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
             <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg border">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint || "product detail"}
                    priority
                />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.category && (
            <Badge variant="outline" className="text-sm">{product.category}</Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">{product.name}</h1>
          <ProductPriceDisplay priceUSD={product.price} className="text-2xl font-semibold text-primary-foreground" />
          
          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <Link href="/contact" passHref className="w-full block">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us to Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
