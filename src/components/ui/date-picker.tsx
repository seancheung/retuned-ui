"use client";

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
import { CalendarIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Calendar from "./calendar";

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
  size,
  className,
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);

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

  function handleSelect(day: Date) {
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
              <div style={transitionStyles}>
                <Calendar
                  value={value ?? null}
                  onChange={handleSelect}
                  min={min}
                  max={max}
                  locale={locale}
                  className="shadow-(--shadow-overlay)"
                />
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
