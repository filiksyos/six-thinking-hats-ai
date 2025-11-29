import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  apiKey: string;
  defaultModel: string;
  setApiKey: (key: string) => void;
  setDefaultModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(  persist(
    (set) => ({
      apiKey: "",
      defaultModel: "openai/gpt-4o",
      setApiKey: (key) => set({ apiKey: key }),
      setDefaultModel: (model) => set({ defaultModel: model }),
    }),
    {
      name: "six-hats-settings",
    }
  )
);
