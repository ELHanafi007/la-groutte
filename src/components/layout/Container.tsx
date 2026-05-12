import { cn } from "@/lib/utils";

// ===================================================
// Lagroutte — Container Component
// Max-width content wrapper with responsive padding
// ===================================================

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "narrow" | "default" | "wide" | "full";
}

const sizeMap = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

export function Container({
  children,
  className,
  as: Component = "div",
  size = "wide",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
