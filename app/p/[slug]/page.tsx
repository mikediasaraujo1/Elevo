import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ElevoLogo } from "@/components/elevo-logo";
import { ProposalGallery } from "@/components/proposals/proposal-gallery";
import { ProposalViewTracker } from "@/components/proposals/proposal-view-tracker";
import { getProposalBySlug } from "@/lib/proposals/public";
import { buildWhatsAppUrl, getProposalUrl, getSiteUrl } from "@/lib/site-url";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProposalBySlug(slug);

  if (!data) {
    return { title: "Proposta não encontrada — ELEVO" };
  }

  const { proposal } = data;
  const description = `${proposal.endereco}, ${proposal.cidade}`;
  const ogImage = proposal.fotos[0] ?? undefined;
  const pageUrl = getProposalUrl(slug);

  return {
    title: `${proposal.titulo} — ELEVO`,
    description,
    openGraph: {
      title: proposal.titulo,
      description,
      type: "website",
      url: pageUrl,
      siteName: "ELEVO",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: proposal.titulo }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: proposal.titulo,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value == null) return null;

  return (
    <div className="rounded-lg border border-elevo-border bg-elevo-surface px-4 py-3">
      <p className="text-xs text-elevo-smoke">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-elevo-cream">{value}</p>
    </div>
  );
}

export default async function PublicProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProposalBySlug(slug);

  if (!data) {
    notFound();
  }

  const { proposal, profile } = data;
  const whatsappMessage = `Olá${profile?.name ? ` ${profile.name}` : ""}, vi a proposta "${proposal.titulo}" e gostaria de mais informações.`;
  const whatsappUrl =
    profile?.whatsapp ?
      buildWhatsAppUrl(profile.whatsapp, whatsappMessage)
    : null;

  const hasDetails =
    proposal.area_m2 != null ||
    proposal.quartos != null ||
    proposal.banheiros != null ||
    proposal.vagas != null;

  return (
    <div className="min-h-screen bg-elevo-bg pb-28 sm:pb-12">
      <ProposalViewTracker slug={slug} />

      <header className="sticky top-0 z-10 border-b border-elevo-border bg-elevo-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href={getSiteUrl()}
            className="inline-flex items-center gap-2.5"
          >
            <ElevoLogo className="h-7 w-6" />
            <span className="text-sm font-semibold tracking-wide text-elevo-cream">
              ELEVO
            </span>
          </Link>
          {profile?.name && (
            <p className="text-xs text-elevo-smoke">{profile.name}</p>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <ProposalGallery fotos={proposal.fotos} titulo={proposal.titulo} />

        <div className="mt-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold leading-tight text-elevo-cream sm:text-3xl">
              {proposal.titulo}
            </h1>
            <p className="mt-2 text-sm text-elevo-smoke">
              {proposal.endereco}
              {proposal.bairro ? `, ${proposal.bairro}` : ""} — {proposal.cidade}
            </p>
          </div>

          <p className="text-3xl font-bold text-elevo-gold sm:text-4xl">
            {formatCurrency(Number(proposal.preco))}
          </p>

          {hasDetails && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-elevo-smoke">
                Detalhes
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailItem
                  label="Área"
                  value={
                    proposal.area_m2 != null ? `${proposal.area_m2} m²` : null
                  }
                />
                <DetailItem label="Quartos" value={proposal.quartos} />
                <DetailItem label="Banheiros" value={proposal.banheiros} />
                <DetailItem label="Vagas" value={proposal.vagas} />
              </div>
            </section>
          )}

          {proposal.descricao && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-elevo-smoke">
                Descrição
              </h2>
              <div className="rounded-xl border border-elevo-border bg-elevo-surface px-5 py-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-elevo-cream/90">
                  {proposal.descricao}
                </p>
              </div>
            </section>
          )}
        </div>

        {whatsappUrl && (
          <div className="mt-8 hidden sm:block">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </div>
        )}
      </main>

      {whatsappUrl && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-elevo-border bg-elevo-bg/95 p-4 backdrop-blur-md sm:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity active:opacity-90"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>
        </div>
      )}

      <footer className="border-t border-elevo-border px-6 py-6 text-center">
        <p className="text-xs text-elevo-smoke">
          Proposta apresentada via{" "}
          <span className="text-elevo-gold">ELEVO</span>
        </p>
      </footer>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
