"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminSections } from "@/data/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type SummaryCounts = Record<string, number>;

export function AdminSummaryView() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [counts, setCounts] = useState<SummaryCounts>({});

  useEffect(() => {
    void (async () => {
      const [hero, menu, about, contact] = await Promise.all([
        supabase.from("hero_content").select("id", { count: "exact", head: true }),
        supabase.from("menu_items").select("id", { count: "exact", head: true }),
        supabase.from("about_content").select("id", { count: "exact", head: true }),
        supabase.from("contact_content").select("id", { count: "exact", head: true }),
      ]);

      setCounts({
        Inicio: hero.count ?? 0,
        Menú: menu.count ?? 0,
        Nosotros: about.count ?? 0,
        Contacto: contact.count ?? 0,
      });
    })();
  }, [supabase]);

  return (
    <>
      <AdminPageHeader
        eyebrow="Resumen"
        title="Panel de contenido"
        description="Accede rápido a las secciones editables del sitio."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminSections.map((section) => (
          <AdminMetricCard
            key={section.title}
            label={section.title}
            value={String(counts[section.title] ?? 0)}
            helper="registros"
          />
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-white/8 bg-white/[0.02] p-5 md:p-6">
        <div className="mb-4">
          <h3 className="text-base font-medium text-white md:text-lg">
            Accesos rápidos
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Abre la sección que quieras editar.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {adminSections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => router.push(`/admin/${section.key}`)}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-left transition hover:border-white/14 hover:bg-black/30"
            >
              <div>
                <p className="text-sm font-medium text-white">{section.title}</p>
                <p className="mt-1 text-sm text-white/40">{section.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-orange-300" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
