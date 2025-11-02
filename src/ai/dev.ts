import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-notifications.ts';
import '@/ai/flows/rate-ai-responses.ts';
import '@/ai/flows/answer-questions-live-info.ts';
import '@/ai/flows/execute-complex-commands.ts';
import '@/ai/flows/adjust-response-tone.ts';
import '@/ai/flows/summarize-documents.ts';
import '@/ai/flows/summarize-uploaded-files.ts';
import '@/ai/flows/view-and-reuse-prompts.ts';
import '@/ai/flows/context-aware-recommendations.ts';