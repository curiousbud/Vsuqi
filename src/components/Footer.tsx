
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

  // Example footer links, Dior has many.
  const footerSections = [
    {
      title: "Client Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Delivery", href: "#" },
        { name: "Returns", href: "#" },
        { name: "FAQ", href: "#" },
      ]
    },
    {
      title: "The House Of " + siteConfig.companyName,
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Legal Mentions", href: "#" },
      ]
    }
  ];

  return (
    <footer className="border-t border-foreground/10 bg-background text-foreground">
      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-lg font-medium mb-4 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-foreground/70 mb-3">Subscribe to our newsletter for exclusive updates.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Email address" className="bg-secondary border-foreground/20 focus:border-foreground/50 focus:ring-foreground/50 text-sm placeholder:text-foreground/50" />
              <Button type="submit" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/80 text-sm shrink-0">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-foreground/60 mb-4 md:mb-0 order-2 md:order-1">
            &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-3 order-1 md:order-2 mb-4 md:mb-0">
            {siteConfig.socialLinks.map((social) => {
              const Icon = iconComponents[social.name];
              if (!Icon) return null;

              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.companyName} on ${social.name}`}>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Icon className="h-4 w-4 text-foreground/70 hover:text-foreground transition-colors" />
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
