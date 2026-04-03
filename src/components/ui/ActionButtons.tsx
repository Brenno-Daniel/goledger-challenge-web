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
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={onEdit}
        className="p-2 bg-brand-bg border border-white/20 rounded
                   hover:bg-brand-primary hover:border-brand-primary
                   transition-all duration-300 group"
        aria-label="Edit"
      >
        <Pencil
          size={16}
          className="text-white transition-colors"
        />
      </button>
      <button
        onClick={onDelete}
        className="p-2 bg-brand-bg border border-white/20 rounded
                   hover:bg-red-500 hover:border-red-500
                   transition-all duration-300 group"
        aria-label="Delete"
      >
        <Trash2
          size={16}
          className="text-white group-hover:text-white transition-colors"
        />
      </button>
    </div>
  );
}
