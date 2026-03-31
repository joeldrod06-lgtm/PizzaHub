"use client";

import { useEffect, useState } from "react";

import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { Input } from "@/components/ui/input";
import { useAdminFeedback } from "@/hooks/useAdminFeedback";
import { getAdminErrorMessage } from "@/lib/admin";
import { revalidatePublicSite } from "@/lib/revalidate-client";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { HeroContent, SiteSection } from "@/types/cms";

const textareaClassName =
  "flex min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/30";

export function AdminHeroView() {
  const supabase = getSupabaseBrowserClient();
  const { feedback, showFeedback } = useAdminFeedback();
  const [section, setSection] = useState<SiteSection | null>(null);
  const [form, setForm] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    setSaving(true);
    try {
      const { error: sectionError } = await supabase
        .from("site_sections")
        .update({ is_active: true })
        .eq("id", section.id);
      if (sectionError) throw sectionError;

      const { error: contentError } = await supabase
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
      if (contentError) throw contentError;

      await revalidatePublicSite();
      setSection((current) => (current ? { ...current, is_active: true } : current));
      showFeedback({ tone: "success", message: "Inicio guardado correctamente." });
    } catch (error) {
      showFeedback({ tone: "error", message: getAdminErrorMessage(error) });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!section) return;
    setDeleting(true);
    try {
      const { error } = await supabase
        .from("site_sections")
        .update({ is_active: false })
        .eq("id", section.id);
      if (error) throw error;

      await revalidatePublicSite();
      setSection((current) => (current ? { ...current, is_active: false } : current));
      showFeedback({ tone: "success", message: "Inicio desactivado correctamente." });
    } catch (error) {
      showFeedback({ tone: "error", message: getAdminErrorMessage(error) });
    } finally {
      setDeleting(false);
    }
  };

  if (loading || !form) {
    return <div className="text-sm text-white/50">Cargando contenido...</div>;
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Inicio"
        title="Editor del hero principal"
        description="Actualiza el bloque principal del sitio y controla si la sección está visible."
      />
      <AdminFeedbackBanner feedback={feedback} />
      <AdminPreviewCard
        title="Contenido principal"
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
                onChange={(event) => updateField("primary_button_text", event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Href botón principal</label>
              <Input
                value={form.primary_button_href}
                onChange={(event) => updateField("primary_button_href", event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Texto botón secundario</label>
              <Input
                value={form.secondary_button_text}
                onChange={(event) => updateField("secondary_button_text", event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/65">Href botón secundario</label>
              <Input
                value={form.secondary_button_href}
                onChange={(event) => updateField("secondary_button_href", event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
          </div>
          <AdminActionButtons
            compact
            showAdd={false}
            disabled={saving || deleting}
            editLabel={saving ? "Guardando..." : "Guardar cambios"}
            deleteLabel={deleting ? "Desactivando..." : "Desactivar sección"}
            onEdit={() => void handleSave()}
            onDelete={() => void handleDelete()}
          />
        </div>
      </AdminPreviewCard>
    </>
  );
}
