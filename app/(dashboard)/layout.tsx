import Link from "next/link";
import { ElevoLogo } from "@/components/elevo-logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex-1 bg-elevo-bg">
      <header className="border-b border-elevo-border bg-elevo-surface">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <ElevoLogo />
            <span className="text-lg font-semibold text-elevo-cream">ELEVO</span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
