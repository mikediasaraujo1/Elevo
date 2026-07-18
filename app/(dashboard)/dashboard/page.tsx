import Link from "next/link";
import { redirect } from "next/navigation";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ViewsChart } from "@/components/dashboard/views-chart";
import { ProposalCard } from "@/components/proposals/proposal-card";
import { TrialBanner } from "@/components/subscription/trial-banner";
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

      <main className="mx-auto max-w-6xl px-6 py-12">
        {assinatura === "sucesso" && (
          <div className="mb-6 rounded-lg border border-elevo-gold/30 bg-elevo-gold/10 px-4 py-3 text-sm text-elevo-gold">
            Assinatura confirmada! Bem-vindo ao ELEVO Pro.
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-elevo-cream">Propostas</h1>
            <p className="mt-1 text-sm text-elevo-smoke">
              Gerencie suas propostas imobiliárias
            </p>
          </div>
          <Link
            href="/propostas/nova"
            className="inline-flex items-center justify-center rounded-lg bg-elevo-gold px-5 py-2.5 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90"
          >
            Nova proposta
          </Link>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Propostas enviadas"
            value={String(metrics.totalProposals)}
          />
          <MetricCard
            label="Total de visualizações"
            value={String(metrics.totalViews)}
          />
          <MetricCard
            label="Mais visualizada"
            value={metrics.mostViewedTitle ?? "—"}
          />
          <MetricCard
            label="Última abertura"
            value={
              metrics.lastOpenedAt
                ? formatDateTime(metrics.lastOpenedAt)
                : "—"
            }
          />
        </section>

        <section className="mb-10 rounded-xl border border-elevo-border bg-elevo-surface p-6">
          <h2 className="mb-6 text-sm font-semibold text-elevo-cream">
            Visualizações nos últimos 7 dias
          </h2>
          <ViewsChart data={chartData} />
        </section>

        {proposalList.length === 0 ? (
          <div className="rounded-xl border border-elevo-border bg-elevo-surface px-6 py-16 text-center">
            <p className="text-elevo-smoke">
              Você ainda não tem propostas. Crie sua primeira.
            </p>
            <Link
              href="/propostas/nova"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-elevo-gold px-5 py-2.5 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90"
            >
              Nova proposta
            </Link>
          </div>
        ) : (
          <section>
            <h2 className="mb-4 text-sm font-semibold text-elevo-cream">
              Suas propostas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proposalList.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
