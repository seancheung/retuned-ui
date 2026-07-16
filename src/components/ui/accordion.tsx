"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/utils/cn";

const variants = cva(
  "divide-y divide-base-400 rounded-md text-content-100 text-sm",
  {
    variants: {
      bordered: {
        true: "border border-base-400 bg-base-100",
        false: "",
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
);

export type AccordionItem<T extends string | number = string> = {
  value: T;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type AccordionProps<T extends string | number = string> = Omit<
  React.ComponentProps<"div">,
  "onChange" | "value" | "defaultValue"
> &
  VariantProps<typeof variants> & {
    items: AccordionItem<T>[];
    chevron?:
      | boolean
      | ((open: boolean, item: AccordionItem<T>) => React.ReactNode);
  } & (
    | {
        multiple?: false;
        value?: T | null;
        defaultValue?: T;
        onChange?: (value: T | null) => void;
      }
    | {
        multiple: true;
        value?: T[];
        defaultValue?: T[];
        onChange?: (values: T[]) => void;
      }
  );

function toArray<T>(value: T | null | T[] | undefined): T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export default function Accordion<T extends string | number = string>({
  items,
  multiple = false,
  value: controlledValue,
  defaultValue,
  onChange,
  chevron = true,
  bordered,
  className,
  ...props
}: AccordionProps<T>) {
  const [internal, setInternal] = useState<T[]>(() => toArray(defaultValue));
  const isControlled = controlledValue !== undefined;
  const current = isControlled ? toArray(controlledValue) : internal;
  const baseId = useId();

  function handleToggle(item: AccordionItem<T>) {
    if (item.disabled) return;
    const isOpen = current.includes(item.value);
    const next = multiple
      ? isOpen
        ? current.filter((v) => v !== item.value)
        : [...current, item.value]
      : isOpen
        ? []
        : [item.value];
    if (!isControlled) setInternal(next);
    const emit = onChange as ((value: T | null | T[]) => void) | undefined;
    emit?.(multiple ? next : (next[0] ?? null));
  }

  return (
    <div className={cn(variants({ className, bordered }))} {...props}>
      {items.map((item, i) => {
        const open = current.includes(item.value) && !item.disabled;
        const triggerId = `${baseId}-trigger-${i}`;
        const contentId = `${baseId}-content-${i}`;
        return (
          <div
            key={String(item.value)}
            className={cn(item.disabled && "opacity-40")}
          >
            <div className="flex items-center">
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => handleToggle(item)}
                className="flex h-9 min-w-0 flex-1 not-disabled:cursor-pointer items-center gap-2 px-3 text-left font-medium outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/10 disabled:cursor-not-allowed"
              >
                {typeof item.title === "string" ? (
                  <span className="flex-1 truncate">{item.title}</span>
                ) : (
                  item.title
                )}
                {chevron === true && (
                  <ChevronDownIcon
                    className={cn(
                      "size-3.5 shrink-0 transition-transform duration-200",
                      open && "rotate-180",
                    )}
                  />
                )}
              </button>
              {typeof chevron === "function" && chevron(open, item)}
            </div>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 text-content-200">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
