'use client';

import { useUser } from "@/firebase";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function generateChatId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If we are on /chat, redirect to a new chat
  useEffect(() => {
    if (user && window.location.pathname === '/chat') {
        const newChatId = generateChatId();
        router.replace(`/chat/${newChatId}`);
    }
  }, [user, router]);


  return (
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
  );
}
