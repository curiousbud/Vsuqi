
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import Link from 'next/link';
import siteConfig from '@/config/site.json';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20 px-4 md:px-6 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 md:mb-16 text-foreground">Contact Us</h1>
      
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
        <div className="space-y-8 p-6 md:p-8 bg-card rounded-sm animate-fadeInUp">
          <h2 className="text-2xl font-serif text-foreground border-b border-foreground/10 pb-4">Our Information</h2>
          
          <div className="flex items-start space-x-4">
            <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-1">Email</h3>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-foreground/70 hover:text-primary transition-colors break-all">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-1">Phone</h3>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MessageSquare className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-1">WhatsApp</h3>
              <Link href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                Chat on WhatsApp
              </Link>
            </div>
          </div>

           <div className="flex items-start space-x-4">
            <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-1">Office Address</h3>
              <p className="text-sm text-foreground/70">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-card rounded-sm animate-fadeInUp animation-delay-200">
          <h2 className="text-2xl font-serif text-foreground border-b border-foreground/10 pb-4 mb-8">Send a Message</h2>
          <ContactForm />
        </div>
      </div>

      <div className="text-center mt-16 md:mt-20">
        <p className="text-muted-foreground">We aim to respond within 1-2 business days.</p>
      </div>
    </div>
  );
}
