import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import type { Proposal } from "@/lib/database.types";
import { CopyLinkButton } from "@/components/proposals/copy-link-button";

interface ProposalCardProps {
  proposal: Proposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const photoCount = proposal.fotos?.length ?? 0;
  const coverPhoto = proposal.fotos?.[0];
  const views = proposal.views ?? 0;

  return (
    <article className="overflow-hidden rounded-xl border border-elevo-border bg-elevo-surface transition-colors hover:border-elevo-gold/40">
      <div className="relative aspect-[16/10] bg-elevo-bg">
        {coverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverPhoto}
            alt={proposal.titulo}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-elevo-smoke">
            Sem fotos
          </div>
        )}
        <span className="absolute bottom-2 right-2 rounded-md bg-elevo-bg/80 px-2 py-1 text-xs text-elevo-cream backdrop-blur-sm">
          {photoCount} {photoCount === 1 ? "foto" : "fotos"}
        </span>
      </div>

      <div className="p-4">
        <h2 className="line-clamp-1 font-semibold text-elevo-cream">
          {proposal.titulo}
        </h2>
        <p className="mt-1 text-sm text-elevo-smoke">{proposal.cidade}</p>
        <p className="mt-2 text-lg font-semibold text-elevo-gold">
          {formatCurrency(Number(proposal.preco))}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-xs text-elevo-smoke">
              Visualizado {views} {views === 1 ? "vez" : "vezes"}
            </p>
            {proposal.last_viewed && (
              <p className="text-xs text-elevo-smoke/70">
                Última visualização: {formatDateTime(proposal.last_viewed)}
              </p>
            )}
          </div>
          <CopyLinkButton slug={proposal.slug} />
        </div>

        <p className="mt-2 text-xs text-elevo-smoke">
          Criada em {formatDate(proposal.created_at)}
        </p>
      </div>
    </article>
  );
}
