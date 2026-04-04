import { SeasonDetailClient } from './SeasonDetailClient';
import {
  getTVShowByKey,
  getSeasonByKey,
  getEpisodesBySeason,
} from '@/services/tvShowService';

interface PageProps {
  params: Promise<{ id: string; seasonId: string }>;
}

export default async function SeasonDetailPage({ params }: PageProps) {
  const { id, seasonId } = await params;
  const decodedId = decodeURIComponent(id);
  const decodedSeasonId = decodeURIComponent(seasonId);

  const show = await getTVShowByKey(decodedId);
  const season = await getSeasonByKey(decodedSeasonId);

  if (!show || !season) {
    return (
      <main className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto text-white/60">
          <p>Série ou temporada não encontrada.</p>
        </div>
      </main>
    );
  }

  const episodes = await getEpisodesBySeason(decodedSeasonId);

  return (
    <SeasonDetailClient
      show={show}
      season={season}
      initialEpisodes={episodes}
    />
  );
}
