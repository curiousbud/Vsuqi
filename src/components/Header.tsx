import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <>
    <Link href="/" passHref>
      <Button variant="ghost" className={`font-medium ${isMobile ? 'w-full justify-start' : ''}`}>Home</Button>
    </Link>
    <Link href="/products" passHref>
      <Button variant="ghost" className={`font-medium ${isMobile ? 'w-full justify-start' : ''}`}>Products</Button>
    </Link>
    <Link href="/contact" passHref>
      <Button variant="ghost" className={`font-medium ${isMobile ? 'w-full justify-start' : ''}`}>Contact</Button>
    </Link>
  </>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Vsuqi Home">
          <ShoppingBag className="h-7 w-7 text-primary-foreground bg-primary p-1 rounded-md" />
          <span className="font-bold text-xl text-foreground">Vsuqi</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          <NavLinks />
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-4">
                   <Link href="/" className="flex items-center gap-2" aria-label="Vsuqi Home">
                     <ShoppingBag className="h-7 w-7 text-primary-foreground bg-primary p-1 rounded-md" />
                     <span className="font-bold text-xl text-foreground">Vsuqi</span>
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                       <X className="h-6 w-6" />
                     </Button>
                  </SheetClose>
                </div>
                <NavLinks isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
