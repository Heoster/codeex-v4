'use server';

/**
 * @fileOverview An AI agent that answers questions by searching and synthesizing information from the live internet.
 *
 * - answerQuestionsWithLiveInfo - A function that answers questions using live internet information.
 * - AnswerQuestionsWithLiveInfoInput - The input type for the answerQuestionsWithLiveInfo function.
 * - AnswerQuestionsWithLiveInfoOutput - The return type for the answerQuestionsWithLiveInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsWithLiveInfoInputSchema = z.object({
  query: z.string().describe('The question to answer using live internet information.'),
  systemPrompt: z.string().optional().describe('An optional system prompt to guide the AI\'s persona and response style.'),
});
export type AnswerQuestionsWithLiveInfoInput = z.infer<
  typeof AnswerQuestionsWithLiveInfoInputSchema
>;

const AnswerQuestionsWithLiveInfoOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, synthesized from live internet search results.'),
});
export type AnswerQuestionsWithLiveInfoOutput = z.infer<
  typeof AnswerQuestionsWithLiveInfoOutputSchema
>;

export async function answerQuestionsWithLiveInfo(
  input: AnswerQuestionsWithLiveInfoInput
): Promise<AnswerQuestionsWithLiveInfoOutput> {
  return answerQuestionsWithLiveInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsWithLiveInfoPrompt',
  input: {schema: AnswerQuestionsWithLiveInfoInputSchema},
  output: {schema: AnswerQuestionsWithLiveInfoOutputSchema},
  system: `{{{systemPrompt}}}`,
  prompt: `You are an AI assistant that answers questions.

  Question: {{{query}}}
  `,
});

const answerQuestionsWithLiveInfoFlow = ai.defineFlow(
  {
    name: 'answerQuestionsWithLiveInfoFlow',
    inputSchema: AnswerQuestionsWithLiveInfoInputSchema,
    outputSchema: AnswerQuestionsWithLiveInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
