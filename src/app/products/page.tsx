
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import { Filter } from 'lucide-react'; // Example icon for filters
import { Button } from '@/components/ui/button';

export default function ProductListingPage() {
  const products = getAllProducts();

  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 animate-fadeIn">
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
          Our Collection
        </h1>
        <p className="text-md text-muted-foreground mt-2">
          Explore timeless pieces crafted with precision and passion.
        </p>
      </div>

      {/* Optional: Filters and Sorting - Placeholder */}
      {/* 
      <div className="flex justify-between items-center mb-8 md:mb-10">
        <Button variant="outline" className="text-xs rounded-sm">
          <Filter className="mr-2 h-3.5 w-3.5" /> Filters
        </Button>
        <p className="text-sm text-muted-foreground">{products.length} products</p>
      </div>
      */}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
          {products.map((product, index) => (
             <div key={product.id} className="animate-fadeInUp perspective-1000" style={{ animationDelay: `${100 + index * 80}ms`}}>
                <ProductCard product={product} />
              </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">No products found. Please check back later.</p>
      )}
    </div>
  );
}
