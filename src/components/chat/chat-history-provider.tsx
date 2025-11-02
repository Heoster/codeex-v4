'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

type Chat = {
  id: string;
  title: string;
  timestamp: number;
};

interface ChatHistoryContextType {
  chats: Chat[];
  addChat: (chat: Omit<Chat, 'timestamp' | 'title'> & { title?: string }) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
  getChatTitle: (chatId: string) => string;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const storedChats = localStorage.getItem(`chatHistory_${user.uid}`);
      if (storedChats) {
        setChats(JSON.parse(storedChats));
      } else {
        const defaultChat = { id: user.uid, title: 'New Chat', timestamp: Date.now() };
        setChats([defaultChat]);
        localStorage.setItem(`chatHistory_${user.uid}`, JSON.stringify([defaultChat]));
      }
    } else {
      setChats([]);
    }
  }, [user]);

  const addChat = useCallback((chat: Omit<Chat, 'timestamp' | 'title'> & { title?: string }) => {
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

  const deleteChat = useCallback((chatId: string) => {
    const updatedChats = chats.filter(c => c.id !== chatId);
    setChats(updatedChats);
    if (user) {
      localStorage.setItem(`chatHistory_${user.uid}`, JSON.stringify(updatedChats));
      localStorage.removeItem(`chat_${chatId}`);
    }

    // If the currently active chat is deleted, navigate to the most recent one or a new one
    if (window.location.pathname.includes(chatId)) {
        if (updatedChats.length > 0) {
            router.replace(`/chat/${updatedChats.sort((a,b) => b.timestamp - a.timestamp)[0].id}`);
        } else {
            router.replace(`/chat/${user?.uid || ''}`);
        }
    }

  }, [chats, user, router]);

  const renameChat = useCallback((chatId: string, newTitle: string) => {
    const updatedChats = chats.map(c => 
      c.id === chatId ? { ...c, title: newTitle } : c
    );
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
    <ChatHistoryContext.Provider value={{ chats, addChat, deleteChat, renameChat, getChatTitle }}>
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
