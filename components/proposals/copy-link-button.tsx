"use client";

import { useState } from "react";

export function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/p/${slug}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center rounded-lg border border-[var(--gold-border)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all hover:border-[var(--gold-border-strong)] hover:text-[var(--gold-light)] hover:shadow-[0_0_12px_rgba(196,146,10,0.15)]"
    >
      {copied ? "Copiado!" : "Copiar link"}
    </button>
  );
}
