import Link from "next/link";
import { redirect } from "next/navigation";
import { ProposalCard } from "@/components/proposals/proposal-card";
import { TrialBanner } from "@/components/subscription/trial-banner";
import { createClient } from "@/lib/supabase/server";

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

        {!proposals || proposals.length === 0 ? (
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
