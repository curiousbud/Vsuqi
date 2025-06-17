
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingBag as BagIcon, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContext, useState } from 'react';
import { CurrencyContext } from '@/context/CurrencyContext';
import type { Currency } from '@/context/CurrencyContext';
import siteConfig from '@/config/site.json';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

const NavLink = ({ href, children, isMobile = false, onClick }: { href: string; children: React.ReactNode; isMobile?: boolean; onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button
      variant="ghost"
      className={cn(
        "font-medium text-xs uppercase tracking-wider hover:bg-transparent hover:text-foreground/70 transition-colors duration-300",
        isMobile ? "w-full justify-start py-3 px-4 text-sm" : "px-3 py-2"
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
    {/* Add more Dior-like nav links if needed e.g. "New In", "Collections" */}
  </>
);

export default function Header() {
  const currencyContext = useContext(CurrencyContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currencyContext) {
    return null; 
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
          "w-auto min-w-[60px] border-0 shadow-none focus:ring-0 text-xs uppercase bg-transparent",
          "hover:text-foreground/70 focus:text-foreground/90",
          inSheet ? "w-full justify-start text-sm py-2 px-0" : "px-1 text-foreground/80"
        )}
        aria-label="Select currency"
      >
        <Coins className={cn("h-3.5 w-3.5 mr-1 text-foreground/70", inSheet && "h-4 w-4")} />
        <SelectValue placeholder="CUR" />
      </SelectTrigger>
      <SelectContent className="bg-background border-border min-w-[100px] shadow-subtle">
        {currencies.map((currency: Currency) => (
          <SelectItem key={currency.code} value={currency.code} className="text-xs uppercase focus:bg-secondary">
            {currency.code} ({currency.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  
  const iconButtonClasses = "text-foreground/70 hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className={iconButtonClasses}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-foreground/10 flex flex-col">
              <SheetHeader className="flex flex-row justify-between items-center p-4 border-b border-foreground/10">
                 <Link href="/" className="flex items-center" aria-label={`${siteConfig.companyName} Home`} onClick={closeMobileMenu}>
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
                     <Button variant="ghost" size="icon" aria-label="Close menu" className={iconButtonClasses}>
                       <X className="h-5 w-5" />
                     </Button>
                </SheetClose>
                 <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-grow">
                <nav className="flex flex-col space-y-1 p-4">
                  <NavLinks isMobile onLinkClick={closeMobileMenu}/>
                </nav>
              </ScrollArea>
              <div className="mt-auto p-4 border-t border-foreground/10 space-y-3">
                   <CurrencySelector inSheet={true} />
                   <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-9 h-9")}>
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-9 h-9")}>
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-9 h-9")}>
                      <BagIcon className="h-4 w-4" />
                    </Button>
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
                height={30} 
                className="object-contain h-auto w-auto"
                priority
              />
            ) : (
              <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
            )}
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="hidden md:flex items-center">
            <CurrencySelector />
          </div>
          <Button variant="ghost" size="icon" className={cn("hidden lg:inline-flex", iconButtonClasses)}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className={cn("hidden lg:inline-flex", iconButtonClasses)}>
            <User className="h-4 w-4" />
          </Button>
           <Button variant="ghost" size="icon" className={iconButtonClasses}>
            <BagIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
