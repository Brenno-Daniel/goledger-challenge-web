import { Season } from '@/types';

interface SeasonCardProps {
  season: Season;
}

export function SeasonCard({ season }: SeasonCardProps) {
  return (
    <div className="bg-brand-bg border border-white/10 rounded-lg p-4 hover:border-brand-primary/50 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Temporada {season.number}</h4>
          <p className="text-sm text-white/60 mt-1 line-clamp-2">
            {season.description}
          </p>
        </div>
      </div>
    </div>
  );
}
