"use client";

import { useEffect, useState } from "react";

import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { HeroContent, SiteSection } from "@/types/cms";

const textareaClassName =
  "flex min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/30";

export default function AdminHeroPage() {
  const supabase = getSupabaseBrowserClient();
  const [section, setSection] = useState<SiteSection | null>(null);
  const [form, setForm] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: sectionData } = await supabase
        .from("site_sections")
        .select("*")
        .eq("key", "inicio")
        .maybeSingle();

      const { data: heroData } = await supabase
        .from("hero_content")
        .select("*")
        .eq("section_id", sectionData?.id ?? "")
        .maybeSingle();

      setSection(sectionData);
      setForm(heroData);
      setLoading(false);
    })();
  }, [supabase]);

  const updateField = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSave = async () => {
    if (!form || !section) return;

    await supabase.from("site_sections").update({ is_active: true }).eq("id", section.id);
    await supabase
      .from("hero_content")
      .update({
        title: form.title,
        description: form.description,
        primary_button_text: form.primary_button_text,
        primary_button_href: form.primary_button_href,
        secondary_button_text: form.secondary_button_text,
        secondary_button_href: form.secondary_button_href,
      })
      .eq("id", form.id);
  };

  const handleDelete = async () => {
    if (!section) return;

    await supabase.from("site_sections").update({ is_active: false }).eq("id", section.id);
    setSection((current) => (current ? { ...current, is_active: false } : current));
  };

  if (loading || !form) {
    return <div className="text-sm text-white/50">Cargando contenido...</div>;
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Inicio"
        title="Editor del hero principal"
        description="Esta sección ya está conectada a `hero_content`. Editar guarda cambios reales y eliminar desactiva la sección en el sitio."
      />

      <AdminPreviewCard
        title="Contenido de Inicio"
        description={`Estado actual: ${section?.is_active ? "visible" : "oculto"}`}
      >
        <div className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm text-white/65">Título principal</label>
            <Input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="border-white/10 bg-black/20 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">Descripción</label>
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              className={textareaClassName}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/65">Texto botón principal</label>
              <Input
                value={form.primary_button_text}
                onChange={(event) =>
                  updateField("primary_button_text", event.target.value)
                }
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Href botón principal</label>
              <Input
                value={form.primary_button_href}
                onChange={(event) =>
                  updateField("primary_button_href", event.target.value)
                }
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Texto botón secundario</label>
              <Input
                value={form.secondary_button_text}
                onChange={(event) =>
                  updateField("secondary_button_text", event.target.value)
                }
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Href botón secundario</label>
              <Input
                value={form.secondary_button_href}
                onChange={(event) =>
                  updateField("secondary_button_href", event.target.value)
                }
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
          </div>

          <AdminActionButtons
            compact
            showAdd={false}
            editLabel="Guardar cambios"
            deleteLabel="Desactivar sección"
            onEdit={() => void handleSave()}
            onDelete={() => void handleDelete()}
          />
        </div>
      </AdminPreviewCard>
    </>
  );
}
