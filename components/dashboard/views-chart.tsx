"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
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
    <div className="rounded-lg border border-elevo-border bg-elevo-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-elevo-cream">{label}</p>
      <p className="mt-0.5 text-elevo-smoke">
        {count} {count === 1 ? "visualização" : "visualizações"}
      </p>
    </div>
  );
}

export function ViewsChart({ data }: ViewsChartProps) {
  const hasViews = data.some((point) => point.views > 0);

  if (!hasViews) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed border-elevo-border bg-elevo-bg/50">
        <p className="text-sm text-elevo-smoke">
          Nenhuma visualização nos últimos 7 dias.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="rgba(196,146,10,0.12)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#7A7A8A", fontSize: 12 }}
          axisLine={{ stroke: "rgba(196,146,10,0.22)" }}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#7A7A8A", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(196,146,10,0.3)" }} />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#C4920A"
          strokeWidth={2}
          dot={{ fill: "#C4920A", r: 4 }}
          activeDot={{ r: 6, fill: "#C4920A" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
