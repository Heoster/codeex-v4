"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useChatHistory } from "./chat/chat-history-provider";
import { useUser } from "@/firebase";

function generateChatId() {
    return Math.random().toString(36).substring(2, 15);
}

export function NewChatButton() {
    const router = useRouter();
    const { addChat } = useChatHistory();
    const { user } = useUser();

    const createNewChat = () => {
        if (!user) return;
        const chatId = generateChatId();
        addChat({ id: chatId, title: "New Chat" });
        router.push(`/chat/${chatId}`);
    }

    return (
        <Button onClick={createNewChat} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
        </Button>
    )
}
