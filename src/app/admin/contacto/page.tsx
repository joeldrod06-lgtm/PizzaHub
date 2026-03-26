"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { ContactContent, SiteSection } from "@/types/cms";

export default function AdminContactPage() {
  const supabase = getSupabaseBrowserClient();
  const [section, setSection] = useState<SiteSection | null>(null);
  const [form, setForm] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: sectionData } = await supabase
        .from("site_sections")
        .select("*")
        .eq("key", "contacto")
        .maybeSingle();

      const { data: contactData } = await supabase
        .from("contact_content")
        .select("*")
        .eq("section_id", sectionData?.id ?? "")
        .maybeSingle();

      setSection(sectionData);
      setForm(contactData);
      setLoading(false);
    })();
  }, [supabase]);

  const updateField = <K extends keyof ContactContent>(
    key: K,
    value: ContactContent[K]
  ) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSave = async () => {
    if (!form || !section) return;

    await supabase.from("site_sections").update({ is_active: true }).eq("id", section.id);
    await supabase
      .from("contact_content")
      .update({
        phone: form.phone,
        address: form.address,
        schedule: form.schedule,
        map_url: form.map_url,
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
        eyebrow="Contacto"
        title="Editor de datos de contacto"
        description="Esta vista ya está conectada a `contact_content`. Los cambios aquí impactan el teléfono, la ubicación, el horario y el link del mapa del sitio."
      />

      <AdminPreviewCard
        title="Campos de contacto"
        description={`Estado actual: ${section?.is_active ? "visible" : "oculto"}`}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/65">Teléfono</label>
            <Input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="border-white/10 bg-black/20 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">Ubicación</label>
            <Input
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="border-white/10 bg-black/20 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">Horario</label>
            <Input
              value={form.schedule}
              onChange={(event) => updateField("schedule", event.target.value)}
              className="border-white/10 bg-black/20 text-white"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <label className="block text-sm text-white/65">Link de mapa</label>
              <AdminStatusBadge tone="blue" label="URL editable" />
            </div>
            <Input
              value={form.map_url}
              onChange={(event) => updateField("map_url", event.target.value)}
              className="border-white/10 bg-black/20 text-white"
            />
            <div className="mt-3 inline-flex items-center text-xs text-orange-300">
              Se abriría en el cliente
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
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
