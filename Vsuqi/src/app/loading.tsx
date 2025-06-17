import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
      <p className="mt-4 text-lg text-muted-foreground">Loading content...</p>
    </div>
  );
}
