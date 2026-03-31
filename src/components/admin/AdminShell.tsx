"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut, Menu, PanelLeftClose } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { adminNavItems } from "@/data/admin";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
};

function AdminShellContent({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [supabase] = useState(() => getSupabaseBrowserClient());

  const activeItem =
    adminNavItems.find((item) => item.href === pathname) ?? adminNavItems[0];

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen overscroll-y-none bg-[#0B0B0B] text-[#E8E8E8]">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-[#111111] px-5 py-6 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/8 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400/70">
                PizzaHub
              </p>
              <h1 className="mt-2 text-base font-medium text-white">Admin</h1>
            </div>
            <button
              onClick={closeMenu}
              className="rounded-md border border-white/10 p-2 text-white/60 transition hover:text-orange-400 md:hidden"
              aria-label="Cerrar menú del admin"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain py-5 pr-1">
            <nav className="space-y-2">
              {adminNavItems.map((item) => {
                const isActive = item.href === pathname;

                return (
                  <Link
                    key={item.key}
                    onClick={() => {
                      closeMenu();
                    }}
                    href={item.href}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                      isActive
                        ? "border-orange-500/30 bg-orange-500/10 text-white"
                        : "border-white/6 bg-white/[0.02] text-white/65 hover:border-white/12 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-white/8 pt-5">
            <Button
              variant="outline"
              className="w-full rounded-xl border-white/10 !bg-white/[0.03] text-white transition-colors duration-200 hover:!bg-white/[0.03] hover:!text-red-300"
              onClick={() => void handleLogout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col overscroll-y-none">
          <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0B0B0B]/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMenu}
                className="rounded-md border border-white/10 p-2 text-white/70 transition hover:text-orange-400 md:hidden"
                aria-label="Abrir menú del admin"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/30">
                  Panel interno
                </p>
                <div className="mt-1 flex items-center gap-2 text-sm text-white/55">
                  <span>Admin</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-white">{activeItem.label}</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overscroll-contain px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeMenu}
        />
      ) : null}
    </div>
  );
}

export function AdminShell({ children }: AdminShellProps) {
  return <AdminShellContent>{children}</AdminShellContent>;
}
