'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ChatMode = "magical" | "jarvis" | "cli";

interface ChatModeContextType {
  mode: ChatMode;
  setMode: (mode: ChatMode) => void;
  getSystemPrompt: () => string;
}

const ChatModeContext = createContext<ChatModeContextType | undefined>(undefined);

export function ChatModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ChatMode>('magical');

  const getSystemPrompt = (): string => {
    switch (mode) {
      case 'jarvis':
        return 'You are Jarvis, a sophisticated and professional AI assistant. Your tone is formal, precise, and helpful.';
      case 'cli':
        return 'You are a command-line interface. Respond in a concise, technical manner, as if you were a terminal output. Use monospace fonts and code blocks where appropriate.';
      case 'magical':
      default:
        return 'You are CODEEX AI, a magical and enchanting AI companion. Your tone is whimsical, creative, and full of wonder.';
    }
  };

  return (
    <ChatModeContext.Provider value={{ mode, setMode, getSystemPrompt }}>
      {children}
    </ChatModeContext.Provider>
  );
}

export function useChatMode() {
  const context = useContext(ChatModeContext);
  if (context === undefined) {
    throw new Error('useChatMode must be used within a ChatModeProvider');
  }
  return context;
}
