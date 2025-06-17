
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingBag as BagIcon, Coins, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '@/context/CurrencyContext';
import type { Currency } from '@/context/CurrencyContext';
import siteConfig from '@/config/site.json';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { usePathname } from 'next/navigation';

const NavLink = ({ 
  href, 
  children, 
  isMobile = false, 
  onClick,
  isActive 
}: { 
  href: string; 
  children: React.ReactNode; 
  isMobile?: boolean; 
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <Link href={href} passHref>
    <Button
      variant="ghost"
      className={cn(
        "font-medium text-xs uppercase tracking-wider hover:bg-transparent transition-colors duration-300",
        isActive ? "text-primary hover:text-primary/80" : "text-foreground/70 hover:text-foreground",
        isMobile ? "w-full justify-start py-3 px-4 text-sm" : "px-3 py-2"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  </Link>
);

const NavLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    // { href: "/collections", label: "Collections" }, // Example for LP style
    // { href: "/new-arrivals", label: "New Arrivals" }, // Example for LP style
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {links.map(link => (
        <NavLink 
          key={link.href} 
          href={link.href} 
          isMobile={isMobile} 
          onClick={onLinkClick}
          isActive={pathname === link.href || (link.href === "/products" && pathname.startsWith("/products"))}
        >
          {link.label}
        </NavLink>
      ))}
    </>
  );
};


export default function Header() {
  const currencyContext = useContext(CurrencyContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          "w-auto min-w-[70px] border-0 shadow-none focus:ring-0 text-xs uppercase bg-transparent rounded-none h-auto py-1",
          "hover:text-primary focus:text-primary",
          inSheet ? "w-full justify-start text-sm px-0" : "px-1 text-foreground/80"
        )}
        aria-label="Select currency"
      >
        <Coins className={cn("h-3.5 w-3.5 mr-1.5 text-foreground/70", inSheet && "h-4 w-4")} />
        <SelectValue placeholder="CUR" />
      </SelectTrigger>
      <SelectContent className="bg-background border-border min-w-[120px] shadow-classic rounded-none">
        {currencies.map((currency: Currency) => (
          <SelectItem key={currency.code} value={currency.code} className="text-xs uppercase focus:bg-secondary py-1.5">
            {currency.code} ({currency.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  
  const iconButtonClasses = "text-foreground/70 hover:text-primary transition-colors rounded-full";
  const headerBaseClasses = "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out";
  const headerScrolledClasses = "bg-background/95 backdrop-blur-md shadow-md supports-[backdrop-filter]:bg-background/80 border-b border-border";
  const headerTopClasses = "bg-transparent border-b border-transparent";


  return (
    <header className={cn(headerBaseClasses, isScrolled ? headerScrolledClasses : headerTopClasses)}>
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(iconButtonClasses, "w-8 h-8")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-border flex flex-col rounded-none">
              <SheetHeader className="flex flex-row justify-between items-center p-4 border-b border-border">
                 <Link href="/" className="flex items-center" aria-label={`${siteConfig.companyName} Home`} onClick={closeMobileMenu}>
                     {siteConfig.logoUrl ? (
                        <Image
                          src={siteConfig.logoUrl}
                          alt={siteConfig.companyLogoAltText || siteConfig.companyName}
                          width={120} 
                          height={30} 
                          className="object-contain h-auto"
                        />
                      ) : (
                        <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
                      )}
                  </Link>
                <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu" className={cn(iconButtonClasses, "w-8 h-8")}>
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
              <div className="mt-auto p-4 border-t border-border space-y-4">
                   <CurrencySelector inSheet={true} />
                   <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-8 h-8")}>
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-8 h-8")}>
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-8 h-8")}>
                      <BagIcon className="h-4 w-4" />
                    </Button>
                   </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.companyName} Home`}>
            {siteConfig.logoUrl ? (
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.companyLogoAltText || siteConfig.companyName}
                width={150} // Adjusted for LP style
                height={38} 
                className="object-contain h-auto"
                priority
              />
            ) : (
              <span className="font-serif text-3xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
            )}
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="hidden md:flex items-center">
            <CurrencySelector />
          </div>
          <Button variant="ghost" size="icon" className={cn("hidden lg:inline-flex", iconButtonClasses, "w-8 h-8")}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className={cn("hidden lg:inline-flex", iconButtonClasses, "w-8 h-8")}>
            <User className="h-4 w-4" />
          </Button>
           <Button variant="ghost" size="icon" className={cn(iconButtonClasses, "w-8 h-8")}>
            <BagIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
