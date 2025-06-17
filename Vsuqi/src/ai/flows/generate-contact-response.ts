'use server';

/**
 * @fileOverview An AI agent for generating contact responses.
 *
 * - generateContactResponse - A function that generates contact responses.
 * - GenerateContactResponseInput - The input type for the generateContactResponse function.
 * - GenerateContactResponseOutput - The return type for the generateContactResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContactResponseInputSchema = z.object({
  query: z.string().describe('The query from the user.'),
});
export type GenerateContactResponseInput = z.infer<
  typeof GenerateContactResponseInputSchema
>;

const GenerateContactResponseOutputSchema = z.object({
  response: z.string().describe('The suggested response to the user query.'),
});
export type GenerateContactResponseOutput = z.infer<
  typeof GenerateContactResponseOutputSchema
>;

export async function generateContactResponse(
  input: GenerateContactResponseInput
): Promise<GenerateContactResponseOutput> {
  return generateContactResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContactResponsePrompt',
  input: {schema: GenerateContactResponseInputSchema},
  output: {schema: GenerateContactResponseOutputSchema},
  prompt: `You are a user support representative. Please provide a suggested response to the following query:

Query: {{{query}}}

Suggested Response: `,
});

const generateContactResponseFlow = ai.defineFlow(
  {
    name: 'generateContactResponseFlow',
    inputSchema: GenerateContactResponseInputSchema,
    outputSchema: GenerateContactResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
