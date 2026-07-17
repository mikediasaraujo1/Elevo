import {
  getPasswordStrength,
  PASSWORD_STRENGTH_LABELS,
  type PasswordStrength,
} from "@/lib/auth/password-strength";

const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  weak: "bg-red-500",
  medium: "bg-yellow-500",
  strong: "bg-green-500",
};

const STRENGTH_TEXT_COLORS: Record<PasswordStrength, string> = {
  weak: "text-red-400",
  medium: "text-yellow-400",
  strong: "text-green-400",
};

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  showRequirements = false,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const filledSegments = strength === "weak" ? 1 : strength === "medium" ? 2 : 3;

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((segment) => (
          <div
            key={segment}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              segment <= filledSegments
                ? STRENGTH_COLORS[strength]
                : "bg-elevo-border"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${STRENGTH_TEXT_COLORS[strength]}`}>
        {PASSWORD_STRENGTH_LABELS[strength]}
      </p>
      {showRequirements && strength === "weak" && (
        <p className="text-xs text-elevo-smoke">
          Use pelo menos 8 caracteres, uma maiúscula e um número
        </p>
      )}
    </div>
  );
}
