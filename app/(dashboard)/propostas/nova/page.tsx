import Link from "next/link";
import { ProposalForm } from "@/components/proposals/proposal-form";

export default function NovaPropostaPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-elevo-smoke transition-colors hover:text-elevo-cream"
        >
          ← Voltar ao dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-elevo-cream">
          Nova proposta
        </h1>
        <p className="mt-1 text-sm text-elevo-smoke">
          Preencha os dados do imóvel para criar uma proposta profissional
        </p>
      </div>

      <div className="rounded-xl border border-elevo-border bg-elevo-surface p-6 sm:p-8">
        <ProposalForm />
      </div>
    </main>
  );
}
