import Link from "next/link";
import { redirect } from "next/navigation";
import { ElevoLogo } from "@/components/elevo-logo";
import { SubscribeButton } from "@/components/subscription/subscribe-button";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/server";

const BENEFITS = [
  "Propostas ilimitadas",
  "Rastreamento de abertura",
  "Notificação por e-mail",
  "Link profissional",
] as const;

export default async function AssinarPage() {
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

  const isSubscribed = profile?.subscribed ?? false;

  return (
    <div className="assinar-page relative min-h-screen flex-1">
      <header className="border-b border-[var(--gold-border)] bg-[var(--surface)]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <ElevoLogo />
            <span className="text-sm font-bold tracking-[0.25em] text-[var(--gold-light)]">
              ELEVO
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-[1] mx-auto flex max-w-[480px] flex-col items-center px-6 py-16">
        <GlassCard className="w-full !p-8 sm:!p-10" hover>
          <div className="mb-6 flex justify-center">
            <span className="rounded-full border border-[var(--gold-border)] bg-[var(--gold-dim)] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)]">
              7 dias grátis
            </span>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              ELEVO Pro
            </h1>
            <p className="mt-4 flex items-end justify-center gap-1">
              <span className="pb-2 text-lg text-[var(--smoke)]">R$</span>
              <span className="text-[64px] font-bold leading-none text-[var(--gold-light)]">
                97
              </span>
              <span className="pb-2 text-[var(--smoke)]">/mês</span>
            </p>
          </div>

          <ul className="mb-8 space-y-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm text-[var(--text-primary)]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--gold)]">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          {isSubscribed ? (
            <div className="rounded-lg border border-[var(--gold-border)] bg-[var(--gold-dim)] px-4 py-3 text-center text-sm font-semibold text-[var(--gold-light)]">
              Plano ativo
            </div>
          ) : (
            <SubscribeButton />
          )}

          <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            Pagamento seguro via Stripe. Cancele quando quiser.
          </p>
        </GlassCard>
      </main>
    </div>
  );
}
