import { ListIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";

type NavItem = { id: string; label: string };

export default function SideNav() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-demo-group]");
    setItems(
      Array.from(nodes).map((node) => ({
        id: node.id,
        label: node.dataset.demoGroup ?? "",
      })),
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    function handlePress(event: MouseEvent) {
      const target = event.target as Node | null;
      if (target && panelRef.current && !panelRef.current.contains(target)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePress);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePress);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (items.length === 0) return null;

  function jump(event: React.MouseEvent, id: string) {
    event.preventDefault();
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const links = (onNavigate: (e: React.MouseEvent, id: string) => void) =>
    items.map((item) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={(e) => onNavigate(e, item.id)}
        className="shrink-0 truncate rounded-sm px-2 py-1 text-content-300 text-xs transition-colors hover:bg-base-300 hover:text-content-100"
      >
        {item.label}
      </a>
    ));

  return (
    <>
      <nav
        aria-label="组件导航"
        className="fixed top-1/2 left-4 z-30 hidden max-h-[80vh] w-32 -translate-y-1/2 flex-col gap-0.5 overflow-y-auto min-[1600px]:flex"
      >
        <div className="mb-1 shrink-0 px-2 font-semibold text-content-300 text-xs uppercase tracking-wider">
          组件
        </div>
        {links(jump)}
      </nav>
      <div
        ref={panelRef}
        className="fixed bottom-4 left-4 z-40 min-[1600px]:hidden"
      >
        {open && (
          <nav
            aria-label="组件导航"
            className="absolute bottom-full left-0 mb-2 flex max-h-[60vh] w-40 flex-col gap-0.5 overflow-y-auto rounded-md border border-base-400 bg-base-100 p-1 shadow-(--shadow-overlay)"
          >
            {links(jump)}
          </nav>
        )}
        <Button
          variant="secondary"
          shape="circle"
          aria-label="组件导航"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <ListIcon />
        </Button>
      </div>
    </>
  );
}
