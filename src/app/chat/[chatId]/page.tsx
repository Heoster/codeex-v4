import { ChatView } from "@/components/chat/chat-view";

export default function ChatPage({ params }: { params: { chatId: string } }) {
    return <ChatView chatId={params.chatId} />;
}
