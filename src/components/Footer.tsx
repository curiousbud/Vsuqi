
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import siteConfig from '@/config/site.json';
import { Input } from './ui/input';
import Image from 'next/image';

const iconComponents: { [key: string]: LucideIcon } = {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Track Order", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "Shipping Information", href: "#" },
        { name: "FAQs", href: "#" },
      ]
    },
    {
      title: "Our Company",
      links: [
        { name: `About ${siteConfig.companyName}`, href: "#" },
        { name: "Store Locator", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
      ]
    },
  ];

  return (
    <footer className="border-t border-border bg-background text-foreground/80">
      <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-2">
             <Link href="/" className="flex items-center gap-2 mb-6" aria-label={`${siteConfig.companyName} Home`}>
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={`${siteConfig.companyLogoAltText} Footer`}
                  width={150} 
                  height={38} 
                  className="object-contain h-auto"
                />
              ) : (
                <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">{siteConfig.companyName}</span>
              )}
            </Link>
            <p className="text-xs text-foreground/60 mb-6 max-w-md">
              Discover timeless elegance and superior craftsmanship with {siteConfig.companyName}. 
              Experience the epitome of style and sophistication.
            </p>
             <h3 className="font-serif text-sm font-semibold mb-3 uppercase tracking-wider text-foreground">Stay Updated</h3>
            <form className="flex items-center max-w-sm">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-secondary/50 border-border focus:border-primary focus:ring-primary text-xs placeholder:text-foreground/50 h-10 rounded-l-sm rounded-r-none flex-grow" 
              />
              <Button 
                type="submit" 
                variant="default" 
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs uppercase tracking-wider shrink-0 h-10 w-10 rounded-r-sm rounded-l-none"
                aria-label="Subscribe to newsletter"
              >
                <Send className="h-4 w-4"/>
              </Button>
            </form>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-xs text-foreground/60 text-center md:text-left">
            &copy; {currentYear} {siteConfig.companyName}. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-3">
            {siteConfig.socialLinks.map((social) => {
              const Icon = iconComponents[social.name];
              if (!Icon) return null;

              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.companyName} on ${social.name}`}>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-foreground/60 hover:text-primary transition-colors">
                    <Icon className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
