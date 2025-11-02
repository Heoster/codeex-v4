'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      // Wait until the user's auth state is determined
      return;
    }

    if (user) {
      // If user is logged in, try to redirect to the most recent chat
      const storedChats = localStorage.getItem(`chatHistory_${user.uid}`);
      if (storedChats) {
        try {
            const chats = JSON.parse(storedChats);
            if (chats.length > 0) {
                // Sort by timestamp descending and go to the latest one
                const latestChat = chats.sort((a: any, b: any) => b.timestamp - a.timestamp)[0];
                router.replace(`/chat/${latestChat.id}`);
                return;
            }
        } catch (e) {
            console.error("Could not parse chat history:", e);
        }
      }
      // Fallback to a default chat ID based on user UID if no history exists
      router.replace(`/chat/${user.uid}`);
    } else {
      // If user is not logged in, redirect to login page
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
