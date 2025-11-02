'use server';

/**
 * @fileOverview Provides context-aware recommendations to the user based on the current conversation or task.
 *
 * - giveContextAwareRecommendations - A function that generates relevant recommendations.
 * - ContextAwareRecommendationsInput - The input type for the giveContextAwareRecommendations function.
 * - ContextAwareRecommendationsOutput - The return type for the giveContextAwareRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareRecommendationsInputSchema = z.object({
  conversationHistory: z.string().describe('The history of the conversation with the user.'),
  currentTask: z.string().describe('The current task the user is trying to accomplish.'),
});
export type ContextAwareRecommendationsInput = z.infer<typeof ContextAwareRecommendationsInputSchema>;

const ContextAwareRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of relevant resources or actions for the user.'),
});
export type ContextAwareRecommendationsOutput = z.infer<typeof ContextAwareRecommendationsOutputSchema>;

export async function giveContextAwareRecommendations(input: ContextAwareRecommendationsInput): Promise<ContextAwareRecommendationsOutput> {
  return contextAwareRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextAwareRecommendationsPrompt',
  input: {schema: ContextAwareRecommendationsInputSchema},
  output: {schema: ContextAwareRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant that provides context-aware recommendations to students.

  Based on the conversation history and the current task, suggest relevant resources or actions the user can take.

  Conversation History: {{{conversationHistory}}}
Current Task: {{{currentTask}}}

  Provide a list of recommendations that are directly related to the current task and conversation.
  The recommendations should be clear and actionable.

  Format the output as a JSON array of strings.
  `,
});

const contextAwareRecommendationsFlow = ai.defineFlow(
  {
    name: 'contextAwareRecommendationsFlow',
    inputSchema: ContextAwareRecommendationsInputSchema,
    outputSchema: ContextAwareRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
