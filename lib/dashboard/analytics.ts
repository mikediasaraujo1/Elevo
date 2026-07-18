import type { Proposal } from "@/lib/database.types";

export interface DashboardMetrics {
  totalProposals: number;
  totalViews: number;
  mostViewedTitle: string | null;
  lastOpenedAt: string | null;
}

export interface DailyViewsPoint {
  label: string;
  views: number;
}

const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

export function computeDashboardMetrics(
  proposals: Pick<Proposal, "titulo" | "views" | "last_viewed">[]
): DashboardMetrics {
  if (proposals.length === 0) {
    return {
      totalProposals: 0,
      totalViews: 0,
      mostViewedTitle: null,
      lastOpenedAt: null,
    };
  }

  const totalViews = proposals.reduce((sum, p) => sum + (p.views ?? 0), 0);

  const mostViewed = proposals.reduce((best, current) =>
    (current.views ?? 0) > (best.views ?? 0) ? current : best
  );

  const mostViewedTitle =
    (mostViewed.views ?? 0) > 0 ? mostViewed.titulo : null;

  const lastOpenedAt = proposals
    .map((p) => p.last_viewed)
    .filter((date): date is string => date != null)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  return {
    totalProposals: proposals.length,
    totalViews,
    mostViewedTitle,
    lastOpenedAt,
  };
}

export function buildLast7DaysChartData(
  views: { created_at: string }[]
): DailyViewsPoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const points: DailyViewsPoint[] = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const dayStart = new Date(today);
    dayStart.setDate(today.getDate() - offset);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate() + 1);

    const count = views.filter((view) => {
      const viewedAt = new Date(view.created_at);
      return viewedAt >= dayStart && viewedAt < dayEnd;
    }).length;

    points.push({
      label: WEEKDAY_LABELS[dayStart.getDay()],
      views: count,
    });
  }

  return points;
}

export function getSevenDaysAgoIso(): string {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}
