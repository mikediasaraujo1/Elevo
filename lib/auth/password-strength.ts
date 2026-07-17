export type PasswordStrength = "weak" | "medium" | "strong";

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < 8) return "weak";

  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  if (hasNumber && hasUppercase) return "strong";
  return "medium";
}

export const PASSWORD_STRENGTH_LABELS: Record<PasswordStrength, string> = {
  weak: "Fraca",
  medium: "Média",
  strong: "Forte",
};

export const PASSWORD_REQUIREMENTS_MESSAGE =
  "Use pelo menos 8 caracteres, uma maiúscula e um número";
