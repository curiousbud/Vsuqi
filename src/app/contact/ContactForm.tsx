
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateContactResponse, GenerateContactResponseInput, GenerateContactResponseOutput } from '@/ai/flows/generate-contact-response';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().optional().refine(value => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
    message: "Invalid phone number format. (e.g., +1234567890 or 1234567890)"
  }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    setAiResponse(null);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', values);

    toast({
      title: 'Message Sent!',
      description: 'Thank you for your message. We will get back to you soon.',
    });
    
    setIsLoading(false);
    form.reset();

    // Trigger AI response generation
    setIsAiLoading(true);
    try {
      const aiInput: GenerateContactResponseInput = { query: values.message };
      const response: GenerateContactResponseOutput = await generateContactResponse(aiInput);
      setAiResponse(response.response);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: 'AI Error',
        description: 'Could not generate AI suggestion at this time.',
        variant: 'destructive',
      });
      setAiResponse(null);
    } finally {
      setIsAiLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 555 123 4567" {...field} />
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="How can we help you today?" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading || isAiLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Message
          </Button>
        </form>
      </Form>

      {(isAiLoading || aiResponse) && (
        <Card className="mt-8 bg-accent/50 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center text-accent-foreground">
              <Sparkles className="mr-2 h-5 w-5" />
              AI Suggested Response
            </CardTitle>
            <CardDescription>
              Here&apos;s a suggestion based on the query (for internal use or inspiration):
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAiLoading && !aiResponse && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating suggestion...</span>
              </div>
            )}
            {aiResponse && <p className="text-sm text-accent-foreground whitespace-pre-wrap">{aiResponse}</p>}
          </CardContent>
        </Card>
      )}
    </>
  );
}
