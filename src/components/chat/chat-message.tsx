"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "./chat-view";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CodeexIcon } from "../icons";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";
import React from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech";

export function ChatMessage({ message }: { message: Message }) {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
    const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    
    const handlePlayAudio = async () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
            return;
        }

        try {
            const response = await textToSpeech({ text: message.content });
            const newAudio = new Audio(response.audioDataUri);
            setAudio(newAudio);
            newAudio.play();
            setIsPlaying(true);
            newAudio.onended = () => setIsPlaying(false);
        } catch (error) {
            console.error("Error generating or playing audio:", error);
        }
    };


  return (
    <div
      className={cn(
        "group/message flex items-start gap-4",
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
      <div className="flex items-center gap-2">
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
        {message.role === 'assistant' && (
             <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover/message:opacity-100 transition-opacity"
                onClick={handlePlayAudio}
             >
                <Volume2 className={cn("h-5 w-5", isPlaying && "text-primary")} />
             </Button>
        )}
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
