
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingBag as BagIcon, Coins } from 'lucide-react'; // Renamed ShoppingBag to BagIcon
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContext, useState } from 'react';
import { CurrencyContext } from '@/context/CurrencyContext';
import type { Currency } from '@/context/CurrencyContext';
import siteConfig from '@/config/site.json';
import { cn } from '@/lib/utils';

const NavLink = ({ href, children, isMobile = false, onClick }: { href: string; children: React.ReactNode; isMobile?: boolean; onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button
      variant="ghost"
      className={cn(
        "font-medium text-sm uppercase tracking-wider hover:bg-transparent hover:text-foreground/70",
        isMobile ? "w-full justify-start py-3 text-base" : "px-3 py-2"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  </Link>
);

const NavLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void }) => (
  <>
    <NavLink href="/" isMobile={isMobile} onClick={onLinkClick}>Home</NavLink>
    <NavLink href="/products" isMobile={isMobile} onClick={onLinkClick}>Products</NavLink>
    <NavLink href="/contact" isMobile={isMobile} onClick={onLinkClick}>Contact</NavLink>
  </>
);

export default function Header() {
  const currencyContext = useContext(CurrencyContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  if (!currencyContext) {
    return null; // Or a loading/error state
  }

  const { selectedCurrency, setSelectedCurrency, currencies } = currencyContext;

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const CurrencySelector = ({ inSheet = false }: { inSheet?: boolean }) => (
    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
      <SelectTrigger
        className={cn(
          "w-auto min-w-[70px] border-0 border-b border-foreground/20 rounded-none shadow-none focus:ring-0 text-xs uppercase",
          "hover:border-foreground/50 focus:border-foreground/50 bg-transparent",
          inSheet ? "w-full justify-start text-sm py-2" : "px-1"
        )}
        aria-label="Select currency"
      >
        <Coins className={cn("h-3 w-3 mr-1 text-foreground/70", inSheet && "h-4 w-4")} />
        <SelectValue placeholder="CUR" />
      </SelectTrigger>
      <SelectContent className="bg-background border-border min-w-[100px]">
        {currencies.map((currency: Currency) => (
          <SelectItem key={currency.code} value={currency.code} className="text-xs uppercase focus:bg-secondary">
            {currency.code} ({currency.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-foreground/10">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-foreground/10">
                  <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.companyName} Home`} onClick={closeMobileMenu}>
                     {siteConfig.logoUrl ? (
                        <Image
                          src={siteConfig.logoUrl}
                          alt={siteConfig.companyLogoAltText || siteConfig.companyName}
                          width={100}
                          height={26}
                          className="object-contain h-auto w-auto"
                        />
                      ) : (
                        <span className="font-serif text-xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
                      )}
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                       <X className="h-6 w-6 text-foreground" />
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-1 p-4">
                  <NavLinks isMobile onLinkClick={closeMobileMenu}/>
                </nav>
                <div className="mt-auto p-4 border-t border-foreground/10 space-y-4">
                   <CurrencySelector inSheet={true} />
                   <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                      <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                      <User className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                      <BagIcon className="h-5 w-5" />
                    </Button>
                   </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0">
          <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.companyName} Home`}>
            {siteConfig.logoUrl ? (
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.companyLogoAltText || siteConfig.companyName}
                width={120}
                height={32} // Adjust height for Dior-like logo proportion
                className="object-contain h-auto w-auto" // Adjust styling as needed
                priority
              />
            ) : (
              <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
            )}
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-2">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center">
            <CurrencySelector />
          </div>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex text-foreground/70 hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex text-foreground/70 hover:text-foreground">
            <User className="h-5 w-5" />
          </Button>
           <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <BagIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
