"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { ButtonGold } from "@/components/ui/button-gold";
import { getPasswordStrength } from "@/lib/auth/password-strength";
import { translateAuthError } from "@/lib/auth/translate-auth-error";
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
      setError(translateAuthError(authError));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      footer={
        <Link
          href="/login"
          className="font-medium text-[var(--gold-light)] transition-colors hover:text-[var(--text-primary)]"
        >
          Voltar ao login
        </Link>
      }
    >
      {!ready ? (
        <div className="space-y-4 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Verificando link de recuperação...
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Se nada acontecer, solicite um novo link em{" "}
            <Link href="/esqueci-senha" className="text-[var(--gold-light)] hover:underline">
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
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)]">
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
              className="input-elevo"
            />
            <PasswordStrengthIndicator password={password} showRequirements />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-primary)]">
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
              className="input-elevo"
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-400">As senhas não coincidem.</p>
            )}
          </div>

          <ButtonGold type="submit" disabled={!canSubmit} fullWidth className="!h-12">
            {loading ? "Salvando..." : "Redefinir senha"}
          </ButtonGold>
        </form>
      )}
    </AuthLayout>
  );
}
