"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BotMessageSquare,
  History,
  LayoutDashboard,
  Settings,
  Shapes,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Separator } from "./ui/separator";

const menuItems = [
  { href: "/chat", label: "Chat", icon: BotMessageSquare },
  { href: "/tools", label: "Tools", icon: Shapes },
  { href: "/history", label: "History", icon: History },
  { href: "/learning", label: "Learning Paths", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="hidden flex-col gap-2 p-2 group-data-[state=expanded]:flex">
            <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium">
                <UserNav />
                <div className="flex flex-col">
                    <span className="font-medium">User</span>
                    <span className="text-xs text-muted-foreground">user@example.com</span>
                </div>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
