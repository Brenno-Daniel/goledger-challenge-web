'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { EpisodeCard } from '@/components/EpisodeCard';
import type { TVShow, Season, Episode } from '@/types';

interface SeasonDetailClientProps {
  show: TVShow;
  season: Season;
  episodes: Episode[];
}

export function SeasonDetailClient({
  show,
  season,
  episodes,
}: SeasonDetailClientProps) {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Séries
          </Link>
          <ChevronRight size={16} />
          <Link
            href={`/series/${show['@key']}`}
            className="hover:text-brand-primary transition-colors"
          >
            {show.title}
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">Temporada {season.number}</span>
        </nav>

        <div className="bg-brand-bg border border-white/10 rounded-xl p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Temporada {season.number}
          </h1>
          <p className="text-white/70">{season.description}</p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Episódios</h2>
          {episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {episodes.map(episode => (
                <EpisodeCard
                  key={episode['@key']}
                  episode={episode}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/60">Nenhum episódio disponível.</p>
          )}
        </section>
      </div>
    </main>
  );
}
