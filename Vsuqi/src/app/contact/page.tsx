
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import siteConfig from '@/config/site.json';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground font-headline">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-6 p-6 bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground border-b pb-3">Contact Information</h2>
          
          <div className="flex items-start space-x-3">
            <Mail className="h-6 w-6 text-primary-foreground mt-1" />
            <div>
              <h3 className="font-medium text-foreground">Email Us</h3>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary-foreground transition-colors">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="h-6 w-6 text-primary-foreground mt-1" />
            <div>
              <h3 className="font-medium text-foreground">Call Us</h3>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-muted-foreground hover:text-primary-foreground transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MessageSquare className="h-6 w-6 text-primary-foreground mt-1" />
            <div>
              <h3 className="font-medium text-foreground">WhatsApp</h3>
              <Link href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                Chat with us
              </Link>
            </div>
          </div>

           <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-primary-foreground mt-1" />
            <div>
              <h3 className="font-medium text-foreground">Our Office</h3>
              <p className="text-muted-foreground">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground border-b pb-3 mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">We typically respond within 24-48 hours.</p>
      </div>
    </div>
  );
}
