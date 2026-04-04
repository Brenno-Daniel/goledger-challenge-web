import { Pencil, Trash2, Film } from 'lucide-react';
import type { Watchlist } from '@/types';

interface WatchlistCardProps {
  watchlist: Watchlist;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function WatchlistCard({
  watchlist,
  onEdit,
  onDelete,
}: WatchlistCardProps) {
  const itemCount = watchlist.tvShows?.length || 0;

  return (
    <div className="bg-brand-bg border border-white/10 rounded-lg p-4 hover:border-brand-primary/50 transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-white font-semibold line-clamp-1">
            {watchlist.title}
          </h4>
          <p className="text-sm text-white/60 line-clamp-2 mt-1">
            {watchlist.description}
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
            <Film size={14} />
            <span>
              {itemCount} {itemCount === 1 ? 'série' : 'séries'}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 bg-brand-bg border border-brand-primary rounded
                       hover:bg-brand-primary transition-all duration-300"
            aria-label="Edit watchlist"
          >
            <Pencil
              size={14}
              className="text-brand-primary hover:text-black transition-colors"
            />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 bg-brand-bg border border-red-500/50 rounded
                       hover:bg-red-500 transition-all duration-300"
            aria-label="Delete watchlist"
          >
            <Trash2
              size={14}
              className="text-red-400 hover:text-white transition-colors"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
