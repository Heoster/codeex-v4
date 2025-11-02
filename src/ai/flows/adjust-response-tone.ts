'use server';

/**
 * @fileOverview This file defines a Genkit flow for adjusting the tone of the AI assistant's responses.
 *
 * adjustResponseTone - A function that adjusts the response tone.
 * AdjustResponseToneInput - The input type for the adjustResponseTone function.
 * AdjustResponseToneOutput - The return type for the adjustResponseTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustResponseToneInputSchema = z.object({
  responseText: z.string().describe('The original response text from the AI assistant.'),
  tone: z.string().describe('The desired tone for the response (e.g., playful, professional, poetic).'),
});
export type AdjustResponseToneInput = z.infer<typeof AdjustResponseToneInputSchema>;

const AdjustResponseToneOutputSchema = z.object({
  adjustedResponseText: z.string().describe('The response text adjusted to the specified tone.'),
});
export type AdjustResponseToneOutput = z.infer<typeof AdjustResponseToneOutputSchema>;

export async function adjustResponseTone(input: AdjustResponseToneInput): Promise<AdjustResponseToneOutput> {
  return adjustResponseToneFlow(input);
}

const adjustResponseTonePrompt = ai.definePrompt({
  name: 'adjustResponseTonePrompt',
  input: {schema: AdjustResponseToneInputSchema},
  output: {schema: AdjustResponseToneOutputSchema},
  prompt: `You are an AI assistant that can adjust the tone of a given text.  Your task is to rewrite the following text to match the specified tone.

Original Text: {{{responseText}}}

Tone: {{{tone}}}

Adjusted Text:`, // Ensure the prompt ends in 'Adjusted Text:' to elicit the rewritten text.
});

const adjustResponseToneFlow = ai.defineFlow(
  {
    name: 'adjustResponseToneFlow',
    inputSchema: AdjustResponseToneInputSchema,
    outputSchema: AdjustResponseToneOutputSchema,
  },
  async input => {
    const {output} = await adjustResponseTonePrompt(input);
    return {
      adjustedResponseText: output!.adjustedResponseText,
    };
  }
);
