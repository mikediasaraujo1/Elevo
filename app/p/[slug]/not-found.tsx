import Link from "next/link";
import { ElevoLogo } from "@/components/elevo-logo";

export default function ProposalNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-elevo-bg">
      <header className="border-b border-elevo-border px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <ElevoLogo className="h-7 w-6" />
          <span className="text-sm font-semibold tracking-wide text-elevo-cream">
            ELEVO
          </span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-6xl font-light text-elevo-gold/30">404</p>
        <h1 className="mt-4 text-xl font-semibold text-elevo-cream">
          Proposta não encontrada
        </h1>
        <p className="mt-2 max-w-sm text-sm text-elevo-smoke">
          Este link pode ter expirado ou a proposta foi removida pelo corretor.
        </p>
      </main>

      <footer className="border-t border-elevo-border px-6 py-4 text-center">
        <p className="text-xs text-elevo-smoke">
          Propostas imobiliárias com ELEVO
        </p>
      </footer>
    </div>
  );
}
