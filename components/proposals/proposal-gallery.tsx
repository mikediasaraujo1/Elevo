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
      <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-elevo-border bg-elevo-surface">
        <p className="text-sm text-elevo-smoke">Sem fotos disponíveis</p>
      </div>
    );
  }

  const goTo = (index: number) => {
    setActiveIndex((index + fotos.length) % fotos.length);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-elevo-border bg-elevo-surface">
        <div className="aspect-[4/3] sm:aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fotos[activeIndex]}
            alt={`${titulo} — foto ${activeIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-elevo-bg/70 text-elevo-cream backdrop-blur-sm transition-colors hover:bg-elevo-bg/90"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-elevo-bg/70 text-elevo-cream backdrop-blur-sm transition-colors hover:bg-elevo-bg/90"
              aria-label="Próxima foto"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-md bg-elevo-bg/80 px-2.5 py-1 text-xs text-elevo-cream backdrop-blur-sm">
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
              className={`aspect-[4/3] overflow-hidden rounded-lg border transition-colors ${
                index === activeIndex
                  ? "border-elevo-gold ring-1 ring-elevo-gold/50"
                  : "border-elevo-border opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={foto}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
