import Link from "next/link";
import { ElevoLogo } from "@/components/elevo-logo";
import { GlassCard } from "@/components/ui/glass-card";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="relative z-[1] w-full max-w-[440px]">
        <GlassCard className="p-8 sm:p-10" hover>
          <div className="mb-8 flex flex-col items-center text-center">
            <Link
              href="/"
              className="mb-4 flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <ElevoLogo />
              <span className="text-[28px] font-bold tracking-[4px] text-[var(--gold)]">
                ELEVO
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)]">
              O corretor que impressiona, fecha mais.
            </p>
          </div>

          <h1 className="mb-6 text-center text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h1>

          {children}
        </GlassCard>

        <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          {footer}
        </div>
      </div>
    </div>
  );
}
