import Link from "next/link";
import { ButtonGold } from "@/components/ui/button-gold";

export function TrialBanner() {
  return (
    <div className="border-b border-[var(--gold-border)] bg-[var(--surface)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Você está no período de teste. Assine para continuar usando o ELEVO.
        </p>
        <Link href="/assinar">
          <ButtonGold className="!px-4 !py-2 !text-sm">Assinar ELEVO Pro</ButtonGold>
        </Link>
      </div>
    </div>
  );
}
