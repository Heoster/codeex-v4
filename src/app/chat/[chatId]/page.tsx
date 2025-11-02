import { ChatView } from "@/app/chat/chat-view";

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
    const { chatId } = await params;
    return <ChatView chatId={chatId} />;
}
