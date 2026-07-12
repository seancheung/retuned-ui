"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";

export type CalendarProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> & {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  locale?: string;
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

export default function Calendar({
  value: controlledValue,
  defaultValue,
  onChange,
  min,
  max,
  locale,
  className,
  ...props
}: CalendarProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const [view, setView] = useState<Date>(() => startOfDay(value ?? new Date()));

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
    setView(startOfDay(day));
    onChange?.(day);
  }

  const navButton =
    "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm text-content-400 outline-none transition-colors hover:bg-base-300 hover:text-content-200 focus-visible:ring-3 focus-visible:ring-ring/20";

  return (
    <div
      className={cn(
        "w-64 rounded-md border border-base-400 bg-base-100 p-2 text-content-100 text-sm",
        className,
      )}
      {...props}
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
                !selected && isToday && "font-semibold text-primary-500",
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
  );
}
