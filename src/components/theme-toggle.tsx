import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";

const STORAGE_KEY = "retuned-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";
  return (
    <Tooltip content={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"}>
      <Button
        variant="secondary"
        shape="circle"
        className="fixed top-4 right-4 z-40"
        aria-label={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"}
        onClick={() => setTheme(next)}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Tooltip>
  );
}
