import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils/cn";

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: "numeric" | "text";
}

export function MetricCard({
  label,
  value,
  icon,
  variant = "numeric",
}: MetricCardProps) {
  const isText = variant === "text";

  return (
    <GlassCard hover className="relative !p-5">
      <div className="absolute right-4 top-4 text-[var(--gold)] opacity-60">
        {icon}
      </div>
      <p
        className={cn(
          "flex h-11 min-w-0 items-center text-[var(--gold-light)]",
          isText
            ? "truncate text-[15px] font-semibold leading-snug"
            : "text-[36px] font-bold leading-none"
        )}
        title={isText ? value : undefined}
      >
        {value}
      </p>
      <p className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-[var(--text-secondary)]">
        {label}
      </p>
    </GlassCard>
  );
}

function IconProposals() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconViews() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l2.9 6.3L22 9.3l-5 4.5 1.5 6.5L12 17.8 5.5 20.3 7 13.8 2 9.3l7.1-1Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const METRIC_ICONS = {
  proposals: <IconProposals />,
  views: <IconViews />,
  star: <IconStar />,
  clock: <IconClock />,
} as const;
