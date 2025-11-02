import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
