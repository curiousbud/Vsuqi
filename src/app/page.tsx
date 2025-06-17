
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import { ArrowRight, ShoppingBag, Users } from 'lucide-react';
import siteConfig from '@/config/site.json';

export default function HomePage() {
  const featuredProducts = getAllProducts().slice(0, 4); 
  const heroImage = siteConfig.heroImageUrl || "https://placehold.co/1920x900.png?text=Elegant+Menswear";

  return (
    <div className="space-y-16 md:space-y-24 lg:space-y-32 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[calc(80vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] w-full flex items-center justify-center text-center">
        <Image
          src={heroImage}
          alt={siteConfig.companyLogoAltText || "Hero background"}
          fill
          priority
          className="object-cover object-center"
          data-ai-hint="mens fashion lifestyle"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Darker overlay for better text contrast */}
        <div className="relative z-10 p-6 animate-fadeInUp animation-delay-300">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4 md:mb-6 text-shadow">
            {siteConfig.companyName}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto text-shadow">
            Crafting Excellence in Menswear Since [Year]. Discover Our Legacy. 
          </p>
          <Link href="/products" passHref>
            <Button
              size="lg"
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider px-10 py-3.5 h-auto shadow-classic"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 md:px-6 animate-fadeInUp animation-delay-500">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 md:mb-16 text-foreground">Featured Collection</h2>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fadeInUp perspective-1000" style={{ animationDelay: `${500 + index * 100}ms`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured products available at the moment.</p>
        )}
         <div className="text-center mt-12 md:mt-16">
            <Link href="/products" passHref>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-sm text-sm uppercase tracking-wider px-8 py-3 h-auto"
                >
                    View All Products
                </Button>
            </Link>
        </div>
      </section>

      {/* Optional: About/Brand Story Section - LP Style */}
      <section className="bg-secondary/30 py-16 md:py-24 animate-fadeInUp animation-delay-700">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-6"/>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">The {siteConfig.companyName} Legacy</h2>
            <p className="text-foreground/80 leading-relaxed mb-8 max-w-xl mx-auto">
              For decades, {siteConfig.companyName} has been synonymous with impeccable style and unparalleled quality. 
              Our commitment to craftsmanship and timeless design ensures every piece is an investment in enduring elegance.
            </p>
            <Link href="/contact" passHref> {/* Assuming an about page might be part of contact or a future page */}
                 <Button 
                    variant="default" 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider px-10 py-3.5 h-auto shadow-classic"
                  >
                    Discover Our Story
                </Button>
            </Link>
        </div>
      </section>

      {/* Optional: Categories/Call to Action Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 animate-fadeInUp animation-delay-400">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">Shop by Category</h3>
            <p className="text-foreground/70 mb-6">
              Explore our curated selections, from sharp formals to relaxed casuals. Find the perfect attire for every occasion.
            </p>
            <div className="space-y-3">
              {['Suits & Blazers', 'Shirts', 'Trousers', 'Accessories'].map(category => (
                <Link key={category} href="/products" className="block group">
                  <Button variant="link" className="text-foreground/80 hover:text-primary p-0 text-base group-hover:underline">
                    {category} <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden shadow-classic">
            <Image 
              src="https://placehold.co/600x750.png" 
              alt="Shop by category" 
              fill 
              className="object-cover"
              data-ai-hint="menswear flatlay collection"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
