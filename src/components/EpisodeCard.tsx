import { Pencil, Trash2 } from 'lucide-react';
import type { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EpisodeCard({ episode, onEdit, onDelete }: EpisodeCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-brand-bg border border-white/10 rounded-lg p-4 flex flex-col gap-3 hover:border-brand-primary/50 transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-brand-primary/20 text-brand-primary">
              EP {episode.episodeNumber}
            </span>
            <span className="text-yellow-400 text-sm font-medium">
              ★ {episode.rating.toFixed(1)}
            </span>
          </div>
          <h4 className="text-white font-semibold line-clamp-1">
            {episode.title}
          </h4>
          <p className="text-sm text-white/60 line-clamp-2 mt-1">
            {episode.description}
          </p>
          <p className="text-xs text-white/40 mt-2">
            {formatDate(episode.releaseDate)}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={onEdit}
          className="p-2 bg-brand-bg border border-brand-primary rounded
                     hover:bg-brand-primary transition-all duration-300 group"
          aria-label="Edit episode"
        >
          <Pencil
            size={16}
            className="text-brand-primary group-hover:text-black transition-colors"
          />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-brand-bg border border-red-500/50 rounded
                     hover:bg-red-500 transition-all duration-300 group"
          aria-label="Delete episode"
        >
          <Trash2
            size={16}
            className="text-red-400 group-hover:text-white transition-colors"
          />
        </button>
      </div>
    </div>
  );
}
