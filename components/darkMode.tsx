"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkMode() {
  const { systemTheme, theme, setTheme } = useTheme();

  const handleClick = (mode: string) => {
    setTheme(mode);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
      {currentTheme === "dark" ? (
        <Moon onClick={() => handleClick("light")} />
      ) : (
        <Sun onClick={() => handleClick("dark")} />
      )}
    </div>
  );
}
