'use server';
/**
 * @fileOverview An AI agent that can solve quizzes and handle calculations.
 *
 * - solveQuizOrCalc - A function that handles quizzes and calculations.
 * - SolveQuizOrCalcInput - The input type for the solveQuizOrCalc function.
 * - SolveQuizOrCalcOutput - The return type for the solveQuizOrCalc function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SolveQuizOrCalcInputSchema = z.object({
  query: z.string().describe('The quiz question or calculation problem to solve.'),
});
export type SolveQuizOrCalcInput = z.infer<typeof SolveQuizOrCalcInputSchema>;

const SolveQuizOrCalcOutputSchema = z.object({
  solution: z.string().describe('The solution to the quiz or calculation.'),
});
export type SolveQuizOrCalcOutput = z.infer<typeof SolveQuizOrCalcOutputSchema>;

export async function solveQuizOrCalc(input: SolveQuizOrCalcInput): Promise<SolveQuizOrCalcOutput> {
  return solveQuizOrCalcFlow(input);
}

const calculatorTool = ai.defineTool(
  {
    name: 'calculator',
    description: 'Solves mathematical expressions.',
    inputSchema: z.object({
      expression: z.string().describe('The mathematical expression to evaluate.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      // WARNING: Using eval is a security risk in a real app. 
      // This is a simplified example. Use a proper math library in production.
      const result = eval(input.expression);
      return result.toString();
    } catch (error: any) {
      return `Error evaluating expression: ${error.message}`;
    }
  }
);


const prompt = ai.definePrompt({
  name: 'solveQuizOrCalcPrompt',
  input: { schema: SolveQuizOrCalcInputSchema },
  output: { schema: SolveQuizOrCalcOutputSchema },
  tools: [calculatorTool],
  system: `You are an expert at solving quizzes and handling calculations.
If you need to perform a calculation, use the calculator tool.
For quiz questions, provide a direct and accurate answer.`,
  prompt: `Solve the following: {{{query}}}`,
});


const solveQuizOrCalcFlow = ai.defineFlow(
  {
    name: 'solveQuizOrCalcFlow',
    inputSchema: SolveQuizOrCalcInputSchema,
    outputSchema: SolveQuizOrCalcOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return {
        solution: output!.solution
    };
  }
);
