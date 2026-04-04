import { notFound } from 'next/navigation';
import { getTVShowByKey, getSeasonsByTVShow } from '@/services/tvShowService';
import { SeriesDetailClient } from './SeriesDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let show;
  let seasons: Awaited<ReturnType<typeof getSeasonsByTVShow>> = [];

  try {
    show = await getTVShowByKey(decodedId);
    seasons = await getSeasonsByTVShow(decodedId);
  } catch {
    notFound();
  }

  if (!show) {
    notFound();
  }

  return <SeriesDetailClient show={show} initialSeasons={seasons} />;
}
