import Link from "next/link";
import { ElevoLogo } from "@/components/elevo-logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-elevo-bg px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <ElevoLogo />
            <span className="text-xl font-semibold tracking-wide text-elevo-cream">
              ELEVO
            </span>
          </Link>
          <p className="text-sm text-elevo-smoke">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-elevo-border bg-elevo-surface p-8 shadow-2xl">
          <h1 className="mb-6 text-center text-2xl font-semibold text-elevo-cream">
            {title}
          </h1>
          {children}
        </div>

        <div className="mt-6 text-center text-sm text-elevo-smoke">{footer}</div>
      </div>
    </div>
  );
}
