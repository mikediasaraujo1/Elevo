"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElevoLogo } from "@/components/elevo-logo";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/propostas/nova", label: "Nova proposta" },
  { href: "/assinar", label: "Assinar Pro" },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-[var(--gold-border)] bg-[var(--surface)] lg:block">
        <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
          <Link
            href="/dashboard"
            className="mb-8 flex items-center gap-2.5 px-2 transition-opacity hover:opacity-80"
          >
            <ElevoLogo className="h-7 w-6" />
            <span className="text-sm font-bold tracking-[0.25em] text-[var(--gold-light)]">
              ELEVO
            </span>
          </Link>

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                    isActive
                      ? "border-l-2 border-[var(--gold)] bg-[var(--gold-dim)] pl-[10px] font-medium text-[var(--gold-light)]"
                      : "border-l-2 border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile top nav */}
      <nav className="flex gap-1 overflow-x-auto border-b border-[var(--gold-border)] bg-[var(--surface)] px-4 py-2 lg:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-[var(--gold-dim)] text-[var(--gold-light)]"
                  : "text-[var(--text-secondary)]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
