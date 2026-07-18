import Link from "next/link";
import { ProposalForm } from "@/components/proposals/proposal-form";

export default function NovaPropostaPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          ← Voltar ao dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
          Nova proposta
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Preencha os dados do imóvel para criar uma proposta profissional
        </p>
      </div>

      <ProposalForm />
    </main>
  );
}
