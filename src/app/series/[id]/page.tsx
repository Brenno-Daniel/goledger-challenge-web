import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { SeasonCard } from '@/components/SeasonCard';
import { getTVShowByKey, getSeasonsByTVShow } from '@/services/tvShowService';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const show = await getTVShowByKey(decodedId);

  if (!show) {
    notFound();
  }

  const seasons = await getSeasonsByTVShow(decodedId);

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
                <Badge rating={show.recommendedAge} />
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
                  tvShowId={decodedId}
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
