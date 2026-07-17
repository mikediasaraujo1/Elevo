import Link from "next/link";
import { redirect } from "next/navigation";
import { ElevoLogo } from "@/components/elevo-logo";
import { SubscribeButton } from "@/components/subscription/subscribe-button";
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
    <div className="min-h-full flex-1 bg-elevo-bg">
      <header className="border-b border-elevo-border bg-elevo-surface">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <ElevoLogo />
            <span className="text-lg font-semibold text-elevo-cream">ELEVO</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-elevo-cream">
            ELEVO Pro
          </h1>
          <p className="mt-2 text-sm text-elevo-smoke">
            Tudo que você precisa para vender imóveis com propostas profissionais
          </p>
        </div>

        <div className="rounded-xl border border-elevo-border bg-elevo-surface p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-elevo-gold">
              Plano mensal
            </p>
            <p className="mt-2">
              <span className="text-4xl font-bold text-elevo-cream">R$97</span>
              <span className="text-elevo-smoke">/mês</span>
            </p>
          </div>

          <ul className="mb-8 space-y-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm text-elevo-cream"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-elevo-gold/15 text-elevo-gold">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          {isSubscribed ? (
            <div className="rounded-lg border border-elevo-gold/30 bg-elevo-gold/10 px-4 py-3 text-center text-sm font-semibold text-elevo-gold">
              Plano ativo
            </div>
          ) : (
            <SubscribeButton />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-elevo-smoke">
          Pagamento seguro via Stripe. Cancele quando quiser.
        </p>
      </main>
    </div>
  );
}
