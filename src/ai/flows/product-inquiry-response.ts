// 'use server'
'use server';

/**
 * @fileOverview Responds to product inquiries submitted through a form.
 *
 * - productInquiryResponse - A function that handles the product inquiry and generates a response.
 * - ProductInquiryInput - The input type for the productInquiryResponse function.
 * - ProductInquiryOutput - The return type for the productInquiryResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductInquiryInputSchema = z.object({
  inquiry: z
    .string()
    .describe('The product inquiry submitted by the user.'),
});
export type ProductInquiryInput = z.infer<typeof ProductInquiryInputSchema>;

const ProductInquiryOutputSchema = z.object({
  response: z
    .string()
    .describe('The response to the product inquiry.'),
});
export type ProductInquiryOutput = z.infer<typeof ProductInquiryOutputSchema>;

export async function productInquiryResponse(input: ProductInquiryInput): Promise<ProductInquiryOutput> {
  return productInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productInquiryPrompt',
  input: {schema: ProductInquiryInputSchema},
  output: {schema: ProductInquiryOutputSchema},
  prompt: `You are a customer support agent for an e-commerce store.  A user has submitted the following product inquiry.  Respond to the inquiry in a helpful and informative way.  If the inquiry is about an order, ask for the order number. If it is about a specific product, provide details about the product.

Inquiry: {{{inquiry}}}`,
});

const productInquiryFlow = ai.defineFlow(
  {
    name: 'productInquiryFlow',
    inputSchema: ProductInquiryInputSchema,
    outputSchema: ProductInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
