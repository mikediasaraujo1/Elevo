import Link from "next/link";

export function TrialBanner() {
  return (
    <div className="border-b border-elevo-border bg-elevo-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-elevo-smoke">
          Você está no período de teste. Assine para continuar usando o ELEVO.
        </p>
        <Link
          href="/assinar"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-elevo-gold px-4 py-2 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90"
        >
          Assinar ELEVO Pro
        </Link>
      </div>
    </div>
  );
}
