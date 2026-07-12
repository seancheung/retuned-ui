import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  size as floatingSize,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
  useTypeahead,
} from "@floating-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";

const triggerVariants = cva(
  "has-icon inline-flex min-h-8 min-w-50 not-disabled:cursor-pointer items-center gap-1.5 rounded-md border bg-base-100 py-1 pr-3 icon:text-content-400 text-content-100 text-sm outline-none transition-all",
  {
    variants: {
      error: {
        true: "border-error focus-visible:ring-3 focus-visible:ring-error/10 data-[open=true]:ring-3 data-[open=true]:ring-error/10",
        false:
          "border-base-400 focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-primary-500/10 data-[open=true]:border-primary-500 data-[open=true]:ring-3 data-[open=true]:ring-primary-500/10",
      },
      disabled: {
        true: "opacity-40",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  },
);

export type MultiSelectOption<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type MultiSelectProps<T = unknown> = Omit<
  React.ComponentProps<"button">,
  "value" | "onChange" | "defaultValue"
> &
  VariantProps<typeof triggerVariants> & {
    value?: T[];
    defaultValue?: T[];
    onChange?: (values: T[]) => void;
    options: MultiSelectOption<T>[];
    placeholder?: string;
    emptyMessage?: React.ReactNode;
    icon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    maxTagCount?: number;
    renderOption?: (option: MultiSelectOption<T>) => React.ReactNode;
  };

export default function MultiSelect<T = unknown>({
  value: controlledValue,
  defaultValue,
  onChange,
  options,
  placeholder = "Select…",
  emptyMessage = "No options",
  icon,
  error,
  disabled,
  className,
  clearable,
  onClear,
  maxTagCount,
  renderOption,
  ...props
}: MultiSelectProps<T>) {
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue ?? []);
  const isControlled = controlledValue !== undefined;
  const values = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selected = options.filter((o) => values.includes(o.value));
  const visibleTags =
    maxTagCount != null ? selected.slice(0, maxTagCount) : selected;
  const hiddenCount = selected.length - visibleTags.length;

  const { refs, floatingStyles, context, placement } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      floatingSize({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight - 8, 320)}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>(options.map((o) => o.label));

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch(i) {
      if (open) setActiveIndex(i);
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNav, typeahead],
  );

  const isAbove = placement.startsWith("top");
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: {
      opacity: 0,
      transform: `scale(0.96) translateY(${isAbove ? 4 : -4}px)`,
    },
    open: { opacity: 1, transform: "scale(1) translateY(0)" },
  });

  function commit(next: T[]) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  function handleToggle(index: number) {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    commit(
      values.includes(opt.value)
        ? values.filter((v) => v !== opt.value)
        : [...values, opt.value],
    );
  }

  function handleRemove(value: T) {
    commit(values.filter((v) => v !== value));
  }

  const showClear = clearable && !disabled && values.length > 0;
  const handleClear = () => {
    commit([]);
    onClear?.();
    setOpen(false);
    setActiveIndex(null);
  };

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        disabled={disabled ?? false}
        data-open={open}
        className={cn(
          "group",
          triggerVariants({ className, error, disabled }),
          selected.length > 0 ? "pl-1" : "pl-3",
        )}
        {...getReferenceProps(props)}
      >
        {icon}
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1 text-left">
          {selected.length === 0 && (
            <span className="truncate text-content-400">{placeholder}</span>
          )}
          {visibleTags.map((opt) => (
            <span
              key={String(opt.value)}
              className="inline-flex max-w-full items-center gap-1 rounded bg-base-300 py-0.5 pr-1 pl-1.5 text-content-200 text-xs"
            >
              <span className="truncate">{opt.label}</span>
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Remove ${opt.label}`}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) handleRemove(opt.value);
                }}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-content-400 transition hover:text-content-200"
              >
                <XIcon className="size-3" />
              </span>
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="inline-flex items-center rounded bg-base-300 px-1.5 py-0.5 text-content-300 text-xs">
              +{hiddenCount}
            </span>
          )}
        </span>
        {showClear ? (
          <span className="relative inline-flex size-icon shrink-0 items-center justify-center">
            <ChevronDownIcon
              className={cn(
                "absolute size-full text-content-400 transition group-hover:opacity-0 group-data-[open=true]:text-content-300",
                open && "rotate-180",
              )}
            />
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute inset-0 inline-flex cursor-pointer items-center justify-center text-content-400 opacity-0 transition hover:text-content-200 group-hover:opacity-100"
            >
              <XIcon className="size-full" />
            </span>
          </span>
        ) : (
          <ChevronDownIcon className={cn("shrink-0", open && "rotate-180")} />
        )}
      </button>
      {isMounted && !disabled && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cn(
                "z-50 outline-none",
                isAbove ? "origin-bottom" : "origin-top",
              )}
              {...getFloatingProps({ "aria-multiselectable": true })}
            >
              <div
                style={{ ...transitionStyles, maxHeight: "inherit" }}
                className="flex flex-col overflow-y-auto rounded-md border border-base-400 bg-base-100 p-1 text-content-100 text-sm shadow-lg"
              >
                {options.length === 0 && (
                  <div className="px-2 py-2 text-content-400 text-xs">
                    {emptyMessage}
                  </div>
                )}
                {options.map((opt, i) => {
                  const isSelected = values.includes(opt.value);
                  return (
                    <div
                      key={i.toString()}
                      ref={(el) => {
                        listRef.current[i] = el;
                      }}
                      role="option"
                      tabIndex={activeIndex === i ? 0 : -1}
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled || undefined}
                      data-active={activeIndex === i}
                      className={cn(
                        "flex h-7 shrink-0 cursor-pointer items-center gap-2 rounded-sm px-2 outline-none transition-colors",
                        "data-[active=true]:bg-base-300 data-[active=true]:text-content-100",
                        "aria-disabled:cursor-not-allowed aria-disabled:opacity-40",
                      )}
                      {...getItemProps({
                        onClick: () => handleToggle(i),
                        onKeyDown(event) {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleToggle(i);
                          }
                          if (
                            event.key === " " &&
                            !context.dataRef.current.typing
                          ) {
                            event.preventDefault();
                            handleToggle(i);
                          }
                        },
                      })}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "inline-flex size-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors",
                          isSelected
                            ? "border-primary-500 bg-primary-500 text-primary-content"
                            : "border-base-400 bg-base-100",
                        )}
                      >
                        {isSelected && (
                          <CheckIcon strokeWidth={3} className="size-3" />
                        )}
                      </span>
                      {renderOption ? (
                        renderOption(opt)
                      ) : (
                        <span className="flex-1 truncate">{opt.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
