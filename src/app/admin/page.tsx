"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { adminSections } from "@/data/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type SummaryCounts = Record<string, number>;

export default function AdminDashboardPage() {
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
        title="Secciones conectadas al contenido real"
        description="Esta vista ya no usa mocks de contenido. Cada módulo del panel se alimenta desde Supabase y refleja lo que verá el sitio público."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminSections.map((section) => (
          <AdminMetricCard
            key={section.title}
            label={section.title}
            value={String(counts[section.title] ?? 0)}
            helper={section.description}
          />
        ))}
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        {adminSections.map((section) => (
          <AdminPreviewCard
            key={section.title}
            title={section.title}
            description={section.description}
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-black/20 p-4">
              <div>
                <p className="text-sm text-white/70">Ruta del editor</p>
                <p className="mt-1 text-lg font-medium text-white">{section.route}</p>
              </div>
              <Link
                href={section.route}
                className="inline-flex items-center text-sm text-orange-300 transition hover:text-orange-200"
              >
                Abrir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AdminPreviewCard>
        ))}
      </section>
    </>
  );
}
