import { formatCurrency } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

export interface ProposalPreviewData {
  titulo: string;
  endereco: string;
  bairro: string;
  cidade: string;
  preco: string;
  descricao: string;
  photos: string[];
}

interface ProposalPreviewProps {
  data: ProposalPreviewData;
}

export function ProposalPreview({ data }: ProposalPreviewProps) {
  const coverPhoto = data.photos[0];
  const precoNum = Number(data.preco);
  const precoFormatted =
    data.preco && !Number.isNaN(precoNum) && precoNum > 0
      ? formatCurrency(precoNum)
      : "R$ —";

  return (
    <div className="sticky top-6">
      <p className="section-label mb-3">Preview do cliente</p>
      <GlassCard
        className="!p-0 shadow-[var(--card-shadow-hover)]"
        hover
        padding={false}
      >
        <div className="relative aspect-[16/10] bg-black/40">
          {coverPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverPhoto}
              alt={data.titulo || "Preview"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
              Adicione fotos
            </div>
          )}
        </div>

        <div className="space-y-3 p-5">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {data.titulo || "Título da proposta"}
            </h3>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {data.endereco || "Endereço"}
              {data.bairro ? `, ${data.bairro}` : ""}
              {data.cidade ? ` — ${data.cidade}` : ""}
            </p>
          </div>

          <p className="text-2xl font-bold text-[var(--gold-light)]">
            {precoFormatted}
          </p>

          {data.descricao && (
            <p className="line-clamp-3 text-xs leading-relaxed text-[var(--text-secondary)]">
              {data.descricao}
            </p>
          )}

          <div className="border-t border-[var(--border-subtle)] pt-3 text-center">
            <p className="text-[10px] text-[var(--text-muted)]">
              Proposta criada com{" "}
              <span className="text-[var(--gold)]">ELEVO</span>
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
