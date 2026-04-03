import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { SeasonCard } from '@/components/SeasonCard';
import { mockTVShows } from '@/constants/mockData';
import type { Season } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

const mockSeasons: Record<string, Season[]> = {
  'tvshow-001': [
    {
      '@assetType': 'season',
      '@key': 'season-001-1',
      number: 1,
      description:
        'A primeira temporada acompanha Walter White e Jesse Pinkman.',
      tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-001' },
    },
    {
      '@assetType': 'season',
      '@key': 'season-001-2',
      number: 2,
      description: 'Walter enfrenta as consequências de suas decisões.',
      tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-001' },
    },
    {
      '@assetType': 'season',
      '@key': 'season-001-3',
      number: 3,
      description: 'A parceria com Gus Fring se torna mais complicada.',
      tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-001' },
    },
  ],
  'tvshow-002': [
    {
      '@assetType': 'season',
      '@key': 'season-002-1',
      number: 1,
      description:
        'O desaparecimento de Will Byers e os eventos sobrenaturais em Hawkins.',
      tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-002' },
    },
    {
      '@assetType': 'season',
      '@key': 'season-002-2',
      number: 2,
      description: 'Os moradores enfrentam criaturas do Mundo Invertido.',
      tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-002' },
    },
  ],
};

export default async function SeriesDetailPage({ params }: PageProps) {
  const { id } = await params;
  const show = mockTVShows.find(s => s['@key'] === id);

  if (!show) {
    notFound();
  }

  const seasons = mockSeasons[id] || [];

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>

        <div className="bg-brand-bg border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {show.title}
                </h1>
                <Badge rating={show.rating} />
              </div>
              <p className="text-white/70 leading-relaxed">
                {show.description}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Temporadas</h2>
          {seasons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasons.map(season => (
                <SeasonCard
                  key={season['@key']}
                  season={season}
                  tvShowId={id}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/60">Nenhuma temporada disponível.</p>
          )}
        </section>
      </div>
    </main>
  );
}
