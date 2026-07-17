"use client";

import { useState } from "react";
import { getProposalUrl } from "@/lib/site-url";

interface CopyLinkButtonProps {
  slug: string;
}

export function CopyLinkButton({ slug }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = getProposalUrl(slug);

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
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
      className="inline-flex items-center justify-center rounded-lg border border-elevo-border px-3 py-1.5 text-xs font-medium text-elevo-cream transition-colors hover:border-elevo-gold/50 hover:text-elevo-gold"
    >
      {copied ? "Copiado!" : "Copiar link"}
    </button>
  );
}
