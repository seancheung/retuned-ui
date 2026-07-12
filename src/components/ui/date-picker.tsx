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
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";

const triggerVariants = cva(
  "has-icon inline-flex h-8 min-w-50 not-disabled:cursor-pointer items-center gap-1.5 rounded-md border bg-base-100 px-3 icon:text-content-400 text-content-100 text-sm outline-none transition-all",
  {
    variants: {
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
      error: false,
      disabled: false,
    },
  },
);

export type DatePickerProps = Omit<
  React.ComponentProps<"button">,
  "value" | "onChange" | "defaultValue"
> &
  VariantProps<typeof triggerVariants> & {
    value?: Date | null;
    defaultValue?: Date;
    onChange?: (date: Date) => void;
    placeholder?: string;
    min?: Date;
    max?: Date;
    locale?: string;
    format?: (date: Date) => string;
    icon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
  };

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function DatePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Pick a date…",
  min,
  max,
  locale,
  format,
  icon,
  clearable,
  onClear,
  error,
  disabled,
  className,
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => startOfDay(value ?? new Date()));

  useEffect(() => {
    if (open) setView(startOfDay(value ?? new Date()));
  }, [open, value]);

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

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(view),
    [locale, view],
  );

  // Intl.Locale week info: firstDay is 1 (Monday) … 7 (Sunday); JS getDay()
  // uses 0 (Sunday) … 6 (Saturday). Falls back to Sunday where unsupported.
  const firstDayOfWeek = useMemo(() => {
    try {
      const resolved = new Intl.DateTimeFormat(locale).resolvedOptions().locale;
      const loc = new Intl.Locale(resolved) as Intl.Locale & {
        weekInfo?: { firstDay: number };
        getWeekInfo?: () => { firstDay: number };
      };
      const info = loc.getWeekInfo?.() ?? loc.weekInfo;
      return (info?.firstDay ?? 7) % 7;
    } catch {
      return 0;
    }
  }, [locale]);

  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    // 2023-01-01 was a Sunday
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(2023, 0, 1 + firstDayOfWeek + i)),
    );
  }, [locale, firstDayOfWeek]);

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
    const gridStart = 1 - offset;
    return Array.from(
      { length: 42 },
      (_, i) => new Date(view.getFullYear(), view.getMonth(), gridStart + i),
    );
  }, [view, firstDayOfWeek]);

  const today = startOfDay(new Date());
  const minTime = min ? startOfDay(min).getTime() : null;
  const maxTime = max ? startOfDay(max).getTime() : null;

  function isOutOfRange(day: Date) {
    const t = day.getTime();
    return (
      (minTime !== null && t < minTime) || (maxTime !== null && t > maxTime)
    );
  }

  function shiftView(months: number) {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + months, 1));
  }

  function handleSelect(day: Date) {
    if (isOutOfRange(day)) return;
    if (!isControlled) setInternalValue(day);
    onChange?.(day);
    setOpen(false);
  }

  const display = value
    ? format
      ? format(value)
      : value.toLocaleDateString(locale)
    : "";
  const showClear = clearable && !disabled && value != null;

  const handleClear = () => {
    if (!isControlled) setInternalValue(undefined);
    onClear?.();
    setOpen(false);
  };

  const navButton =
    "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm text-content-400 outline-none transition-colors hover:bg-base-300 hover:text-content-200 focus-visible:ring-3 focus-visible:ring-ring/20";

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        disabled={disabled ?? false}
        data-open={open}
        className={cn("group", triggerVariants({ className, error, disabled }))}
        {...getReferenceProps(props)}
      >
        {icon}
        <span
          className={cn(
            "flex-1 truncate text-left",
            !value && "text-content-400",
          )}
        >
          {display || placeholder}
        </span>
        {showClear ? (
          <span className="relative inline-flex size-icon shrink-0 items-center justify-center">
            <CalendarIcon className="absolute size-full text-content-400 transition group-hover:opacity-0 group-data-[open=true]:text-content-300" />
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
          <CalendarIcon />
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
                style={transitionStyles}
                className="w-64 rounded-md border border-base-400 bg-base-100 p-2 text-content-100 text-sm shadow-(--shadow-overlay)"
              >
                <div className="mb-1 flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Previous year"
                    onClick={() => shiftView(-12)}
                    className={navButton}
                  >
                    <ChevronsLeftIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => shiftView(-1)}
                    className={navButton}
                  >
                    <ChevronLeftIcon className="size-3.5" />
                  </button>
                  <span className="flex-1 text-center font-medium text-xs">
                    {monthLabel}
                  </span>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => shiftView(1)}
                    className={navButton}
                  >
                    <ChevronRightIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next year"
                    onClick={() => shiftView(12)}
                    className={navButton}
                  >
                    <ChevronsRightIcon className="size-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {weekdays.map((day, i) => (
                    <span
                      key={i.toString()}
                      className="inline-flex size-8 items-center justify-center text-content-400 text-xs"
                    >
                      {day}
                    </span>
                  ))}
                  {days.map((day) => {
                    const outsideMonth = day.getMonth() !== view.getMonth();
                    const selected = value != null && isSameDay(day, value);
                    const isToday = isSameDay(day, today);
                    const outOfRange = isOutOfRange(day);
                    return (
                      <button
                        key={day.getTime()}
                        type="button"
                        disabled={outOfRange}
                        aria-pressed={selected}
                        onClick={() => handleSelect(day)}
                        className={cn(
                          "inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/20",
                          selected
                            ? "bg-primary-500 font-medium text-primary-content"
                            : "hover:bg-base-300",
                          !selected && outsideMonth && "text-content-400",
                          !selected &&
                            isToday &&
                            "font-semibold text-primary-500",
                          outOfRange && "cursor-not-allowed opacity-40",
                        )}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-center border-base-400 border-t pt-1">
                  <button
                    type="button"
                    disabled={isOutOfRange(today)}
                    onClick={() => handleSelect(today)}
                    className="cursor-pointer rounded-sm px-2 py-1 text-primary-500 text-xs outline-none transition-colors hover:bg-base-300 focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Today
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
