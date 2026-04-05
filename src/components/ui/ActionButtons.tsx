import { Pencil, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ActionButtons({
  onEdit,
  onDelete,
  className = '',
}: ActionButtonsProps) {
  if (!onEdit && !onDelete) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 bg-brand-bg border border-brand-primary rounded
                     hover:bg-brand-primary transition-all duration-300"
          aria-label="Edit"
        >
          <Pencil
            size={14}
            className="text-brand-primary hover:text-black transition-colors"
          />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1.5 bg-brand-bg border border-red-500/50 rounded
                     hover:bg-red-500 transition-all duration-300"
          aria-label="Delete"
        >
          <Trash2
            size={14}
            className="text-red-400 hover:text-white transition-colors"
          />
        </button>
      )}
    </div>
  );
}
