"use client";

import { useState } from "react";
import { ButtonGold } from "@/components/ui/button-gold";

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
      <ButtonGold
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        fullWidth
        className="!h-12"
      >
        {loading ? "Redirecionando..." : "Assinar agora"}
      </ButtonGold>
    </div>
  );
}
