"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (mode: string) => {
    setTheme(mode);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    mounted &&
    (currentTheme === "dark" ? (
      <button
        className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
        onClick={() => handleClick("light")}
      >
        <Moon />
      </button>
    ) : (
      <button
        className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
        onClick={() => handleClick("dark")}
      >
        <Sun />
      </button>
    ))
  );
}
