"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
    { id: "1", role: "assistant", content: "Greetings! I am CODEEX AI, your magical companion. How may I assist you today?" },
    { id: "2", role: "user", content: "Explain the concept of quantum entanglement in simple terms." },
    { id: "3", role: "assistant", content: "Of course! Imagine you have two magical, linked coins. No matter how far apart they are, if one lands on heads, the other will instantly land on tails. That's the essence of quantum entanglement – two particles linked in a way that their fates are intertwined, even across vast distances. Spooky, yet enchanting!" },
];

export function ChatView() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
        const aiMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "Thinking with my magic wand... one moment." };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    }, 1500);
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
