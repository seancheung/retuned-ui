import { cva, type VariantProps } from "class-variance-authority";
import { StarIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/utils/cn";

const starVariants = cva("inline-flex shrink-0 transition-colors", {
  variants: {
    size: {
      sm: "has-icon-3.5",
      md: "has-icon-4.5",
      lg: "has-icon-5.5",
    },
    filled: {
      true: "icon:fill-primary-500 text-primary-500",
      false: "text-content-400",
    },
  },
  defaultVariants: {
    size: "md",
    filled: false,
  },
});

export type RatingProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> &
  VariantProps<typeof starVariants> & {
    value?: number | null;
    defaultValue?: number;
    onChange?: (value: number) => void;
    count?: number;
    allowHalf?: boolean;
    clearable?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
  };

export default function Rating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  clearable = false,
  readOnly = false,
  disabled = false,
  size,
  icon = <StarIcon />,
  className,
  ...props
}: RatingProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = (isControlled ? controlledValue : internal) ?? 0;

  const [hovered, setHovered] = useState<number | null>(null);
  const [pop, setPop] = useState<{ star: number; nonce: number } | null>(null);
  const interactive = !readOnly && !disabled;
  const displayed = interactive && hovered !== null ? hovered : value;

  function handleSelect(next: number) {
    const resolved = clearable && next === value ? 0 : next;
    if (!isControlled) setInternal(resolved);
    onChange?.(resolved);
    setHovered(null);
    if (resolved > 0) {
      setPop({ star: Math.ceil(resolved), nonce: (pop?.nonce ?? 0) + 1 });
    } else {
      setPop(null);
    }
  }

  function pointerValue(star: number, e: React.MouseEvent<HTMLButtonElement>) {
    if (!allowHalf) return star;
    const rect = e.currentTarget.getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? star - 0.5 : star;
  }

  const step = allowHalf ? 0.5 : 1;

  return (
    <div
      role="radiogroup"
      aria-label={`Rating: ${value} of ${count}`}
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      onMouseLeave={() => setHovered(null)}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          handleSelect(Math.min(value + step, count));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          handleSelect(Math.max(value - step, step));
        }
      }}
      className={cn(
        "inline-flex items-center gap-0.5",
        disabled && "opacity-40",
        className,
      )}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const star = i + 1;
        const filled = star <= displayed;
        const half = !filled && displayed === star - 0.5;
        const isPopped = pop?.star === star;
        return (
          <motion.button
            key={star}
            type="button"
            role="radio"
            whileHover={interactive ? { scale: 1.15 } : undefined}
            whileTap={interactive ? { scale: 0.85 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-checked={star === value || (allowHalf && value === star - 0.5)}
            aria-label={star === 1 ? "1 star" : `${star} stars`}
            disabled={!interactive}
            tabIndex={
              interactive
                ? star === Math.max(Math.ceil(value), 1)
                  ? 0
                  : -1
                : -1
            }
            onMouseMove={(e) =>
              interactive && setHovered(pointerValue(star, e))
            }
            onClick={(e) => interactive && handleSelect(pointerValue(star, e))}
            className={cn(
              "inline-flex rounded-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/20",
              interactive && "cursor-pointer",
              readOnly && "cursor-default",
              disabled && "cursor-not-allowed",
            )}
          >
            <motion.span
              key={isPopped ? `pop-${pop.nonce}` : "idle"}
              animate={isPopped ? { scale: [1, 1.15, 1] } : undefined}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex"
              aria-hidden
            >
              <span className={cn(starVariants({ size, filled }))}>{icon}</span>
              {half && (
                <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <span className={cn(starVariants({ size, filled: true }))}>
                    {icon}
                  </span>
                </span>
              )}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
