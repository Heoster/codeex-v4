"use client";

import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { answerQuestionsWithLiveInfo } from "@/ai/flows/answer-questions-live-info";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatView({ chatId }: { chatId: string }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage: Message = { id: "1", role: "assistant", content: "Greetings! I am CODEEX AI, your magical companion. How may I assist you today?" };
    setMessages([initialMessage]);
  }, [chatId]);


  const handleSend = async (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
        const response = await answerQuestionsWithLiveInfo({ query: content });
        const aiMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response.answer };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        console.error("Error getting AI response:", error);
        const errorMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I encountered a bit of magical interference. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
  React.useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
