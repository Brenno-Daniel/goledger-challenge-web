import Link from 'next/link';
import { ChevronRight, Pencil, Trash2 } from 'lucide-react';
import type { Season } from '@/types';

interface SeasonCardProps {
  season: Season;
  tvShowId: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function SeasonCard({
  season,
  tvShowId,
  onEdit,
  onDelete,
}: SeasonCardProps) {
  return (
    <div className="bg-brand-bg border border-white/10 rounded-lg p-4 hover:border-brand-primary/50 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Link
            href={`/series/${encodeURIComponent(tvShowId)}/seasons/${encodeURIComponent(season['@key'])}`}
            className="block"
          >
            <div className="flex items-center gap-2">
              <h4 className="text-white font-medium">
                Temporada {season.number}
              </h4>
              {season.year && (
                <span className="text-xs text-white/40">({season.year})</span>
              )}
            </div>
            <p className="text-sm text-white/60 mt-1 line-clamp-2">
              {season.description}
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-1.5 bg-brand-bg border border-brand-primary rounded
                         hover:bg-brand-primary transition-all duration-300"
              aria-label="Edit season"
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
              aria-label="Delete season"
            >
              <Trash2
                size={14}
                className="text-red-400 hover:text-white transition-colors"
              />
            </button>
          </div>
          <Link
            href={`/series/${encodeURIComponent(tvShowId)}/seasons/${encodeURIComponent(season['@key'])}`}
          >
            <ChevronRight
              size={20}
              className="text-white/40 hover:text-brand-primary transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
