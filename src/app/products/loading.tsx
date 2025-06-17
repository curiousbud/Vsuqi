
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <Skeleton className="h-12 w-1/2 md:w-1/3 mx-auto mb-12 md:mb-16 bg-muted/70" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="bg-card rounded-sm flex flex-col">
            <CardHeader className="p-0 relative">
              <Skeleton className="aspect-[3/4] w-full rounded-t-sm bg-muted/70" />
            </CardHeader>
            <CardContent className="p-4 flex-grow text-center">
              <Skeleton className="h-5 w-3/4 mx-auto mb-2 bg-muted/60" />
              <Skeleton className="h-3 w-full mx-auto mb-1 bg-muted/50" />
              <Skeleton className="h-3 w-5/6 mx-auto mb-3 bg-muted/50" />
              <Skeleton className="h-4 w-1/3 mx-auto bg-muted/60" />
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t-0">
              <Skeleton className="h-8 w-full bg-muted/50" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
