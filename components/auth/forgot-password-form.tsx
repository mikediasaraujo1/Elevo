"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { createClient } from "@/lib/supabase/client";

function getRedirectUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin =
    siteUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${origin}/auth/callback?next=/redefinir-senha`;
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: getRedirectUrl() }
    );

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Esqueci minha senha"
      subtitle="Enviaremos um link para redefinir sua senha"
      footer={
        <>
          Lembrou a senha?{" "}
          <Link
            href="/login"
            className="font-medium text-elevo-gold transition-colors hover:text-elevo-cream"
          >
            Voltar ao login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <div className="rounded-lg border border-elevo-gold/30 bg-elevo-gold/10 px-4 py-3 text-sm text-elevo-cream">
            E-mail enviado! Verifique sua caixa de entrada e siga o link para
            redefinir sua senha.
          </div>
          <Link
            href="/login"
            className="inline-block text-sm font-medium text-elevo-gold transition-colors hover:text-elevo-cream"
          >
            Voltar ao login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-elevo-cream"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-elevo-border bg-elevo-bg px-4 py-3 text-elevo-cream placeholder:text-elevo-smoke/60 outline-none transition-colors focus:border-elevo-gold/50 focus:ring-1 focus:ring-elevo-gold/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-elevo-gold px-4 py-3 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
