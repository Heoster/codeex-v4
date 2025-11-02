'use server';

/**
 * @fileOverview A flow for rating the helpfulness of AI responses.
 *
 * - rateAiResponse - A function that allows users to rate the helpfulness of an AI response.
 * - RateAiResponseInput - The input type for the rateAiResponse function.
 * - RateAiResponseOutput - The return type for the rateAiResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateAiResponseInputSchema = z.object({
  response: z.string().describe('The AI assistant response to rate.'),
  rating: z.number().min(1).max(5).describe('The rating given by the user (1-5).'),
  feedback: z.string().optional().describe('Optional feedback from the user.'),
});
export type RateAiResponseInput = z.infer<typeof RateAiResponseInputSchema>;

const RateAiResponseOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the rating was successfully recorded.'),
  message: z.string().describe('A message indicating the outcome of the rating process.'),
});
export type RateAiResponseOutput = z.infer<typeof RateAiResponseOutputSchema>;

export async function rateAiResponse(input: RateAiResponseInput): Promise<RateAiResponseOutput> {
  return rateAiResponseFlow(input);
}

const rateAiResponseFlow = ai.defineFlow(
  {
    name: 'rateAiResponseFlow',
    inputSchema: RateAiResponseInputSchema,
    outputSchema: RateAiResponseOutputSchema,
  },
  async input => {
    // In a real-world scenario, you would likely store the rating, feedback, and response
    // in a database or analytics system for further analysis and model improvement.
    // This is a simplified example that just returns a success message.

    // Simulate a successful rating process.
    return {
      success: true,
      message: `Thank you for rating the AI response. Your feedback is valuable! Rating: ${input.rating}, Feedback: ${input.feedback || 'None'}`,
    };
  }
);
