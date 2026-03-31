"use client";

import { useRef, useState } from "react";
import { ImageIcon, RefreshCcw, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient, STORAGE_BUCKET } from "@/lib/supabase";

type ImageFieldManagerProps = {
  folder: string;
  currentPath: string | null;
  currentUrl: string | null;
  currentLabel?: string | null;
  onChange: (value: { image_path: string | null; image_url: string | null }) => void;
};

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function ImageFieldManager({
  folder,
  currentPath,
  currentUrl,
  currentLabel,
  onChange,
}: ImageFieldManagerProps) {
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pendingAction, setPendingAction] = useState<"upload" | "replace" | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  const handlePick = (action: "upload" | "replace") => {
    setPendingAction(action);
    inputRef.current?.click();
  };

  const handleUpload = async (file: File, action: "upload" | "replace") => {
    setBusy(true);
    try {
      const nextPath = `${folder}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(nextPath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      if (action === "replace" && currentPath) {
        await supabase.storage.from(STORAGE_BUCKET).remove([currentPath]);
      }

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(nextPath);
      onChange({ image_path: nextPath, image_url: data.publicUrl });
    } finally {
      setBusy(false);
      setPendingAction(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      if (currentPath) {
        await supabase.storage.from(STORAGE_BUCKET).remove([currentPath]);
      }
      onChange({ image_path: null, image_url: null });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/12 bg-white/[0.03] overflow-hidden">
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="h-10 w-10 text-white/25" />
        )}
      </div>
      <p className="mt-3 text-xs text-white/35">
        Archivo actual: {currentLabel ?? currentPath ?? "Sin imagen"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => handlePick("upload")}
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Upload className="mr-2 h-3.5 w-3.5" />
          Subir imagen
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => handlePick("replace")}
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RefreshCcw className="mr-2 h-3.5 w-3.5" />
          Reemplazar
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={handleDelete}
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Eliminar imagen
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && pendingAction) {
            void handleUpload(file, pendingAction);
          }
        }}
      />
    </div>
  );
}
