/**
 * Local storage utilities for conversation history and settings
 * Everything is stored in browser localStorage - no database needed
 */

import { Message, HatConversation, HatType } from "./types";

const STORAGE_KEYS = {
  CONVERSATIONS: "six-hats-conversations",
  HISTORY: "six-hats-history",
  SETTINGS: "six-hats-settings",
} as const;

export interface StoredConversation {
  id: string;
  title: string;
  timestamp: number;
  conversations: Record<HatType, Message[]>;
}

export interface StorageSettings {
  apiKey?: string;
  defaultModel?: string;
  theme?: "light" | "dark" | "system";
}

// Conversation History Management
export function saveConversation(conversation: StoredConversation): void {
  try {
    const history = getConversationHistory();
    const existingIndex = history.findIndex(c => c.id === conversation.id);
    
    if (existingIndex >= 0) {
      history[existingIndex] = conversation;
    } else {
      history.unshift(conversation);
    }
    
    // Keep only last 50 conversations
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error("Failed to save conversation:", error);
  }
}

export function getConversationHistory(): StoredConversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load conversation history:", error);
    return [];
  }
}

export function getConversationById(id: string): StoredConversation | null {
  const history = getConversationHistory();
  return history.find(c => c.id === id) || null;
}

export function deleteConversation(id: string): void {
  try {
    const history = getConversationHistory();
    const filtered = history.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete conversation:", error);
  }
}

export function clearAllConversations(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (error) {
    console.error("Failed to clear conversations:", error);
  }
}

// Settings Management
export function saveSettings(settings: StorageSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

export function getSettings(): StorageSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to load settings:", error);
    return {};
  }
}

// Current Session State (temporary)
export function saveCurrentSession(conversations: Record<HatType, Message[]>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  } catch (error) {
    console.error("Failed to save current session:", error);
  }
}

export function getCurrentSession(): Record<HatType, Message[]> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load current session:", error);
    return null;
  }
}

export function clearCurrentSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
  } catch (error) {
    console.error("Failed to clear current session:", error);
  }
}
