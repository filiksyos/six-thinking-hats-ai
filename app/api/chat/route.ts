import { streamText } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";
import { getHatConfig } from "@/lib/thinking-hats";
import { applyDeBonoCriteria, generateRandomWord } from "@/lib/de-bono-utils";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, hatType, apiKey, previousResponses } = await req.json();

    if (!apiKey) {
      return new Response("API key is required", { status: 400 });
    }

    const hatConfig = getHatConfig(hatType);
    
    // Apply De Bono creativity techniques
    let enhancedMessages = [...messages];
    
    // For Green Hat, inject random word for lateral thinking
    if (hatType === "GREEN" && messages.length > 0) {
      const randomWord = generateRandomWord();
      const lastMessage = enhancedMessages[enhancedMessages.length - 1];
      enhancedMessages[enhancedMessages.length - 1] = {
        ...lastMessage,
        content: `${lastMessage.content}\n\n[Creative constraint: Consider incorporating the concept of "${randomWord}" in your response]`,
      };
    }

    // Add system message with hat-specific instructions
    const systemMessage = {
      role: "system" as const,
      content: hatConfig.systemPrompt,
    };

    const result = await streamText({
      model: openrouter(hatConfig.model, {
        apiKey: apiKey,
      }),
      messages: [systemMessage, ...enhancedMessages],
      temperature: hatConfig.temperature,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
