"use client";

import { SettingsDialog } from "./settings-dialog";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">🎩 Six Thinking Hats AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SettingsDialog />
        </div>
      </div>
    </header>
  );
}
