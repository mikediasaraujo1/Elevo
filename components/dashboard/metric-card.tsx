interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-elevo-border bg-elevo-surface px-5 py-4">
      <p className="line-clamp-2 text-2xl font-bold text-elevo-gold">{value}</p>
      <p className="mt-1 text-xs text-elevo-smoke">{label}</p>
    </div>
  );
}
