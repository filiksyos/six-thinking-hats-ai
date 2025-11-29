"use client";

import { Message } from "@/lib/types";
import { ThinkingHat } from "@/lib/types";
import { ChatMessage } from "./chat-message";
import { useChatStore } from "@/stores/use-chat-store";
import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface HatPanelProps {
  hatType: string;
  hatConfig: ThinkingHat;
  messages: Message[];
}

export function HatPanel({ hatType, hatConfig, messages }: HatPanelProps) {
  const isStreaming = useChatStore(
    (state) => state.isStreaming[hatType as any]
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    const timer = setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className={`flex flex-col h-full ${hatConfig.bgColor}`}>
      {/* Header */}
      <div className="border-b p-3 sticky top-0">
        <h3 className="font-semibold text-sm">
          <span className="mr-2">{hatConfig.icon}</span>
          {hatConfig.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {hatConfig.description}
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-center">
              <p className="text-sm text-muted-foreground">
                Waiting for your input...
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isStreaming && messages.length > 0 && (
                <div className="flex gap-2 p-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <div className="text-xs text-muted-foreground">Thinking...</div>
                </div>
              )}
            </>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
