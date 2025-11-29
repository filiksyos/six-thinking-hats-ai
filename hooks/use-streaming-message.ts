import { useCallback } from "react";
import { useChatStore } from "@/stores/use-chat-store";
import { useSettingsStore } from "@/stores/use-settings-store";
import { Message, HatType } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export function useStreamingMessage() {
  const addMessage = useChatStore((state) => state.addMessage);
  const updateLastMessage = useChatStore(
    (state) => state.updateLastMessage
  );
  const setIsStreaming = useChatStore((state) => state.setIsStreaming);
  const conversations = useChatStore((state) => state.conversations);
  const apiKey = useSettingsStore((state) => state.apiKey);

  const streamMessage = useCallback(
    async (hatType: HatType, userMessage: string) => {
      if (!apiKey) {
        throw new Error("API key not set");
      }

      // Add user message
      const userMsg: Message = {
        id: uuidv4(),
        role: "user",
        content: userMessage,
        timestamp: Date.now(),
      };
      addMessage(hatType, userMsg);

      // Create empty assistant message
      const assistantMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };
      addMessage(hatType, assistantMsg);

      setIsStreaming(hatType, true);

      try {
        // Get conversation history for context
        const hatMessages = conversations[hatType].slice(-8).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: hatMessages,
            hatType,
            apiKey,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = new TextDecoder().decode(value);
          const lines = text.split("\n");

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const json = JSON.parse(line.substring(2));
                if (json.textDelta) {
                  fullContent += json.textDelta;
                  updateLastMessage(hatType, fullContent);
                }
              } catch (e) {
                // Continue on parse errors
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error streaming message for ${hatType}:`, error);
        updateLastMessage(
          hatType,
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsStreaming(hatType, false);
      }
    },
    [apiKey, addMessage, updateLastMessage, setIsStreaming, conversations]
  );

  return { streamMessage };
}
