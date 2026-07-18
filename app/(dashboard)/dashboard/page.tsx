import Link from "next/link";
import { redirect } from "next/navigation";
import { METRIC_ICONS, MetricCard } from "@/components/dashboard/metric-card";
import { ProposalList } from "@/components/dashboard/proposal-list";
import { ViewsChart } from "@/components/dashboard/views-chart";
import { TrialBanner } from "@/components/subscription/trial-banner";
import { ButtonGold } from "@/components/ui/button-gold";
import { GlassCard } from "@/components/ui/glass-card";
import {
  buildLast7DaysChartData,
  computeDashboardMetrics,
  getSevenDaysAgoIso,
} from "@/lib/dashboard/analytics";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/utils";

interface DashboardPageProps {
  searchParams: Promise<{ assinatura?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { assinatura } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscribed")
    .eq("id", user.id)
    .single();

  const { data: proposals } = await supabase
    .from("proposals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const proposalList = proposals ?? [];
  const proposalIds = proposalList.map((proposal) => proposal.id);

  let recentViews: { created_at: string }[] = [];

  if (proposalIds.length > 0) {
    const { data: viewRows } = await supabase
      .from("proposal_views")
      .select("created_at")
      .in("proposal_id", proposalIds)
      .gte("created_at", getSevenDaysAgoIso());

    recentViews = viewRows ?? [];
  }

  const metrics = computeDashboardMetrics(proposalList);
  const chartData = buildLast7DaysChartData(recentViews);
  const isSubscribed = profile?.subscribed ?? false;

  return (
    <>
      {!isSubscribed && <TrialBanner />}

      <main className="mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {assinatura === "sucesso" && (
          <div className="mb-6 rounded-lg border border-[var(--gold-border)] bg-[var(--gold-dim)] px-4 py-3 text-sm text-[var(--gold-light)]">
            Assinatura confirmada! Bem-vindo ao ELEVO Pro.
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Acompanhe o desempenho das suas propostas
            </p>
          </div>
          <Link href="/propostas/nova">
            <ButtonGold className="!text-sm">Nova proposta</ButtonGold>
          </Link>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Propostas enviadas"
            value={String(metrics.totalProposals)}
            icon={METRIC_ICONS.proposals}
          />
          <MetricCard
            label="Total de visualizações"
            value={String(metrics.totalViews)}
            icon={METRIC_ICONS.views}
          />
          <MetricCard
            label="Mais visualizada"
            value={metrics.mostViewedTitle ?? "—"}
            icon={METRIC_ICONS.star}
          />
          <MetricCard
            label="Última abertura"
            value={
              metrics.lastOpenedAt
                ? formatDateTime(metrics.lastOpenedAt)
                : "—"
            }
            icon={METRIC_ICONS.clock}
          />
        </section>

        <GlassCard className="mb-10" hover>
          <h2 className="mb-6 text-sm font-semibold text-[var(--text-primary)]">
            Visualizações nos últimos 7 dias
          </h2>
          <ViewsChart data={chartData} />
        </GlassCard>

        {proposalList.length === 0 ? (
          <GlassCard className="py-16 text-center" hover>
            <p className="text-[var(--text-secondary)]">
              Você ainda não tem propostas. Crie sua primeira.
            </p>
            <Link href="/propostas/nova" className="mt-6 inline-block">
              <ButtonGold className="!text-sm">Nova proposta</ButtonGold>
            </Link>
          </GlassCard>
        ) : (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Suas propostas
            </h2>
            <ProposalList proposals={proposalList} />
          </section>
        )}
      </main>
    </>
  );
}
