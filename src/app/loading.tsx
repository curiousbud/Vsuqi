
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-foreground">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-md text-muted-foreground">Loading...</p>
    </div>
  );
}
