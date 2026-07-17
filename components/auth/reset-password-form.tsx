"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { getPasswordStrength } from "@/lib/auth/password-strength";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const strength = getPasswordStrength(password);
  const isWeak = strength === "weak";
  const passwordsMatch = password === confirmPassword;
  const canSubmit =
    ready && !isWeak && passwordsMatch && password.length > 0 && !loading;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!passwordsMatch) {
      setError("As senhas não coincidem.");
      return;
    }

    if (isWeak) {
      setError("Use pelo menos 8 caracteres, uma maiúscula e um número.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({ password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Escolha uma nova senha para sua conta"
      footer={
        <>
          <Link
            href="/login"
            className="font-medium text-elevo-gold transition-colors hover:text-elevo-cream"
          >
            Voltar ao login
          </Link>
        </>
      }
    >
      {!ready ? (
        <div className="space-y-4 text-center">
          <p className="text-sm text-elevo-smoke">
            Verificando link de recuperação...
          </p>
          <p className="text-xs text-elevo-smoke/70">
            Se nada acontecer, solicite um novo link em{" "}
            <Link href="/esqueci-senha" className="text-elevo-gold hover:underline">
              Esqueci minha senha
            </Link>
            .
          </p>
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
              htmlFor="password"
              className="block text-sm font-medium text-elevo-cream"
            >
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-elevo-border bg-elevo-bg px-4 py-3 text-elevo-cream placeholder:text-elevo-smoke/60 outline-none transition-colors focus:border-elevo-gold/50 focus:ring-1 focus:ring-elevo-gold/30"
            />
            <PasswordStrengthIndicator password={password} showRequirements />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-elevo-cream"
            >
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-elevo-border bg-elevo-bg px-4 py-3 text-elevo-cream placeholder:text-elevo-smoke/60 outline-none transition-colors focus:border-elevo-gold/50 focus:ring-1 focus:ring-elevo-gold/30"
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-400">As senhas não coincidem.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-elevo-gold px-4 py-3 text-sm font-semibold text-elevo-bg transition-colors hover:bg-elevo-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
