export type HatType = "WHITE" | "RED" | "BLACK" | "YELLOW" | "GREEN" | "BLUE";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface HatConversation {
  hatType: HatType;
  messages: Message[];
}

export interface ThinkingHat {
  type: HatType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  systemPrompt: string;
  temperature: number;
  model: string;
  icon: string;
}

export interface ChatState {
  conversations: Record<HatType, Message[]>;
  sharedInput: string;
  isStreaming: Record<HatType, boolean>;
}
