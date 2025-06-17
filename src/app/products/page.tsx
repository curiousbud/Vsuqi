
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export default function ProductListingPage() {
  const products = getAllProducts();

  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-serif mb-12 md:mb-16 text-center text-foreground">
        All Products
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
          {products.map((product, index) => (
             <div key={product.id} className="animate-fadeInUp" style={{ animationDelay: `${100 + index * 100}ms`}}>
                <ProductCard product={product} />
              </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No products found. Please check back later.</p>
      )}
    </div>
  );
}
