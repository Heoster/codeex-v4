"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "./chat-view";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CodeexIcon } from "../icons";

export function ChatMessage({ message }: { message: Message }) {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  return (
    <div
      className={cn(
        "flex items-start gap-4",
        message.role === "user" ? "justify-end" : ""
      )}
    >
      {message.role === "assistant" && (
        <Avatar className="h-9 w-9 border-2 border-primary/50">
            <div className="bg-primary/20 h-full w-full flex items-center justify-center">
                <CodeexIcon className="h-6 w-6 text-primary"/>
            </div>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 text-sm shadow-sm",
          message.role === "user"
            ? "bg-card border-2 border-primary/20 text-card-foreground"
            : "bg-sidebar text-sidebar-foreground sparkle-animation"
        )}
      >
        {message.content}
      </div>
      {message.role === "user" && (
        <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar?.imageUrl} alt="User" data-ai-hint={userAvatar?.imageHint} />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
