
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import Link from 'next/link';
import siteConfig from '@/config/site.json';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="animate-fadeIn">
      {/* Optional: Hero image for contact page */}
      <div className="relative h-[300px] md:h-[400px] bg-secondary/30">
        <Image
          src="https://placehold.co/1600x500.png"
          alt="Contact Us Banner"
          fill
          className="object-cover"
          data-ai-hint="customer service abstract"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center text-white text-shadow">
            Get In Touch
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <p className="text-center text-lg text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          <div className="space-y-8 p-6 md:p-8 bg-card rounded-sm border border-border/70 shadow-classic animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground border-b border-border pb-4">Our Information</h2>
            
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">Email Us</h3>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-foreground/80 hover:text-primary transition-colors break-all">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">Call Us</h3>
                <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MessageSquare className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">WhatsApp</h3>
                <Link href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Chat with us on WhatsApp
                </Link>
              </div>
            </div>

             <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">Visit Us</h3>
                <p className="text-sm text-foreground/80">{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-card rounded-sm border border-border/70 shadow-classic animate-fadeInUp animation-delay-200">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground border-b border-border pb-4 mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        <div className="text-center mt-16 md:mt-20">
          <p className="text-muted-foreground">We typically respond within 24-48 business hours.</p>
        </div>
      </div>
    </div>
  );
}
