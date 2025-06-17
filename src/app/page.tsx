
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
import siteConfig from '@/config/site.json';

export default function HomePage() {
  const featuredProducts = getAllProducts().slice(0, 3);

  const heroImage = siteConfig.heroImageUrl || "https://placehold.co/1920x1080.png?text=Luxury+Campaign";

  return (
    <div className="space-y-16 md:space-y-24 lg:space-y-32 animate-fadeIn">
      <section className="relative h-[calc(100vh-5rem)] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-full flex items-center justify-center text-center">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          data-ai-hint="fashion model campaign"
        />
        <div className="absolute inset-0 bg-black/30"></div> {/* Subtle overlay */}
        <div className="relative z-10 p-6 animate-fadeInUp animation-delay-300">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 shadow-black/50 text-shadow">
            {siteConfig.companyName}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto shadow-black/50 text-shadow">
            Discover exclusive collections and timeless elegance.
          </p>
          <Link href="/products" passHref>
            <Button
              size="lg"
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider px-8 py-3 h-auto"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 lg:px-8 animate-fadeInUp animation-delay-500">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 md:mb-16 text-foreground">Featured Products</h2>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fadeInUp" style={{ animationDelay: `${600 + index * 100}ms`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured products available at the moment.</p>
        )}
         <div className="text-center mt-12 md:mt-16">
            <Link href="/products" passHref>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-sm text-sm uppercase tracking-wider px-8 py-3 h-auto">
                    View All Products
                </Button>
            </Link>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24 animate-fadeInUp animation-delay-700">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-foreground">Stay Connected</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Follow us on social media and subscribe to our newsletter for the latest arrivals, exclusive events, and style inspiration.
            </p>
            <Link href="/contact" passHref>
                <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider px-10 py-3 h-auto">
                    Contact Us
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
