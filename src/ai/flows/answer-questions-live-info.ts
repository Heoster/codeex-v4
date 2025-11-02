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

const searchTool = ai.defineTool({
  name: 'webSearch',
  description: 'Searches the web for relevant information.',
  inputSchema: z.object({
    query: z.string().describe('The search query.'),
  }),
  outputSchema: z.string(),
},
async (input) => {
  // Replace with actual web search implementation
  // This placeholder just returns a canned response for demonstration purposes
  return `Web search results for "${input.query}": Placeholder search results.  The current date is October 26, 2024.`
});

const prompt = ai.definePrompt({
  name: 'answerQuestionsWithLiveInfoPrompt',
  tools: [searchTool],
  input: {schema: AnswerQuestionsWithLiveInfoInputSchema},
  output: {schema: AnswerQuestionsWithLiveInfoOutputSchema},
  prompt: `You are an AI assistant that answers questions using information from the live internet.

  First, use the webSearch tool to search for information related to the question.
  Then, synthesize the search results into a concise and accurate answer.

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
