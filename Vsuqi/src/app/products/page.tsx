import ProductCard from '@/components/ProductCard';
import { getAllProducts, Product } from '@/lib/products';

export default function ProductListingPage() {
  const products = getAllProducts();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground font-headline">Our Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No products found. Please check back later.</p>
      )}
    </div>
  );
}
