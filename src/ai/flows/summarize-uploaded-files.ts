'use server';

/**
 * @fileOverview A flow that summarizes uploaded files.
 *
 * - summarizeUploadedFiles - A function that handles the summarization of uploaded files.
 * - SummarizeUploadedFilesInput - The input type for the summarizeUploadedFiles function.
 * - SummarizeUploadedFilesOutput - The return type for the summarizeUploadedFiles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedFilesInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The file to summarize, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeUploadedFilesInput = z.infer<typeof SummarizeUploadedFilesInputSchema>;

const SummarizeUploadedFilesOutputSchema = z.object({
  summary: z.string().describe('The summary of the file.'),
});
export type SummarizeUploadedFilesOutput = z.infer<typeof SummarizeUploadedFilesOutputSchema>;

export async function summarizeUploadedFiles(input: SummarizeUploadedFilesInput): Promise<SummarizeUploadedFilesOutput> {
  return summarizeUploadedFilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedFilesPrompt',
  input: {schema: SummarizeUploadedFilesInputSchema},
  output: {schema: SummarizeUploadedFilesOutputSchema},
  prompt: `You are an expert summarizer. Please summarize the contents of the following file.

File: {{media url=fileDataUri}}`,
});

const summarizeUploadedFilesFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedFilesFlow',
    inputSchema: SummarizeUploadedFilesInputSchema,
    outputSchema: SummarizeUploadedFilesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
