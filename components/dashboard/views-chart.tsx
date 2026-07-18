"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyViewsPoint } from "@/lib/dashboard/analytics";

interface ViewsChartProps {
  data: DailyViewsPoint[];
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const count = payload[0]?.value ?? 0;

  return (
    <div className="rounded-lg border border-[var(--gold-border)] bg-[var(--surface-elevated)] px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-[var(--text-primary)]">{label}</p>
      <p className="mt-0.5 text-[var(--text-secondary)]">
        {count} {count === 1 ? "visualização" : "visualizações"}
      </p>
    </div>
  );
}

export function ViewsChart({ data }: ViewsChartProps) {
  const hasViews = data.some((point) => point.views > 0);

  if (!hasViews) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-[var(--gold-border)] bg-black/20">
        <p className="text-sm text-[var(--text-secondary)]">
          Nenhuma visualização nos últimos 7 dias.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(196,146,10,0.15)" />
            <stop offset="100%" stopColor="rgba(196,146,10,0)" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border-subtle)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          axisLine={{ stroke: "var(--gold-border)" }}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(196,146,10,0.3)" }} />
        <Area
          type="monotone"
          dataKey="views"
          stroke="none"
          fill="url(#viewsGradient)"
        />
        <Line
          type="monotone"
          dataKey="views"
          stroke="var(--gold)"
          strokeWidth={2}
          dot={{ fill: "var(--gold)", r: 4 }}
          activeDot={{ r: 6, fill: "var(--gold-light)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
