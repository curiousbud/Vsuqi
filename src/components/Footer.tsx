
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import siteConfig from '@/config/site.json';
import { Input } from './ui/input';

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
      title: "Client Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Delivery & Returns", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Track My Order", href: "#" },
      ]
    },
    {
      title: "The House Of " + siteConfig.companyName,
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Legal Mentions", href: "#" },
        { name: "Sitemap", href: "#" },
      ]
    }
  ];

  return (
    <footer className="border-t border-foreground/10 bg-background text-foreground">
      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-sm font-medium mb-4 uppercase tracking-wider text-foreground/90">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-serif text-sm font-medium mb-4 uppercase tracking-wider text-foreground/90">Newsletter</h3>
            <p className="text-xs text-foreground/70 mb-4">Be the first to know about new collections and exclusive events.</p>
            <form className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-secondary/50 border-foreground/20 focus:border-foreground/50 focus:ring-foreground/50 text-xs placeholder:text-foreground/50 h-9" 
              />
              <Button 
                type="submit" 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-wider shrink-0 h-9 px-4"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-foreground/60 mb-4 md:mb-0 order-2 md:order-1">
            &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 order-1 md:order-2 mb-4 md:mb-0">
            {siteConfig.socialLinks.map((social) => {
              const Icon = iconComponents[social.name];
              if (!Icon) return null;

              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.companyName} on ${social.name}`}>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-foreground/60 hover:text-foreground transition-colors">
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
