"use client";

import { useState } from "react";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Não foi possível iniciar o checkout.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-center text-sm text-red-300">{error}</p>
      )}
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full rounded-lg bg-elevo-gold px-6 py-3.5 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecionando..." : "Assinar agora"}
      </button>
    </div>
  );
}
