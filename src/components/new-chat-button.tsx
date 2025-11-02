"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

function generateChatId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function NewChatButton() {
    const router = useRouter();

    const createNewChat = () => {
        const chatId = generateChatId();
        router.push(`/chat/${chatId}`);
    }

    return (
        <Button onClick={createNewChat} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
        </Button>
    )
}
