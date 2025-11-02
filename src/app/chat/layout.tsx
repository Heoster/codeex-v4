'use client';

import { useUser } from "@/firebase";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ChatModeProvider } from "@/components/chat/chat-mode-provider";
import { ChatHistoryProvider } from "@/components/chat/chat-history-provider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    // If we are on /chat, redirect to the user's default chat
    if (user && pathname === '/chat') {
        const storedChats = localStorage.getItem(`chatHistory_${user.uid}`);
        if (storedChats) {
            const chats = JSON.parse(storedChats);
            if (chats.length > 0) {
                router.replace(`/chat/${chats.sort((a:any,b:any) => b.timestamp - a.timestamp)[0].id}`);
                return;
            }
        }
        router.replace(`/chat/${user.uid}`);
    }
  }, [user, router, pathname]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ChatModeProvider>
      <ChatHistoryProvider>
        <SidebarProvider>
            <div className="min-h-screen">
                <AppSidebar />
                <SidebarInset>
                    <AppHeader />
                    <main className="h-[calc(100vh-4rem)]">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
      </ChatHistoryProvider>
    </ChatModeProvider>
  );
}
