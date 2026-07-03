import { cva, type VariantProps } from "class-variance-authority";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";

const variants = cva(
  cn(
    "relative inline-flex shrink-0 select-none items-center justify-center rounded-full border border-base-300 bg-base-100 text-(--knob-color) shadow outline-none transition-colors",
    "cursor-grab active:cursor-grabbing",
    "focus-visible:ring-(--knob-color)/20 focus-visible:ring-3",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-40",
  ),
  {
    variants: {
      variant: {
        primary: "[--knob-color:var(--color-primary-500)]",
        info: "[--knob-color:var(--color-info)]",
        success: "[--knob-color:var(--color-success)]",
        warning: "[--knob-color:var(--color-warning)]",
        error: "[--knob-color:var(--color-error)]",
      },
      size: {
        sm: "size-6",
        md: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

const indicatorVariants = cva("rounded-full bg-(--knob-color)", {
  variants: {
    size: {
      sm: "mt-0.75 h-1.5 w-0.5",
      md: "mt-1 h-2 w-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ROTATION_RANGE = 270;
const ROTATION_OFFSET = -135;
const DRAG_PIXELS_FOR_FULL_RANGE = 200;

export type KnobProps = Omit<
  React.ComponentProps<"div">,
  "value" | "defaultValue" | "onChange"
> &
  VariantProps<typeof variants> & {
    value?: number | null;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    /** value to reset to on double-click (e.g. 100 for unity volume, 0 for center pan) */
    resetValue?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
  };

export default function Knob({
  className,
  size,
  variant,
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  resetValue,
  disabled,
  onChange,
  ...props
}: KnobProps) {
  const [internal, setInternal] = useState(defaultValue ?? min);
  const isControlled = controlledValue !== undefined;
  const raw = isControlled ? controlledValue : internal;
  const clamped = Math.max(min, Math.min(max, raw ?? 0));
  const percent = max > min ? (clamped - min) / (max - min) : 0;
  const rotation = ROTATION_OFFSET + percent * ROTATION_RANGE;

  const dragStartRef = useRef<{ y: number; value: number } | null>(null);

  function commit(next: number) {
    const stepped = Math.round(next / step) * step;
    const bounded = Math.max(min, Math.min(max, stepped));
    if (bounded === clamped) return;
    if (!isControlled) setInternal(bounded);
    onChange?.(bounded);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = { y: e.clientY, value: clamped };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragStartRef.current) return;
    const dy = dragStartRef.current.y - e.clientY;
    const delta = (dy / DRAG_PIXELS_FOR_FULL_RANGE) * (max - min);
    commit(dragStartRef.current.value + delta);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragStartRef.current = null;
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || resetValue === undefined) return;
    e.preventDefault();
    commit(resetValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      commit(clamped + step);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      commit(clamped - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(min);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(max);
    }
  }

  const arcDrawn = percent * 75; // 0% at min, 75% (270°) at max

  return (
    <div
      {...props}
      role="slider"
      aria-valuenow={clamped}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className={cn(variants({ className, size, variant }))}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray={`${arcDrawn} 100`}
          transform="rotate(135 50 50)"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-start justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <span className={cn(indicatorVariants({ size }))} />
      </div>
    </div>
  );
}
