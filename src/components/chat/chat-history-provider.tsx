'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useUser } from '@/firebase';

type Chat = {
  id: string;
  title: string;
  timestamp: number;
};

interface ChatHistoryContextType {
  chats: Chat[];
  addChat: (chat: Omit<Chat, 'timestamp' | 'title'> & { title?: string }) => void;
  getChatTitle: (chatId: string) => string;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (user) {
      const storedChats = localStorage.getItem(`chatHistory_${user.uid}`);
      if (storedChats) {
        setChats(JSON.parse(storedChats));
      } else {
        // If no history, create a default chat session using the user's UID
        const defaultChat = { id: user.uid, title: 'New Chat', timestamp: Date.now() };
        setChats([defaultChat]);
        localStorage.setItem(`chatHistory_${user.uid}`, JSON.stringify([defaultChat]));
      }
    } else {
      // Clear chats if user logs out
      setChats([]);
    }
  }, [user]);

  const addChat = useCallback((chat: Omit<Chat, 'timestamp' | 'title'> & { title?: string }) => {
    // Prevent adding a chat that already exists
    if (chats.some(c => c.id === chat.id)) return;

    const newChat = { 
      ...chat, 
      title: chat.title || 'New Chat', 
      timestamp: Date.now() 
    };
    
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    if (user) {
      localStorage.setItem(`chatHistory_${user.uid}`, JSON.stringify(updatedChats));
    }
  }, [chats, user]);

  const getChatTitle = useCallback((chatId: string): string => {
    const chat = chats.find(c => c.id === chatId);
    return chat?.title || 'Chat';
  }, [chats]);

  return (
    <ChatHistoryContext.Provider value={{ chats, addChat, getChatTitle }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}
