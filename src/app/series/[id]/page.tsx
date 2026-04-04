import { notFound } from 'next/navigation';
import { getTVShowByKey, getSeasonsByTVShow } from '@/services/tvShowService';
import { SeriesDetailClient } from './SeriesDetailClient';

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

  return <SeriesDetailClient show={show} initialSeasons={seasons} />;
}
