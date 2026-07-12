import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { ClockIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const triggerVariants = cva(
  "has-icon inline-flex min-w-50 not-disabled:cursor-pointer items-center gap-1.5 rounded-md border bg-base-100 icon:text-content-400 text-content-100 outline-none transition-all",
  {
    variants: {
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-8 px-3 text-sm",
        lg: "h-9 px-3.5 text-base",
      },
      error: {
        true: "border-error focus-visible:ring-3 focus-visible:ring-error/10 data-[open=true]:ring-3 data-[open=true]:ring-error/10",
        false:
          "border-base-400 focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-ring/10 data-[open=true]:border-primary-500 data-[open=true]:ring-3 data-[open=true]:ring-ring/10",
      },
      disabled: {
        true: "opacity-40",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
      disabled: false,
    },
  },
);

export type TimePickerProps = Omit<
  React.ComponentProps<"button">,
  "value" | "onChange" | "defaultValue"
> &
  VariantProps<typeof triggerVariants> & {
    /** Time as "HH:mm" (or "HH:mm:ss" with showSeconds), always 24-hour */
    value?: string | null;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    showSeconds?: boolean;
    use12Hours?: boolean;
    /** Inclusive lower bound, e.g. "09:00" */
    min?: string;
    /** Inclusive upper bound, e.g. "18:00" */
    max?: string;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    icon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
  };

type TimeParts = { h: number; m: number; s: number };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parse(value: string | null | undefined): TimeParts | null {
  if (!value) return null;
  const [h = 0, m = 0, s = 0] = value.split(":").map(Number);
  return { h, m, s };
}

function toSeconds({ h, m, s }: TimeParts) {
  return h * 3600 + m * 60 + s;
}

function range(limit: number, step: number) {
  return Array.from({ length: Math.ceil(limit / step) }, (_, i) => i * step);
}

export default function TimePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Pick a time…",
  showSeconds = false,
  use12Hours = false,
  min,
  max,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  icon,
  clearable,
  onClear,
  error,
  disabled,
  size,
  className,
  ...props
}: TimePickerProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const parsed = parse(value);

  const [open, setOpen] = useState(false);
  const [meridiemState, setMeridiemState] = useState<"AM" | "PM">("AM");
  const meridiem = parsed ? (parsed.h >= 12 ? "PM" : "AM") : meridiemState;

  const minParts = parse(min);
  const maxParts = parse(max);
  const minT = minParts ? toSeconds(minParts) : null;
  const maxT = maxParts ? toSeconds(maxParts) : null;

  const { refs, floatingStyles, context, placement } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const isAbove = placement.startsWith("top");
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: {
      opacity: 0,
      transform: `scale(0.96) translateY(${isAbove ? 4 : -4}px)`,
    },
    open: { opacity: 1, transform: "scale(1) translateY(0)" },
  });

  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const selected =
        panelRef.current?.querySelectorAll<HTMLElement>("[data-selected]");
      // Scroll only the column, not every scrollable ancestor — scrollIntoView
      // would also scroll the page to center the cell in the viewport.
      for (const cell of selected ?? []) {
        const column = cell.parentElement;
        if (!column) continue;
        const columnRect = column.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        column.scrollTop +=
          cellRect.top -
          columnRect.top -
          (column.clientHeight - cellRect.height) / 2;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  function compose({ h, m, s }: TimeParts) {
    return showSeconds
      ? `${pad(h)}:${pad(m)}:${pad(s)}`
      : `${pad(h)}:${pad(m)}`;
  }

  function commitParts(parts: TimeParts) {
    let next = parts;
    const t = toSeconds(parts);
    if (minParts && minT !== null && t < minT) next = minParts;
    else if (maxParts && maxT !== null && t > maxT) next = maxParts;
    const composed = compose(next);
    if (!isControlled) setInternalValue(composed);
    onChange?.(composed);
  }

  const current: TimeParts = parsed ?? { h: 0, m: 0, s: 0 };

  function handlePick(unit: "h" | "m" | "s", amount: number) {
    commitParts({
      h: unit === "h" ? amount : current.h,
      m: unit === "m" ? amount : current.m,
      s: unit === "s" ? amount : current.s,
    });
  }

  function handleMeridiem(next: "AM" | "PM") {
    setMeridiemState(next);
    if (parsed) {
      const h12 = parsed.h % 12;
      commitParts({
        h: next === "PM" ? h12 + 12 : h12,
        m: parsed.m,
        s: parsed.s,
      });
    }
  }

  function handleNow() {
    const now = new Date();
    commitParts({
      h: now.getHours() - (now.getHours() % hourStep),
      m: now.getMinutes() - (now.getMinutes() % minuteStep),
      s: now.getSeconds() - (now.getSeconds() % secondStep),
    });
    setOpen(false);
  }

  function hourDisabled(h: number) {
    const start = h * 3600;
    return (
      (minT !== null && start + 3599 < minT) || (maxT !== null && start > maxT)
    );
  }

  function minuteDisabled(m: number) {
    const start = current.h * 3600 + m * 60;
    return (
      (minT !== null && start + 59 < minT) || (maxT !== null && start > maxT)
    );
  }

  function secondDisabled(s: number) {
    const t = current.h * 3600 + current.m * 60 + s;
    return (minT !== null && t < minT) || (maxT !== null && t > maxT);
  }

  const display = parsed
    ? use12Hours
      ? `${pad(parsed.h % 12 === 0 ? 12 : parsed.h % 12)}:${pad(parsed.m)}${
          showSeconds ? `:${pad(parsed.s)}` : ""
        } ${meridiem}`
      : compose(parsed)
    : "";
  const showClear = clearable && !disabled && value != null && value !== "";

  const handleClear = () => {
    if (!isControlled) setInternalValue(undefined);
    onClear?.();
    setOpen(false);
  };

  type Cell = {
    key: string;
    label: string;
    selected: boolean;
    disabled: boolean;
    pick: () => void;
  };

  const hourCells: Cell[] = use12Hours
    ? range(12, hourStep).map((h12) => {
        const actual = meridiem === "PM" ? h12 + 12 : h12;
        return {
          key: `h${h12}`,
          label: pad(h12 === 0 ? 12 : h12),
          selected: parsed?.h === actual,
          disabled: hourDisabled(actual),
          pick: () => handlePick("h", actual),
        };
      })
    : range(24, hourStep).map((h) => ({
        key: `h${h}`,
        label: pad(h),
        selected: parsed?.h === h,
        disabled: hourDisabled(h),
        pick: () => handlePick("h", h),
      }));

  const columns: Array<{ label: string; cells: Cell[] }> = [
    { label: "Hours", cells: hourCells },
    {
      label: "Minutes",
      cells: range(60, minuteStep).map((m) => ({
        key: `m${m}`,
        label: pad(m),
        selected: parsed?.m === m,
        disabled: minuteDisabled(m),
        pick: () => handlePick("m", m),
      })),
    },
    ...(showSeconds
      ? [
          {
            label: "Seconds",
            cells: range(60, secondStep).map((s) => ({
              key: `s${s}`,
              label: pad(s),
              selected: parsed?.s === s,
              disabled: secondDisabled(s),
              pick: () => handlePick("s", s),
            })),
          },
        ]
      : []),
    ...(use12Hours
      ? [
          {
            label: "Meridiem",
            cells: (["AM", "PM"] as const).map((ap) => ({
              key: ap,
              label: ap,
              selected: meridiem === ap,
              disabled:
                ap === "AM"
                  ? minT !== null && minT >= 12 * 3600
                  : maxT !== null && maxT < 12 * 3600,
              pick: () => handleMeridiem(ap),
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        disabled={disabled ?? false}
        data-open={open}
        className={cn(
          "group",
          triggerVariants({ className, size, error, disabled }),
        )}
        {...getReferenceProps(props)}
      >
        {icon}
        <span
          className={cn(
            "flex-1 truncate text-left",
            !display && "text-content-400",
          )}
        >
          {display || placeholder}
        </span>
        {showClear ? (
          <span className="relative inline-flex size-icon shrink-0 items-center justify-center">
            <ClockIcon className="absolute size-full text-content-400 transition group-hover:opacity-0 group-data-[open=true]:text-content-300" />
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
          <ClockIcon />
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
              {...getFloatingProps()}
            >
              <div
                ref={panelRef}
                style={transitionStyles}
                className="rounded-md border border-base-400 bg-base-100 text-content-100 text-sm shadow-(--shadow-overlay)"
              >
                <div className="flex divide-x divide-base-400">
                  {columns.map((column) => (
                    <div
                      key={column.label}
                      aria-label={column.label}
                      className="flex h-56 w-14 flex-col gap-0.5 overflow-y-auto p-1"
                    >
                      {column.cells.map((cell) => (
                        <button
                          key={cell.key}
                          type="button"
                          disabled={cell.disabled}
                          data-selected={cell.selected || undefined}
                          aria-pressed={cell.selected}
                          onClick={cell.pick}
                          className={cn(
                            "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm py-1 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/20",
                            cell.selected
                              ? "bg-primary-500 font-medium text-primary-content"
                              : "hover:bg-base-300",
                            cell.disabled &&
                              "cursor-not-allowed opacity-40 hover:bg-transparent",
                          )}
                        >
                          {cell.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center border-base-400 border-t p-1">
                  <button
                    type="button"
                    onClick={handleNow}
                    className="cursor-pointer rounded-sm px-2 py-1 text-primary-500 text-xs outline-none transition-colors hover:bg-base-300 focus-visible:ring-3 focus-visible:ring-ring/20"
                  >
                    Now
                  </button>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
