
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <Skeleton className="h-4 w-32 mb-8 md:mb-12 bg-muted/70" /> {/* Back link skeleton */}
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        <div>
          <Skeleton className="aspect-[3/4] w-full rounded-sm bg-muted/70" />
          {/* Thumbnails skeleton if used
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-sm bg-muted/60" />
            ))}
          </div>
          */}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-5 w-20 mb-1 bg-muted/60" /> {/* Badge */}
          <Skeleton className="h-10 w-3/4 bg-muted/70" /> {/* Title */}
          <Skeleton className="h-8 w-1/3 mb-4 bg-muted/70" /> {/* Price */}
          
          <Skeleton className="h-px w-full my-4 bg-muted/50" /> {/* Separator */}

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4 mb-2 bg-muted/60" /> {/* Description Title */}
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-5/6 bg-muted/50" />
          </div>
          
          <Skeleton className="h-12 w-full mt-4 bg-muted/70" /> {/* Button */}
           <Skeleton className="h-3 w-1/2 mx-auto bg-muted/50" /> {/* Small text below button */}
        </div>
      </div>
    </div>
  );
}
