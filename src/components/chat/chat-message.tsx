"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "./chat-view";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";
import React, { useEffect } from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";

export function ChatMessage({ message }: { message: Message }) {
    const { user } = useUser();
    const firestore = useFirestore();
    const userDocRef = useMemoFirebase(
      () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
      [firestore, user]
    );
    const { data: userProfile } = useDoc<{ voicePreference?: string, photoURL?: string }>(userDocRef);

    const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    
    useEffect(() => {
        // Clean up audio element on unmount
        return () => {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
        }
    }, [audio]);

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
            const response = await textToSpeech({ 
                text: message.content,
                voice: userProfile?.voicePreference || 'Algenib',
            });
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
                <Image src="/favicon.ico" alt="CODEEX AI Logo" width={24} height={24} className="h-6 w-6" />
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
            {message.content === 'Conjuring a response...' ? (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse" />
                </div>
            ) : (
                message.content
            )}
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
            {user?.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName || "User"} width={36} height={36} className="rounded-full" />
            ) : (
                <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
            )}
        </Avatar>
      )}
    </div>
  );
}
