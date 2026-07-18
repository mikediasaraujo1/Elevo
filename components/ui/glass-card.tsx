import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
  padding = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card",
        hover && "glass-card-hover",
        padding && "p-6",
        className
      )}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
