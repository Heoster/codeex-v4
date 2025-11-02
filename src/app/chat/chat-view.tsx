'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { answerQuestionsWithLiveInfo } from '@/ai/flows/answer-questions-live-info';
import { useChatMode } from './chat-mode-provider';
import { adjustResponseTone } from '@/ai/flows/adjust-response-tone';
import { useUser } from '@/firebase';
import { useChatHistory } from './chat-history-provider';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatView({ chatId }: { chatId: string }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { mode, getSystemPrompt } = useChatMode();
  const { getChatTitle, renameChat } = useChatHistory();

  // Load messages from local storage when the component mounts or chatId/user changes
  useEffect(() => {
    if (user && chatId) {
      const storedMessages = localStorage.getItem(`chat_${chatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        const welcomeMessage: Message = {
          id: '1',
          role: 'assistant',
          content: `Greetings! I am CODEEX AI. This is the start of your conversation in "${getChatTitle(chatId)}". How may I assist you today?`,
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [chatId, user, getChatTitle]);


  // Save messages to local storage whenever they change
  useEffect(() => {
    if (user && chatId && messages.length > 0) {
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
    }
  }, [messages, chatId, user]);


  useEffect(() => {
    async function setInitialTone() {
        const title = getChatTitle(chatId);
        // Do not reset messages if they already exist for this chat
        if (messages.length > 1 || (messages.length === 1 && messages[0].id !== '1')) return;

      const welcomeMessage = `Greetings! I am CODEEX AI. This is the start of your conversation in "${title}". How may I assist you today?`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, chatId, getChatTitle]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    
    // Check if this is the first user message in a new chat, and rename the chat
    const isFirstUserMessage = messages.length === 1 && messages[0].role === 'assistant';
    if(isFirstUserMessage) {
        const newTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
        renameChat(chatId, newTitle);
    }

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get the answer from the AI in the correct tone directly.
      const response = await answerQuestionsWithLiveInfo({ 
        query: content, 
        systemPrompt: getSystemPrompt() 
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
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

  useEffect(() => {
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
