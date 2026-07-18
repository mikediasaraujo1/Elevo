"use client";

import { useState } from "react";

interface ProposalGalleryProps {
  fotos: string[];
  titulo: string;
}

export function ProposalGallery({ fotos, titulo }: ProposalGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (fotos.length === 0) {
    return (
      <div className="glass-card flex aspect-[4/3] items-center justify-center">
        <p className="relative z-[1] text-sm text-[var(--text-secondary)]">
          Sem fotos disponíveis
        </p>
      </div>
    );
  }

  const goTo = (index: number) => {
    setActiveIndex((index + fotos.length) % fotos.length);
  };

  return (
    <div className="space-y-3">
      <div className="glass-card relative overflow-hidden !p-0">
        <div className="relative aspect-[4/3] sm:aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fotos[activeIndex]}
            alt={`${titulo} — foto ${activeIndex + 1}`}
            className="relative z-[1] h-full w-full object-cover"
          />
        </div>

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 z-[2] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--gold-border)] bg-black/60 text-[var(--text-primary)] backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 z-[2] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--gold-border)] bg-black/60 text-[var(--text-primary)] backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label="Próxima foto"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 z-[2] rounded-md border border-[var(--gold-border)] bg-black/70 px-2.5 py-1 text-xs text-[var(--text-primary)] backdrop-blur-sm">
              {activeIndex + 1} / {fotos.length}
            </span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="hidden gap-2 sm:grid sm:grid-cols-4 lg:grid-cols-6">
          {fotos.map((foto, index) => (
            <button
              key={foto}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`aspect-[4/3] overflow-hidden rounded-lg border transition-all ${
                index === activeIndex
                  ? "border-[var(--gold)] ring-1 ring-[var(--gold-glow)]"
                  : "border-[var(--gold-border)] opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
