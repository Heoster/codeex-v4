'use client';

import { ModeSwitcher } from "@/components/mode-switcher";
import { UserNav } from "@/components/user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NewChatButton } from "./new-chat-button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-between">
        <NewChatButton />
        <div className="flex items-center gap-4">
            <ModeSwitcher />
            <UserNav />
        </div>
      </div>
    </header>
  );
}
