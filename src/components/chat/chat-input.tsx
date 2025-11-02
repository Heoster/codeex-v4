"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Sparkles, HelpCircle, FileText } from "lucide-react";

type ChatInputProps = {
    onSend: (message: string) => void;
    isLoading: boolean;
};

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };
  
  const handleQuickAction = (action: string) => {
    const fullMessage = `${action} the following: ${message}`;
    if (message.trim()) {
        onSend(fullMessage);
        setMessage("");
    }
  }

  return (
    <div className="p-4 bg-background border-t">
      <div className="relative">
        <form onSubmit={handleSubmit}>
            <Textarea
            placeholder="Type your command or question here..."
            className="min-h-12 resize-none pr-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                }
            }}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
                <Button type="button" size="icon" variant="ghost" className="mic-glow">
                    <Mic className="h-5 w-5" />
                    <span className="sr-only">Use Microphone</span>
                </Button>
                <Button type="submit" size="icon" variant="ghost" disabled={isLoading || !message.trim()}>
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send Message</span>
                </Button>
            </div>
        </form>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button variant="outline" size="sm" className="text-muted-foreground" onClick={() => handleQuickAction("Summarize")} disabled={!message.trim() || isLoading}>
            <FileText className="mr-2 h-4 w-4"/>
            Summarize
        </Button>
        <Button variant="outline" size="sm" className="text-muted-foreground" onClick={() => handleQuickAction("Explain")} disabled={!message.trim() || isLoading}>
            <HelpCircle className="mr-2 h-4 w-4"/>
            Explain
        </Button>
        <Button variant="outline" size="sm" className="text-muted-foreground" onClick={() => onSend("Quiz me on a topic of your choice.")} disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4"/>
            Quiz Me
        </Button>
      </div>
    </div>
  );
}
