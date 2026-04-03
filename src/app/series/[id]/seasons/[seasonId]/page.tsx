import { SeasonDetailClient } from './SeasonDetailClient';
import { mockTVShows, mockSeasons, mockEpisodes } from '@/constants/mockData';

interface PageProps {
  params: Promise<{ id: string; seasonId: string }>;
}

export default async function SeasonDetailPage({ params }: PageProps) {
  const { id, seasonId } = await params;
  const show = mockTVShows.find(s => s['@key'] === id);
  const season = mockSeasons.find(s => s['@key'] === seasonId);

  if (!show || !season) {
    return (
      <main className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto text-white/60">
          <p>Série ou temporada não encontrada.</p>
        </div>
      </main>
    );
  }

  const episodes = mockEpisodes.filter(ep => ep.season['@key'] === seasonId);

  return <SeasonDetailClient show={show} season={season} episodes={episodes} />;
}
