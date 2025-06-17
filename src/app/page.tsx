
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, Product } from '@/lib/products';
import { PackageOpen } from 'lucide-react';
import siteConfig from '@/config/site.json';

export default function HomePage() {
  const featuredProducts = getAllProducts().slice(0, 3); // Show first 3 products as featured

  const heroSectionStyle = siteConfig.heroImageUrl 
    ? { backgroundImage: `url('${siteConfig.heroImageUrl}')` } 
    : {};
  
  const heroSectionClasses = `text-center py-16 md:py-24 rounded-xl shadow-sm ${
    siteConfig.heroImageUrl 
      ? 'bg-cover bg-center' 
      : 'bg-gradient-to-br from-primary/30 via-background to-background'
  }`;

  return (
    <div className="space-y-16">
      <section 
        className={heroSectionClasses}
        style={heroSectionStyle}
      >
        <div className={`container ${siteConfig.heroImageUrl ? 'bg-black/30 backdrop-blur-sm py-8 rounded-md' : ''}`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 font-headline ${siteConfig.heroImageUrl ? 'text-white' : 'text-foreground'}`}>
            Welcome to {siteConfig.companyName}
          </h1>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${siteConfig.heroImageUrl ? 'text-gray-200' : 'text-muted-foreground'}`}>
            Discover a curated collection of modern and unique products designed to enhance your lifestyle.
          </p>
          <Link href="/products" passHref>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/30 transition-shadow">
              Explore Products
              <PackageOpen className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground font-headline">Featured Products</h2>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured products available at the moment.</p>
        )}
      </section>

      <section className="py-12 bg-secondary/30 rounded-lg">
        <div className="container text-center">
            <h2 className="text-2xl font-semibold mb-4 text-secondary-foreground font-headline">Stay Connected</h2>
            <p className="text-muted-foreground mb-6">Follow us on social media and subscribe to our newsletter for the latest updates and offers.</p>
            <Link href="/contact" passHref>
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Contact Us
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
