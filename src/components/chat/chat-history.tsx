'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from '../ui/sidebar';
import { useChatHistory } from './chat-history-provider';

export function ChatHistory() {
  const { chats } = useChatHistory();
  const pathname = usePathname();

  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto">
        <SidebarSeparator />
        <SidebarMenu>
        {chats
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((chat) => (
            <SidebarMenuItem key={chat.id}>
                <Link href={`/chat/${chat.id}`} className="w-full">
                <SidebarMenuButton
                    isActive={pathname === `/chat/${chat.id}`}
                    tooltip={chat.title}
                >
                    <span className="truncate">{chat.title}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </div>
  );
}
