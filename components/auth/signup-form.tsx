"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";
import { ButtonGold } from "@/components/ui/button-gold";
import { getPasswordStrength } from "@/lib/auth/password-strength";
import { translateAuthError } from "@/lib/auth/translate-auth-error";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const isPasswordWeak = passwordStrength === "weak";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (isPasswordWeak) {
      setError("Use pelo menos 8 caracteres, uma maiúscula e um número.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (authError) {
      setError(translateAuthError(authError));
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("Não foi possível criar a conta. Tente novamente.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name,
    });

    if (profileError) {
      setError(translateAuthError(profileError.message));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthLayout
      title="Criar conta"
      footer={
        <>
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--gold-light)] transition-colors hover:text-[var(--text-primary)]"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)]">
            Nome
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="input-elevo"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)]">
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

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)]">
            Senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="input-elevo"
          />
          <PasswordStrengthIndicator password={password} showRequirements />
        </div>

        <ButtonGold type="submit" disabled={loading || isPasswordWeak} fullWidth className="!h-12">
          {loading ? "Criando conta..." : "Criar conta"}
        </ButtonGold>
      </form>
    </AuthLayout>
  );
}
