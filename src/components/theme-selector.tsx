import { PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "@/components/ui/select";

const STORAGE_KEY = "retuned-style";

const styleOptions = [
  { value: "default", label: "Amber · 琥珀" },
  { value: "violet", label: "Violet · 紫罗兰" },
  { value: "blue", label: "Blue · 蔚蓝" },
  { value: "emerald", label: "Emerald · 翡翠" },
];

export default function ThemeSelector() {
  const [style, setStyle] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? "default",
  );

  useEffect(() => {
    if (style === "default") delete document.documentElement.dataset.style;
    else document.documentElement.dataset.style = style;
    localStorage.setItem(STORAGE_KEY, style);
  }, [style]);

  return (
    <Select
      options={styleOptions}
      value={style}
      onChange={setStyle}
      icon={<PaletteIcon />}
      aria-label="选择主题"
      className="fixed top-4 right-16 z-40 min-w-44"
    />
  );
}
