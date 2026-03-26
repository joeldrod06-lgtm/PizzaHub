import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminActionButtonsProps = {
  addLabel?: string;
  compact?: boolean;
  showAdd?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  disabled?: boolean;
  editLabel?: string;
  deleteLabel?: string;
};

export function AdminActionButtons({
  addLabel = "Agregar",
  compact = false,
  showAdd = true,
  onEdit,
  onDelete,
  onAdd,
  disabled = false,
  editLabel = "Editar",
  deleteLabel = "Eliminar",
}: AdminActionButtonsProps) {
  const sizeClass = compact ? "h-8 px-3 text-xs" : "h-9 px-3.5 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onEdit}
        className={`rounded-xl border-emerald-500/20 !bg-emerald-500/[0.08] text-emerald-100 shadow-[0_10px_30px_-18px_rgba(16,185,129,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/35 hover:!bg-emerald-500/[0.14] hover:!text-emerald-50 ${sizeClass}`}
      >
        <Pencil className="mr-2 h-3.5 w-3.5" />
        {editLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onDelete}
        className={`rounded-xl border-red-500/20 !bg-red-500/[0.06] text-red-100 shadow-[0_10px_30px_-18px_rgba(239,68,68,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/35 hover:!bg-red-500/[0.12] hover:!text-red-50 ${sizeClass}`}
      >
        <Trash2 className="mr-2 h-3.5 w-3.5" />
        {deleteLabel}
      </Button>
      {showAdd ? (
        <Button
          type="button"
          disabled={disabled}
          onClick={onAdd}
          className={`rounded-xl bg-orange-500 text-white shadow-[0_12px_32px_-18px_rgba(249,115,22,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 ${sizeClass}`}
        >
          <Plus className="mr-2 h-3.5 w-3.5" />
          {addLabel}
        </Button>
      ) : null}
    </div>
  );
}
