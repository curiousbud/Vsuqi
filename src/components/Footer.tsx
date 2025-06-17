import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {currentYear} Vsuqi. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Vsuqi on ${social.name}`}>
              <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
