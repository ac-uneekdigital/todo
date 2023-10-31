"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { BiSun, BiMoon } from "react-icons/bi";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors w-12 bg-slate-500 dark:bg-indigo-800 dark:text-white hover:bg-slate-900 dark:hover:bg-indigo-900 group"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <BiSun className="h-5 w-5 text-white" />
      ) : (
        <BiMoon className="h-5 w-5 text-black group-hover:!text-white" />
      )}
    </button>
  );
};

export default ThemeButton;
