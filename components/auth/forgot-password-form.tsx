"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ButtonGold } from "@/components/ui/button-gold";
import { translateAuthError } from "@/lib/auth/translate-auth-error";
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
      setError(translateAuthError(authError));
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Esqueci minha senha"
      footer={
        <>
          Lembrou a senha?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--gold-light)] transition-colors hover:text-[var(--text-primary)]"
          >
            Voltar ao login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <div className="rounded-lg border border-[var(--gold-border)] bg-[var(--gold-dim)] px-4 py-3 text-sm text-[var(--text-primary)]">
            E-mail enviado! Verifique sua caixa de entrada e siga o link para
            redefinir sua senha.
          </div>
          <Link
            href="/login"
            className="inline-block text-sm font-medium text-[var(--gold-light)] transition-colors hover:text-[var(--text-primary)]"
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
              className="block text-sm font-medium text-[var(--text-primary)]"
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
              className="input-elevo"
            />
          </div>

          <ButtonGold type="submit" disabled={loading} fullWidth className="!h-12">
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </ButtonGold>
        </form>
      )}
    </AuthLayout>
  );
}
