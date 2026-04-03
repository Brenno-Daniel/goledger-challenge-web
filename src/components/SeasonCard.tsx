import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Season } from '@/types';

interface SeasonCardProps {
  season: Season;
  tvShowId: string;
}

export function SeasonCard({ season, tvShowId }: SeasonCardProps) {
  return (
    <Link
      href={`/series/${tvShowId}/seasons/${season['@key']}`}
      className="block bg-brand-bg border border-white/10 rounded-lg p-4 hover:border-brand-primary/50 transition-colors duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Temporada {season.number}</h4>
          <p className="text-sm text-white/60 mt-1 line-clamp-2">
            {season.description}
          </p>
        </div>
        <ChevronRight
          size={20}
          className="text-white/40 group-hover:text-brand-primary transition-colors"
        />
      </div>
    </Link>
  );
}
