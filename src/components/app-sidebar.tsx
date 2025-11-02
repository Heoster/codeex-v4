"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BotMessageSquare,
  History,
  LayoutDashboard,
  Settings,
  Shapes,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { useUser } from "@/firebase";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat/chat-history";

const mainMenuItems = [
  { href: "/tools", label: "Tools", icon: Shapes },
  { href: "/learning", label: "Learning Paths", icon: LayoutDashboard },
];

const secondaryMenuItems = [
    { href: "/history", label: "All Chats", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex flex-col">
        <div className="p-2">
            <NewChatButton />
        </div>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <ChatHistory />

        <div className="mt-auto">
            <SidebarMenu>
            {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </div>
        
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
