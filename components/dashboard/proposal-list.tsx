import { CopyLinkButton } from "@/components/proposals/copy-link-button";
import type { Proposal } from "@/lib/database.types";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

interface ProposalListProps {
  proposals: Proposal[];
}

export function ProposalList({ proposals }: ProposalListProps) {
  return (
    <div className="glass-card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--gold-border)] bg-black/20">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Proposta
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Preço
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Visualizações
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Criada
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => {
              const views = proposal.views ?? 0;
              const hasViews = views > 0;

              return (
                <tr
                  key={proposal.id}
                  className="border-b border-[var(--border-subtle)] transition-colors last:border-b-0 hover:bg-[var(--surface-hover)]"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-[var(--text-primary)]">
                      {proposal.titulo}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                      {proposal.cidade}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-[var(--gold-light)]">
                    {formatCurrency(Number(proposal.preco))}
                  </td>
                  <td className="px-5 py-4">
                    {hasViews ? (
                      <span className="pill-viewed">Visualizado</span>
                    ) : (
                      <span className="pill-waiting">Aguardando</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">
                    <p>{views} {views === 1 ? "vez" : "vezes"}</p>
                    {proposal.last_viewed && (
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {formatDateTime(proposal.last_viewed)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">
                    {formatDate(proposal.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <CopyLinkButton slug={proposal.slug} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
