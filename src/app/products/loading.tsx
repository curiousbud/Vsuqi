import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <Skeleton className="h-10 w-1/2 mx-auto bg-muted-foreground/30" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="bg-card rounded-lg shadow-md flex flex-col">
            <CardHeader className="p-0 relative">
              <Skeleton className="aspect-[4/3] w-full rounded-t-lg bg-muted-foreground/30" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2 bg-muted-foreground/30" />
              <Skeleton className="h-4 w-full mb-1 bg-muted-foreground/30" />
              <Skeleton className="h-4 w-5/6 bg-muted-foreground/30" />
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center border-t">
              <Skeleton className="h-8 w-1/3 bg-muted-foreground/30" />
              <Skeleton className="h-8 w-1/2 bg-muted-foreground/30" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
