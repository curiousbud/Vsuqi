
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import siteConfig from '@/config/site.json';

// Map string names from siteConfig to Lucide icon components
const iconComponents: { [key: string]: LucideIcon } = {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          {siteConfig.socialLinks.map((social) => {
            const Icon = iconComponents[social.name];
            if (!Icon) return null; // Skip if icon not found in our map

            return (
              <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.companyName} on ${social.name}`}>
                <Button variant="ghost" size="icon">
                  <Icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
