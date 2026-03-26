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
        className={`border-white/10 bg-white/5 text-white hover:bg-white/10 ${sizeClass}`}
      >
        <Pencil className="mr-2 h-3.5 w-3.5" />
        {editLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onDelete}
        className={`border-white/10 bg-white/5 text-white hover:bg-white/10 ${sizeClass}`}
      >
        <Trash2 className="mr-2 h-3.5 w-3.5" />
        {deleteLabel}
      </Button>
      {showAdd ? (
        <Button
          type="button"
          disabled={disabled}
          onClick={onAdd}
          className={`bg-orange-500 text-white hover:bg-orange-600 ${sizeClass}`}
        >
          <Plus className="mr-2 h-3.5 w-3.5" />
          {addLabel}
        </Button>
      ) : null}
    </div>
  );
}
