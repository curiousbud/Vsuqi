import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-6 w-36 mb-6 bg-muted-foreground/30" />
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <Skeleton className="aspect-square w-full rounded-lg bg-muted-foreground/30" />
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded bg-muted-foreground/30" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="h-6 w-24 mb-2 bg-muted-foreground/30" /> {/* Badge */}
          <Skeleton className="h-10 w-3/4 bg-muted-foreground/30" /> {/* Title */}
          <Skeleton className="h-8 w-1/3 bg-muted-foreground/30" /> {/* Price */}
          
          <Skeleton className="h-px w-full my-4 bg-muted-foreground/30" /> {/* Separator */}

          <div>
            <Skeleton className="h-7 w-1/4 mb-2 bg-muted-foreground/30" /> {/* Description Title */}
            <Skeleton className="h-5 w-full mb-1 bg-muted-foreground/30" />
            <Skeleton className="h-5 w-full mb-1 bg-muted-foreground/30" />
            <Skeleton className="h-5 w-5/6 bg-muted-foreground/30" />
          </div>
          
          <Skeleton className="h-12 w-full bg-muted-foreground/30" /> {/* Button */}
        </div>
      </div>
    </div>
  );
}
