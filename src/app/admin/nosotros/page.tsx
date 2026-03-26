"use client";

import { useEffect, useState } from "react";

import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { ImageFieldManager } from "@/components/admin/ImageFieldManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { AboutContent, SiteSection } from "@/types/cms";

const textareaClassName =
  "flex min-h-40 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/30";

export default function AdminAboutPage() {
  const supabase = getSupabaseBrowserClient();
  const [section, setSection] = useState<SiteSection | null>(null);
  const [form, setForm] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: sectionData } = await supabase
        .from("site_sections")
        .select("*")
        .eq("key", "nosotros")
        .maybeSingle();

      const { data: aboutData } = await supabase
        .from("about_content")
        .select("*")
        .eq("section_id", sectionData?.id ?? "")
        .maybeSingle();

      setSection(sectionData);
      setForm(aboutData);
      setLoading(false);
    })();
  }, [supabase]);

  const handleSave = async () => {
    if (!form || !section) return;

    await supabase.from("site_sections").update({ is_active: true }).eq("id", section.id);
    await supabase
      .from("about_content")
      .update({
        title: form.title,
        description: form.description,
        image_url: form.image_url,
        image_path: form.image_path,
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
        eyebrow="Nosotros"
        title="Editor de la sección Nosotros"
        description="Esta sección única ya guarda en `about_content`. Puedes editar título, imagen y descripción sin tocar el diseño del sitio."
      />

      <AdminPreviewCard
        title="Contenido de Nosotros"
        description={`Estado actual: ${section?.is_active ? "visible" : "oculto"}`}
      >
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">
              Imagen actual
            </p>
            <div className="mt-4">
              <ImageFieldManager
                folder="about"
                currentPath={form.image_path}
                currentUrl={form.image_url}
                currentLabel={form.image_path}
                onChange={({ image_path, image_url }) =>
                  setForm((current) =>
                    current ? { ...current, image_path, image_url } : current
                  )
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/65">Título</label>
                <Input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) =>
                      current ? { ...current, title: event.target.value } : current
                    )
                  }
                  className="border-white/10 bg-black/20 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/65">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) =>
                      current
                        ? { ...current, description: event.target.value }
                        : current
                    )
                  }
                  className={textareaClassName}
                />
              </div>
            </div>

            <div className="mt-5 border-t border-white/8 pt-4">
              <AdminActionButtons
                compact
                showAdd={false}
                editLabel="Guardar cambios"
                deleteLabel="Desactivar sección"
                onEdit={() => void handleSave()}
                onDelete={() => void handleDelete()}
              />
            </div>
          </div>
        </div>
      </AdminPreviewCard>
    </>
  );
}
