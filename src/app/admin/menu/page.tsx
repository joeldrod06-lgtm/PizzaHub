"use client";

import { useEffect, useMemo, useState } from "react";

import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { ImageFieldManager } from "@/components/admin/ImageFieldManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPreviewCard } from "@/components/admin/AdminPreviewCard";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { MenuItem } from "@/types/cms";

const textareaClassName =
  "flex min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/30";

type NewMenuItemDraft = {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string | null;
  image_path: string | null;
  is_active: boolean;
  display_order: string;
};

function createEmptyNewItem(): NewMenuItemDraft {
  return {
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: null,
    image_path: null,
    is_active: true,
    display_order: "",
  };
}

export default function AdminMenuPage() {
  const supabase = getSupabaseBrowserClient();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<NewMenuItemDraft>(createEmptyNewItem);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    void loadItems();
  }, []);

  const nextDisplayOrder = useMemo(() => items.length + 1, [items.length]);
  const canCreate =
    newItem.name.trim().length > 0 &&
    newItem.description.trim().length > 0 &&
    newItem.category.trim().length > 0 &&
    newItem.price.trim().length > 0;

  const loadItems = async () => {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    setItems((data ?? []) as MenuItem[]);
    setLoading(false);
  };

  const updateItemField = <K extends keyof MenuItem>(
    id: string,
    key: K,
    value: MenuItem[K]
  ) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleSave = async (item: MenuItem) => {
    setSavingId(item.id);

    try {
      await supabase
        .from("menu_items")
        .update({
          name: item.name,
          description: item.description,
          price: Number(item.price),
          category: item.category,
          image_url: item.image_url,
          image_path: item.image_path,
          is_active: item.is_active,
          display_order: Number(item.display_order),
        })
        .eq("id", item.id);

      await loadItems();
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (item: MenuItem) => {
    setDeletingId(item.id);

    try {
      if (item.image_path) {
        await supabase.storage.from("site-media").remove([item.image_path]);
      }

      await supabase.from("menu_items").delete().eq("id", item.id);
      await loadItems();
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = async () => {
    if (!canCreate) {
      return;
    }

    setCreating(true);

    try {
      await supabase.from("menu_items").insert({
        name: newItem.name.trim(),
        description: newItem.description.trim(),
        price: Number(newItem.price),
        category: newItem.category.trim(),
        image_url: newItem.image_url,
        image_path: newItem.image_path,
        is_active: newItem.is_active,
        display_order: Number(newItem.display_order || nextDisplayOrder),
      });

      setNewItem(createEmptyNewItem());
      await loadItems();
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-white/50">Cargando contenido...</div>;
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Menú"
        title="Editor del menú público"
        description="Esta vista ya está conectada a `menu_items`. Aquí administras las pizzas existentes y, en un bloque separado, agregas nuevas sin duplicar acciones."
      />

      <div className="space-y-6">
        <AdminPreviewCard
          title="Pizzas existentes"
          description="Aquí administras productos ya creados: editas datos, imagen, orden y visibilidad sin mezclarlo con el alta de nuevos productos."
        >
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-white/45">
                Todavía no hay pizzas registradas en el menú.
              </div>
            ) : null}

            {items.map((item) => {
              const isBusy = savingId === item.id || deletingId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/8 bg-black/20 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {item.category} · ${Number(item.price).toFixed(0)}
                      </p>
                    </div>

                    <AdminStatusBadge
                      tone={item.is_active ? "green" : "neutral"}
                      label={item.is_active ? "Activa" : "Oculta"}
                    />
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
                    <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                        Imagen
                      </p>
                      <div className="mt-4">
                        <ImageFieldManager
                          folder="menu"
                          currentPath={item.image_path}
                          currentUrl={item.image_url}
                          currentLabel={item.image_path}
                          onChange={({ image_path, image_url }) =>
                            setItems((current) =>
                              current.map((currentItem) =>
                                currentItem.id === item.id
                                  ? { ...currentItem, image_path, image_url }
                                  : currentItem
                              )
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm text-white/65">Nombre</label>
                          <Input
                            value={item.name}
                            onChange={(event) =>
                              updateItemField(item.id, "name", event.target.value)
                            }
                            className="border-white/10 bg-black/20 text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-white/65">Categoría</label>
                          <Input
                            value={item.category}
                            onChange={(event) =>
                              updateItemField(item.id, "category", event.target.value)
                            }
                            className="border-white/10 bg-black/20 text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-white/65">Precio</label>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            value={String(item.price)}
                            onChange={(event) =>
                              updateItemField(
                                item.id,
                                "price",
                                Number(event.target.value || 0)
                              )
                            }
                            className="border-white/10 bg-black/20 text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-white/65">
                            Orden visual
                          </label>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            value={String(item.display_order)}
                            onChange={(event) =>
                              updateItemField(
                                item.id,
                                "display_order",
                                Number(event.target.value || 0)
                              )
                            }
                            className="border-white/10 bg-black/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm text-white/65">Descripción</label>
                        <textarea
                          value={item.description}
                          onChange={(event) =>
                            updateItemField(item.id, "description", event.target.value)
                          }
                          className={textareaClassName}
                        />
                      </div>

                      <div className="mt-4">
                        <label className="inline-flex items-center gap-2 text-sm text-white/70">
                          <input
                            type="checkbox"
                            checked={item.is_active}
                            onChange={(event) =>
                              updateItemField(item.id, "is_active", event.target.checked)
                            }
                            className="h-4 w-4 rounded border-white/15 bg-black/20 accent-orange-500"
                          />
                          Visible en el sitio
                        </label>
                      </div>

                      <div className="mt-5 border-t border-white/8 pt-4">
                        <AdminActionButtons
                          compact
                          showAdd={false}
                          disabled={isBusy}
                          editLabel={savingId === item.id ? "Guardando..." : "Guardar cambios"}
                          deleteLabel={
                            deletingId === item.id ? "Eliminando..." : "Eliminar pizza"
                          }
                          onEdit={() => void handleSave(item)}
                          onDelete={() => void handleDelete(item)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminPreviewCard>

        <AdminPreviewCard
          title="Agregar nueva pizza"
          description="Este bloque se usa solo para crear una nueva pizza, manteniendo separado el flujo de alta del flujo de edición."
        >
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                Imagen del nuevo producto
              </p>
              <div className="mt-4">
                <ImageFieldManager
                  folder="menu"
                  currentPath={newItem.image_path}
                  currentUrl={newItem.image_url}
                  currentLabel={newItem.image_path}
                  onChange={({ image_path, image_url }) =>
                    setNewItem((current) => ({ ...current, image_path, image_url }))
                  }
                />
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-orange-500/20 bg-orange-500/[0.04] p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/65">Nombre</label>
                  <Input
                    value={newItem.name}
                    onChange={(event) =>
                      setNewItem((current) => ({ ...current, name: event.target.value }))
                    }
                    className="border-white/10 bg-black/20 text-white"
                    placeholder="Pizza de la casa"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">Categoría</label>
                  <Input
                    value={newItem.category}
                    onChange={(event) =>
                      setNewItem((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="border-white/10 bg-black/20 text-white"
                    placeholder="Clásicas"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">Precio</label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={newItem.price}
                    onChange={(event) =>
                      setNewItem((current) => ({ ...current, price: event.target.value }))
                    }
                    className="border-white/10 bg-black/20 text-white"
                    placeholder="145"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">Orden visual</label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={newItem.display_order}
                    onChange={(event) =>
                      setNewItem((current) => ({
                        ...current,
                        display_order: event.target.value,
                      }))
                    }
                    className="border-white/10 bg-black/20 text-white"
                    placeholder={String(nextDisplayOrder)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm text-white/65">Descripción</label>
                <textarea
                  value={newItem.description}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className={textareaClassName}
                  placeholder="Describe los ingredientes y el estilo de esta pizza."
                />
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={newItem.is_active}
                    onChange={(event) =>
                      setNewItem((current) => ({
                        ...current,
                        is_active: event.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-white/15 bg-black/20 accent-orange-500"
                  />
                  Visible en el sitio
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-4">
                <Button
                  type="button"
                  disabled={!canCreate || creating}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => void handleCreate()}
                >
                  {creating ? "Creando..." : "Crear pizza"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setNewItem(createEmptyNewItem())}
                >
                  Limpiar campos
                </Button>
              </div>
            </div>
          </div>
        </AdminPreviewCard>
      </div>
    </>
  );
}
