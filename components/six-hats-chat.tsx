"use client";

import { useMemo, useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import { HatPanel } from "./hat-panel";
import { THINKING_HATS } from "@/lib/thinking-hats";
import { Button } from "./ui/button";
import { useChatStore } from "@/stores/use-chat-store";
import { useStreamingMessage } from "@/hooks/use-streaming-message";
import { useSettingsStore } from "@/stores/use-settings-store";
import { toast } from "sonner";

const HAT_TYPES = ["WHITE", "RED", "BLACK", "YELLOW", "GREEN", "BLUE"] as const;

export function SixHatsChat() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const conversations = useChatStore((state) => state.conversations);
  const clearAllConversations = useChatStore(
    (state) => state.clearAllConversations
  );
  const { streamMessage } = useStreamingMessage();
  const apiKey = useSettingsStore((state) => state.apiKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!apiKey) {
      toast.error("Please set your OpenRouter API key in settings");
      return;
    }

    setIsLoading(true);

    try {
      // Stream message to all hats in parallel
      await Promise.all(
        HAT_TYPES.map((hatType) => streamMessage(hatType, userInput))
      );
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = useMemo(
    () => Object.values(conversations).some((msgs) => msgs.length > 0),
    [conversations]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat Panels */}
      <div className="flex-1 overflow-hidden border-b">
        {!hasMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Six Hats AI</h2>
              <p className="text-muted-foreground mb-6">
                Start a conversation to see all six thinking perspectives
              </p>
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {HAT_TYPES.map((hatType, index) => {
              const hatConfig = THINKING_HATS[hatType];
              return (
                <div key={hatType}>
                  {index > 0 && <ResizableHandle withHandle />}
                  <ResizablePanel defaultSize={16.666}>
                    <HatPanel
                      hatType={hatType}
                      hatConfig={hatConfig}
                      messages={conversations[hatType]}
                    />
                  </ResizablePanel>
                </div>
              );
            })}
          </ResizablePanelGroup>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask the six thinking hats..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground disabled:opacity-50"
          />
          <Button type="submit" disabled={isLoading} className="px-4">
            {isLoading ? "Thinking..." : "Send"}
          </Button>
          {hasMessages && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                clearAllConversations();
                setUserInput("");
              }}
            >
              Clear
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
