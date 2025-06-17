
import Image from 'next/image';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import ProductPriceDisplay from '@/components/ProductPriceDisplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import siteConfig from '@/config/site.json';


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
      <div className="text-center py-20 container mx-auto animate-fadeIn">
        <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, the product you are looking for does not exist.</p>
        <Link href="/products" passHref>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-sm text-sm uppercase tracking-wider px-6 py-2.5 h-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const imagesToDisplay = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 animate-fadeIn">
      <div className="mb-8 md:mb-12">
        <Link href="/products" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground group transition-colors">
          <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to All Products
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        <div className="animate-fadeInUp">
          {imagesToDisplay.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {imagesToDisplay.map((imgUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[3/4] relative bg-secondary/30 rounded-sm overflow-hidden">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} - image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={product.dataAiHint || "fashion product detail"}
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-background/50 hover:bg-background/80 border-foreground/20 text-foreground" />
              <CarouselNext className="right-4 bg-background/50 hover:bg-background/80 border-foreground/20 text-foreground" />
            </Carousel>
          ) : (
             <div className="aspect-[3/4] relative bg-secondary/30 rounded-sm overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint || "fashion product detail"}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
          )}
        </div>

        <div className="space-y-6 md:space-y-8 animate-fadeInUp animation-delay-200">
          {product.category && (
            <Badge variant="outline" className="text-xs uppercase tracking-wider border-foreground/30 text-foreground/70 px-3 py-1 rounded-sm">
              {product.category}
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">{product.name}</h1>
          <ProductPriceDisplay priceUSD={product.price} className="text-2xl md:text-3xl font-medium text-foreground" />

          <Separator className="bg-foreground/10 my-6 md:my-8" />

          <div>
            <h2 className="text-xl font-serif font-medium mb-3 text-foreground">Description</h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          <Link href={`/contact?product=${encodeURIComponent(product.name)}&productId=${product.id}`} passHref className="w-full block">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider py-3.5 h-auto">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Inquire to Order
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground text-center">Contact us for purchase inquiries and assistance.</p>
        </div>
      </div>
    </div>
  );
}
