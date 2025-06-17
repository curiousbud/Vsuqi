
import Link from 'next/link';
import { ShoppingBag, Menu, X, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CurrencyConverterWidget from './CurrencyConverterWidget';

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
        
        <div className="flex items-center space-x-1"> {/* Reduced space for tighter grouping */}
          <nav className="hidden md:flex items-center space-x-1"> {/* Reduced space for tighter grouping */}
            <NavLinks />
          </nav>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open currency converter" className="hidden md:inline-flex"> {/* Desktop only for now */}
                <Coins className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-2 mr-2"> {/* Added margin for better positioning */}
              <CurrencyConverterWidget />
            </PopoverContent>
          </Popover>

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
                  {/* Currency converter could be added here for mobile if desired */}
                  <div className="mt-4 border-t pt-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Coins className="mr-2 h-4 w-4" /> Currency Converter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 mt-1">
                         <CurrencyConverterWidget />
                      </PopoverContent>
                    </Popover>
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
