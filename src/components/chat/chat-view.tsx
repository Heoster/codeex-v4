'use client';

import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { answerQuestionsWithLiveInfo } from '@/ai/flows/answer-questions-live-info';
import { useChatMode } from './chat-mode-provider';
import { adjustResponseTone } from '@/ai/flows/adjust-response-tone';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatView({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { mode, getSystemPrompt } = useChatMode();

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content:
        'Greetings! I am CODEEX AI, your magical companion. How may I assist you today?',
    };
    setMessages([initialMessage]);
  }, [chatId]);

  useEffect(() => {
    async function setInitialTone() {
      const welcomeMessage = "Greetings! I am CODEEX AI, your magical companion. How may I assist you today?";
      const tone = mode === 'magical' ? 'whimsical and enchanting' : mode === 'jarvis' ? 'formal and professional' : 'like a CLI';

      const adjustedResponse = await adjustResponseTone({
          responseText: welcomeMessage,
          tone: tone,
      });

      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: adjustedResponse.adjustedResponseText,
        },
      ]);
    }
    setInitialTone();
  }, [mode]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // First get the base answer
      const response = await answerQuestionsWithLiveInfo({ query: content, systemPrompt: getSystemPrompt() });
      
      // Then adjust the tone
      const tone = mode === 'magical' ? 'whimsical and enchanting' : mode === 'jarvis' ? 'formal and professional' : 'like a CLI';
      const adjustedResponse = await adjustResponseTone({
          responseText: response.answer,
          tone: tone,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: adjustedResponse.adjustedResponseText,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered a bit of magical interference. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{
                id: 'loading',
                role: 'assistant',
                content: 'Conjuring a response...',
              }}
            />
          )}
        </div>
      </ScrollArea>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
