const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "User already registered": "Este e-mail já está cadastrado",
  "Invalid login credentials": "E-mail ou senha incorretos",
  "Email not confirmed": "Confirme seu e-mail antes de entrar",
  "Password should be at least 6 characters":
    "A senha deve ter pelo menos 6 caracteres",
  "Unable to validate email address: invalid format":
    "Formato de e-mail inválido",
  signup_disabled: "Cadastros temporariamente desativados",
};

const DEFAULT_AUTH_ERROR = "Ocorreu um erro. Tente novamente.";

interface AuthErrorLike {
  message?: string;
  code?: string;
}

export function translateAuthError(error: AuthErrorLike | string): string {
  if (typeof error === "string") {
    return AUTH_ERROR_MESSAGES[error] ?? DEFAULT_AUTH_ERROR;
  }

  const code = error.code?.trim();
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  const message = error.message?.trim();
  if (message && AUTH_ERROR_MESSAGES[message]) {
    return AUTH_ERROR_MESSAGES[message];
  }

  return DEFAULT_AUTH_ERROR;
}
