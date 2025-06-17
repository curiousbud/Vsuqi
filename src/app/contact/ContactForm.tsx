
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateContactResponse, GenerateContactResponseInput, GenerateContactResponseOutput } from '@/ai/flows/generate-contact-response';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().optional().refine(value => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
    message: "Invalid phone number format."
  }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.'}).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

 useEffect(() => {
    const productName = searchParams.get('product');
    const productId = searchParams.get('productId');
    if (productName) {
      form.setValue('subject', `Inquiry about ${productName}`);
      form.setValue('message', `Hello, I'm interested in learning more about the product: ${productName} (ID: ${productId || 'N/A'}).\n\nPlease provide more details.\n\nThanks`);
    }
  }, [searchParams, form]);


  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    setAiResponse(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', values); // Keep for debugging

    // Show success toast
    toast({
      title: 'Message Sent',
      description: 'Thank you for your inquiry. We will be in touch shortly.',
      className: 'bg-background border-primary text-foreground', // Dior-like toast
    });
    
    setIsLoading(false);
    // Optionally reset form or keep filled for AI. For Dior aesthetic, usually reset.
    // form.reset(); 

    // AI Suggestion Generation
    setIsAiLoading(true);
    try {
      const aiInput: GenerateContactResponseInput = { query: `Subject: ${values.subject}\nMessage: ${values.message}\nFrom: ${values.name} (${values.email})` };
      const response: GenerateContactResponseOutput = await generateContactResponse(aiInput);
      setAiResponse(response.response);
    } catch (error) {
      console.error('Error generating AI response:', error);
      // For Dior, AI errors might be silent or a very subtle notification.
      // toast({
      //   title: 'AI Suggestion Error',
      //   description: 'Could not generate AI suggestion at this time.',
      //   variant: 'destructive',
      // });
      setAiResponse(null);
    } finally {
      setIsAiLoading(false);
    }
  }
  
  const inputClassName = "bg-secondary/50 border-foreground/20 focus:border-foreground/50 focus:ring-1 focus:ring-foreground/50 placeholder:text-foreground/50 text-sm";
  const labelClassName = "text-xs uppercase tracking-wider text-foreground/70 font-medium";


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} className={inputClassName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} className={inputClassName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 555 123 4567" {...field} className={inputClassName} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Briefly, what is this regarding?" {...field} className={inputClassName} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Your Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Please share details of your inquiry..." rows={5} {...field} className={`${inputClassName} min-h-[120px]`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm text-sm uppercase tracking-wider py-3 h-auto" disabled={isLoading || isAiLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send Message
          </Button>
        </form>
      </Form>

      {(isAiLoading || aiResponse) && (
        <Card className="mt-8 bg-secondary/30 border-foreground/10 rounded-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground font-serif text-lg">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              AI Suggested Reply
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              For internal reference, here&apos;s an AI-generated suggestion based on the query:
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAiLoading && !aiResponse && (
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating suggestion...</span>
              </div>
            )}
            {aiResponse && <p className="text-sm text-foreground/80 whitespace-pre-wrap">{aiResponse}</p>}
          </CardContent>
        </Card>
      )}
    </>
  );
}
