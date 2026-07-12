import { useEffect, useState } from "react";

type NavItem = { id: string; label: string };

export default function SideNav() {
  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-demo-group]");
    setItems(
      Array.from(nodes).map((node) => ({
        id: node.id,
        label: node.dataset.demoGroup ?? "",
      })),
    );
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="组件导航"
      className="fixed top-1/2 left-4 z-30 hidden max-h-[80vh] w-32 -translate-y-1/2 flex-col gap-0.5 overflow-y-auto min-[1600px]:flex"
    >
      <div className="mb-1 px-2 font-semibold text-content-300 text-xs uppercase tracking-wider">
        组件
      </div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="truncate rounded-sm px-2 py-1 text-content-300 text-xs transition-colors hover:bg-base-300 hover:text-content-100"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
