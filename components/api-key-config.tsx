"use client";

import { useState } from "react";
import { useSettingsStore } from "@/stores/use-settings-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export function ApiKeyConfig() {
  const { apiKey, setApiKey } = useSettingsStore();
  const [inputValue, setInputValue] = useState(apiKey);
  const [isSaved, setIsSaved] = useState(!!apiKey);

  const handleSave = () => {
    if (!inputValue.trim()) {
      toast.error("API key cannot be empty");
      return;
    }

    setApiKey(inputValue);
    setIsSaved(true);
    toast.success("API key saved successfully");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="api-key">OpenRouter API Key</Label>
        <Input
          id="api-key"
          type="password"
          placeholder="sk-or-v1-..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsSaved(false);
          }}
        />
        <p className="text-sm text-muted-foreground">
          Get your API key from{" "}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            openrouter.ai/keys
          </a>
        </p>
      </div>
      
      <Button
        onClick={handleSave}
        className="w-full"
        variant={isSaved ? "outline" : "default"}
      >
        {isSaved ? "✓ Saved" : "Save API Key"}
      </Button>
    </div>
  );
}
